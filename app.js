import { FOOD_DATABASE, CONFIG } from './data.js';
import * as ui from './ui.js';

// ===== STATE MANAGEMENT =====
let model = null;
let lastConfidence = null;
let imageName = 'No image selected';
const foodLog = JSON.parse(localStorage.getItem('gain_food_log')) || [];

// ===== DOM ELEMENTS =====
const labelContainer = document.getElementById('label-container');
const foodClass = document.getElementById('foodClass');
const calorieTable = document.getElementById('calorieTable');
const nutritionTable = document.getElementById('nutritionTable');
const caloriesValue = document.getElementById('caloriesValue');
const caloriesNote = document.getElementById('caloriesNote');
const imageUpload = document.getElementById('imageUpload');
const previewImg = document.getElementById('previewImg');
const loadingOverlay = document.getElementById('loadingOverlay');
const historyBody = document.getElementById('historyBody');
const nutritionResult = document.getElementById('nutritionResult');
const healthPointsResult = document.getElementById('healthPointsResult');
const dietChartList = document.getElementById('dietChartList');

// ===== INITIALIZATION =====
function init() {
  loadTheme();
  populateDropdown();
  ui.renderReferenceTables(FOOD_DATABASE, calorieTable, nutritionTable);
  ui.renderDietChart(FOOD_DATABASE, dietChartList);
  ui.renderHistory(foodLog, historyBody);
  initModel();
  setupEventListeners();
}

function loadTheme() {
  const savedTheme = localStorage.getItem('gain_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function populateDropdown() {
  Object.entries(FOOD_DATABASE).forEach(([key, data]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = data.name;
    foodClass.appendChild(option);
  });
}

async function initModel() {
  showLoading(true);
  try {
    model = await tmImage.load(CONFIG.TM_MODEL_URL + 'model.json', CONFIG.TM_MODEL_URL + 'metadata.json');
    
    // Model Warming: Run a dummy prediction to prevent lag on first real use
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 224;
    tempCanvas.height = 224;
    await model.predict(tempCanvas);

    labelContainer.innerHTML = '<div style="color: var(--success)">✓ Model ready. Upload an image to start!</div>';
  } catch (err) {
    console.error(err);
    labelContainer.innerHTML = '<div style="color: var(--danger)">✗ Model failed to load. Check console for details.</div>';
  } finally {
    showLoading(false);
  }
}

// ===== CORE LOGIC =====
function calcHealthPoints(foodKey, servings) {
  const n = FOOD_DATABASE[foodKey];
  if (!n) return 0;
  // Deterministic formula: (HealthScore - 5) * 5, scaled by servings
  return Math.round((n.healthScore - 5) * 5 * servings);
}

function showLoading(show) {
  loadingOverlay.style.display = show ? 'flex' : 'none';
}

function updateResultUI(selectedKey, serving, total) {
  const n = FOOD_DATABASE[selectedKey] || {};
  const carbs = n.carbs ? (n.carbs * serving).toFixed(1) : 'N/A';
  const protein = n.protein ? (n.protein * serving).toFixed(1) : 'N/A';
  const fiber = n.fiber ? (n.fiber * serving).toFixed(1) : 'N/A';
  const healthPts = calcHealthPoints(selectedKey, serving);
  const ptColor = healthPts >= 0 ? 'var(--primary)' : 'var(--danger)';

  ui.updateResultDisplay(
    { caloriesValue, caloriesNote, nutritionResult, healthPointsResult },
    { name: n.name, serving, total, carbs, protein, fiber, healthPts, ptColor, imageName, lastConfidence }
  );

  addToLog(selectedKey, total, serving, carbs, protein, fiber, healthPts);
}

function addToLog(key, calories, servings, carbs, protein, fiber, healthPoints) {
  const entry = {
    timestamp: new Date().toLocaleTimeString(),
    food: FOOD_DATABASE[key].name,
    calories,
    servings,
    carbs,
    protein,
    fiber,
    healthPoints,
    confidence: lastConfidence !== null ? (lastConfidence * 100).toFixed(1) + '%' : 'N/A',
    image: imageName
  };
  foodLog.unshift(entry); // Add to beginning
  localStorage.setItem('gain_food_log', JSON.stringify(foodLog));
  ui.renderHistory(foodLog, historyBody);
}

// ===== EVENT HANDLERS =====
function setupEventListeners() {
  document.getElementById('themeBtn').addEventListener('click', () => {
    const root = document.documentElement;
    const isDark = root.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('gain_theme', newTheme);
  });

  document.getElementById('calcBtn').addEventListener('click', () => {
    const selected = foodClass.value;
    const serving = parseFloat(document.getElementById('serving').value || '1');
    const total = Math.round((FOOD_DATABASE[selected]?.calories || 0) * serving);
    updateResultUI(selected, serving, total);
  });

  document.getElementById('downloadBtn').addEventListener('click', () => {
    const text = `G.A.I.N Result\n------------\nFood: ${FOOD_DATABASE[foodClass.value].name}\nEstimated Calories: ${caloriesValue.textContent}\nDetails: ${caloriesNote.textContent}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `gain-result-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById('exportBtn').addEventListener('click', () => {
    if (foodLog.length === 0) { alert('No food items calculated yet.'); return; }
    const header = ['Timestamp', 'Food', 'Calories', 'Servings', 'Carbs', 'Protein', 'Fiber', 'Health Points', 'Confidence', 'Image'];
    const rows = foodLog.map(e => [e.timestamp, e.food, e.calories, e.servings, e.carbs, e.protein, e.fiber, e.healthPoints, e.confidence, e.image]);
    const csv = [header].concat(rows).map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `gain-session-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the session history?')) {
      foodLog.length = 0;
      localStorage.removeItem('gain_food_log');
      ui.renderHistory(foodLog, historyBody);
      caloriesValue.textContent = '--';
      caloriesNote.textContent = 'Upload an image to predict food and calories.';
      nutritionResult.innerHTML = '';
      healthPointsResult.innerHTML = '';
      previewImg.style.display = 'none';
      lastConfidence = null;
      imageName = 'No image selected';
    }
  });

  imageUpload.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file) return;
    imageName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      previewImg.src = reader.result;
      previewImg.style.display = 'block';
      const img = new Image();
      img.onload = () => predictFromImage(img);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function predictFromImage(imgElement) {
  if (!model) return;
  showLoading(true);
  try {
    const prediction = await model.predict(imgElement);
    prediction.sort((a, b) => b.probability - a.probability);
    const top = prediction[0];
    lastConfidence = top.probability;
    
    labelContainer.innerHTML = prediction.slice(0, 3).map(p => 
      `<div style="display:flex; justify-content:space-between;">
        <span>${FOOD_DATABASE[p.className]?.name || p.className}</span>
        <span style="font-weight:700;">${(p.probability * 100).toFixed(1)}%</span>
      </div>`
    ).join('');
    
    if (top.probability > 0.65 && FOOD_DATABASE[top.className]) {
      foodClass.value = top.className;
      document.getElementById('calcBtn').click();
    } else {
      caloriesNote.textContent = 'Low confidence prediction. Please verify or select food manually.';
      caloriesNote.style.color = 'var(--danger)';
      foodClass.focus();
    }
  } catch (err) {
    console.error(err);
  } finally {
    showLoading(false);
  }
}

// Start the app
init();


// Start the app
init();
