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
const previewContainer = document.getElementById('previewContainer');
const loadingOverlay = document.getElementById('loadingOverlay');
const historyBody = document.getElementById('historyBody');
const nutritionResult = document.getElementById('nutritionResult');
const healthPointsResult = document.getElementById('healthPointsResult');
const dietChartList = document.getElementById('dietChartList');

// Settings Elements
const dataSource = document.getElementById('dataSource');
const apiSettings = document.getElementById('apiSettings');
const apiKeyInput = document.getElementById('apiKey');
const apiAppIdInput = document.getElementById('apiAppId');

// ===== INITIALIZATION =====
function init() {
  loadTheme();
  loadSettings();
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

function loadSettings() {
  const mode = localStorage.getItem('gain_data_mode') || 'local';
  dataSource.value = mode;
  apiSettings.style.display = mode === 'api' ? 'block' : 'none';
  apiKeyInput.value = localStorage.getItem('gain_api_key') || '';
  apiAppIdInput.value = localStorage.getItem('gain_api_id') || '';
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
    
    // Model Warming
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 224;
    tempCanvas.height = 224;
    await model.predict(tempCanvas);

    labelContainer.innerHTML = '<div style="color: var(--success)">✓ AI Model Ready</div>';
  } catch (err) {
    console.error(err);
    labelContainer.innerHTML = '<div style="color: var(--danger)">✗ Model failed to load</div>';
  } finally {
    showLoading(false);
  }
}

// ===== API LOGIC (Edamam) =====
async function fetchNutritionFromAPI(foodName) {
  const appId = apiAppIdInput.value;
  const appKey = apiKeyInput.value;
  
  if (!appId || !appKey) {
    alert('Please enter your Edamam App ID and API Key in settings for Live API mode.');
    dataSource.value = 'local';
    apiSettings.style.display = 'none';
    return null;
  }

  showLoading(true);
  try {
    const url = `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`;
    // Edamam Nutrition Data API often requires a POST of the ingredients. 
    // For a simple "search", the Food Database API is better.
    const searchUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(foodName)}&nutrition-type=logging`;
    
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    if (data.parsed && data.parsed.length > 0) {
      const food = data.parsed[0].food;
      const nut = food.nutrients;
      return {
        name: food.label,
        calories: Math.round(nut.ENERC_KCAL || 0),
        carbs: (nut.CHOCDF || 0).toFixed(1),
        protein: (nut.PROCNT || 0).toFixed(1),
        fiber: (nut.FIBTG || 0).toFixed(1),
        healthScore: 5 // Default for API items
      };
    }
    return null;
  } catch (err) {
    console.error('API Fetch Error:', err);
    return null;
  } finally {
    showLoading(false);
  }
}

// ===== CORE LOGIC =====
function calcHealthPoints(score, servings) {
  return Math.round((score - 5) * 5 * servings);
}

function showLoading(show) {
  loadingOverlay.style.display = show ? 'flex' : 'none';
}

async function updateResultUI(selectedKey, serving) {
  let foodData = null;

  if (dataSource.value === 'api') {
    const query = FOOD_DATABASE[selectedKey]?.name || selectedKey;
    foodData = await fetchNutritionFromAPI(query);
  }

  // Fallback to local if API fails or mode is local
  if (!foodData) {
    const local = FOOD_DATABASE[selectedKey];
    if (local) {
      foodData = { ...local };
    } else {
      caloriesNote.textContent = 'Food not found in local database.';
      return;
    }
  }

  const total = Math.round(foodData.calories * serving);
  const healthPts = calcHealthPoints(foodData.healthScore, serving);
  const ptColor = healthPts >= 0 ? 'var(--primary)' : 'var(--danger)';

  ui.updateResultDisplay(
    { caloriesValue, caloriesNote, nutritionResult, healthPointsResult },
    { ...foodData, serving, total, healthPts, ptColor, imageName, lastConfidence }
  );

  addToLog(foodData.name, total, serving, foodData.carbs, foodData.protein, foodData.fiber, healthPts);
}

function addToLog(name, calories, servings, carbs, protein, fiber, healthPoints) {
  const entry = {
    timestamp: new Date().toLocaleTimeString(),
    food: name,
    calories,
    servings,
    carbs,
    protein,
    fiber,
    healthPoints,
    confidence: lastConfidence !== null ? (lastConfidence * 100).toFixed(1) + '%' : 'N/A',
    image: imageName
  };
  foodLog.unshift(entry);
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

  dataSource.addEventListener('change', (e) => {
    const mode = e.target.value;
    apiSettings.style.display = mode === 'api' ? 'block' : 'none';
    localStorage.setItem('gain_data_mode', mode);
  });

  apiKeyInput.addEventListener('input', (e) => localStorage.setItem('gain_api_key', e.target.value));
  apiAppIdInput.addEventListener('input', (e) => localStorage.setItem('gain_api_id', e.target.value));

  document.getElementById('saveSettingsBtn').addEventListener('click', () => {
    localStorage.setItem('gain_api_key', apiKeyInput.value);
    localStorage.setItem('gain_api_id', apiAppIdInput.value);
    alert('API Settings Saved Successfully!');
  });

  document.getElementById('calcBtn').addEventListener('click', () => {
    const selected = foodClass.value;
    const serving = parseFloat(document.getElementById('serving').value || '1');
    updateResultUI(selected, serving);
  });

  document.getElementById('downloadBtn').addEventListener('click', () => {
    const text = `G.A.I.N Result\n------------\nFood: ${caloriesNote.textContent.split(' x ')[0]}\nEstimated Calories: ${caloriesValue.textContent}\nDetails: ${caloriesNote.textContent}`;
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
      previewContainer.style.display = 'none';
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
      previewContainer.style.display = 'block';
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
      `<div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
        <span>${FOOD_DATABASE[p.className]?.name || p.className}</span>
        <span style="font-weight:700; color: var(--primary);">${(p.probability * 100).toFixed(1)}%</span>
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


// Start the app
init();
