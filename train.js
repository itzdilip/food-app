const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');
const util = require('util');
const sharp = require('sharp');

// Polyfill isNullOrUndefined for newer Node.js versions if needed by TF.js
if (typeof util.isNullOrUndefined !== 'function') {
    util.isNullOrUndefined = (arg) => arg === null || arg === undefined;
}

const DATA_DIR = 'Food-Images/Food Classification';
const MODEL_DIR = 'my_model';
const IMAGE_SIZE = 224;
const BATCH_SIZE = 32;
const EPOCHS = 5;

async function loadImages() {
    const categories = fs.readdirSync(DATA_DIR).filter(f => fs.statSync(path.join(DATA_DIR, f)).isDirectory());
    console.log(`Found ${categories.length} categories:`, categories);

    const images = [];
    const labels = [];

    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const categoryPath = path.join(DATA_DIR, category);
        const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg') || f.endsWith('.webp'));
        
        console.log(`Found ${files.length} images in ${category}...`);
        
        for (const file of files) {
            const filePath = path.join(categoryPath, file);
            images.push(filePath);
            labels.push(i);
        }
    }

    return { images, labels, categories };
}

async function imageToTensor(filePath) {
    try {
        // Use sharp to sanitize and resize the image
        const { data, info } = await sharp(filePath)
            .resize(IMAGE_SIZE, IMAGE_SIZE)
            .removeAlpha() // Ensure 3 channels (RGB)
            .toColorspace('srgb')
            .raw()
            .toBuffer({ resolveWithObject: true });
        
        return tf.tidy(() => {
            return tf.tensor3d(new Uint8Array(data), [info.height, info.width, 3])
                .div(127.5).sub(1); // Normalize to [-1, 1]
        });
    } catch (e) {
        // console.warn(`Skipping image ${filePath}: ${e.message}`);
        return null;
    }
}

async function train() {
    const { images, labels, categories } = await loadImages();
    
    // Shuffle
    const indices = Array.from(Array(images.length).keys());
    tf.util.shuffle(indices);

    const shuffledImages = indices.map(i => images[i]);
    const shuffledLabels = indices.map(i => labels[i]);

    console.log('Building model...');
    // Load MobileNetV1 0.25 as a base
    const mobilenet = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
    
    const layer = mobilenet.getLayer('conv_pw_13_relu');
    const baseModel = tf.model({inputs: mobilenet.inputs, outputs: layer.output});
    
    for (const layer of baseModel.layers) {
        layer.trainable = false;
    }

    const model = tf.sequential();
    model.add(baseModel);
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.5 }));
    model.add(tf.layers.dense({ units: categories.length, activation: 'softmax' }));

    model.compile({
        optimizer: tf.train.adam(0.0001),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    console.log('Starting training with sanitization...');

    for (let epoch = 0; epoch < EPOCHS; epoch++) {
        console.log(`Epoch ${epoch + 1}/${EPOCHS}`);
        let totalLoss = 0;
        let totalAcc = 0;
        let validBatches = 0;
        let skippedInEpoch = 0;
        const numBatches = Math.ceil(shuffledImages.length / BATCH_SIZE);

        for (let i = 0; i < numBatches; i++) {
            const start = i * BATCH_SIZE;
            const end = Math.min(start + BATCH_SIZE, shuffledImages.length);
            
            const batchFiles = shuffledImages.slice(start, end);
            const batchTargetLabels = shuffledLabels.slice(start, end);

            // Load batch asynchronously in parallel
            const tensorPromises = batchFiles.map(img => imageToTensor(img));
            const tensors = await Promise.all(tensorPromises);
            
            const validIndices = tensors.map((t, idx) => t !== null ? idx : -1).filter(idx => idx !== -1);
            skippedInEpoch += (batchFiles.length - validIndices.length);
            
            if (validIndices.length === 0) continue;

            const validTensors = validIndices.map(idx => tensors[idx]);
            const validLabels = validIndices.map(idx => batchTargetLabels[idx]);

            const batchImages = tf.stack(validTensors);
            const batchLabels = tf.oneHot(tf.tensor1d(validLabels, 'int32'), categories.length);

            const history = await model.trainOnBatch(batchImages, batchLabels);
            totalLoss += history[0];
            totalAcc += history[1];
            validBatches++;

            batchImages.dispose();
            batchLabels.dispose();
            validTensors.forEach(t => t.dispose());

            if (i % 20 === 0) {
                console.log(`Batch ${i}/${numBatches} - loss: ${history[0].toFixed(4)} - acc: ${history[1].toFixed(4)}`);
            }
        }
        console.log(`Epoch ${epoch + 1} finished - avg loss: ${(totalLoss/validBatches).toFixed(4)} - avg acc: ${(totalAcc/validBatches).toFixed(4)} - skipped: ${skippedInEpoch}`);
    }

    console.log('Saving model...');
    if (!fs.existsSync(MODEL_DIR)) fs.mkdirSync(MODEL_DIR);
    await model.save(`file://${MODEL_DIR}`);

    const metadata = {
        tfjsVersion: tf.version.tfjs,
        tmVersion: "2.4.12",
        packageVersion: "0.8.4-alpha2",
        packageName: "@teachablemachine/image",
        timeStamp: new Date().toISOString(),
        userMetadata: {},
        modelName: "tm-my-image-model",
        labels: categories,
        imageSize: IMAGE_SIZE
    };
    fs.writeFileSync(path.join(MODEL_DIR, 'metadata.json'), JSON.stringify(metadata, null, 2));
    
    console.log('Training complete!');
}

train().catch(err => console.error(err));
