/**
 * G.A.I.N UI Module
 * Handles DOM rendering and UI updates.
 */

export function renderReferenceTables(foodDatabase, calorieTable, nutritionTable) {
  if (calorieTable) {
    calorieTable.innerHTML = `
      <thead>
        <tr><th>Food</th><th>Calories / serving</th></tr>
      </thead>
      <tbody>
        ${Object.values(foodDatabase).map(f => `<tr><td>${f.name}</td><td>${f.calories}</td></tr>`).join('')}
      </tbody>`;
  }

  if (nutritionTable) {
    nutritionTable.innerHTML = `
      <thead>
        <tr><th>Food</th><th>Carbs (g)</th><th>Protein (g)</th><th>Fiber (g)</th></tr>
      </thead>
      <tbody>
        ${Object.values(foodDatabase).map(f =>
          `<tr><td>${f.name}</td><td>${f.carbs}</td><td>${f.protein}</td><td>${f.fiber}</td></tr>`
        ).join('')}
      </tbody>`;
  }
}

export function renderDietChart(foodDatabase, chartList) {
  if (!chartList) return;
  chartList.innerHTML = Object.values(foodDatabase).map(f => 
    `<li><strong>${f.name} (${f.calories} kcal):</strong> ${f.tip}</li>`
  ).join('');
}

export function renderHistory(foodLog, historyBody) {
  if (!historyBody) return;
  if (foodLog.length === 0) {
    historyBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px; color: var(--muted);">No history yet. Start by detecting some food!</td></tr>`;
    return;
  }
  historyBody.innerHTML = foodLog.map(e => `
    <tr>
      <td>${e.timestamp}</td>
      <td>${e.food}</td>
      <td>${e.calories}</td>
      <td>${e.healthPoints >= 0 ? '+' : ''}${e.healthPoints}</td>
      <td>${e.confidence}</td>
    </tr>
  `).join('');
}

export function updateResultDisplay(elements, data) {
  const { caloriesValue, caloriesNote, nutritionResult, healthPointsResult } = elements;
  const { name, serving, total, carbs, protein, fiber, healthPts, ptColor, imageName, lastConfidence } = data;

  caloriesValue.textContent = total + ' kcal';
  const confidenceText = lastConfidence !== null ? ` - Confidence ${(lastConfidence * 100).toFixed(1)}%` : '';
  caloriesNote.textContent = `${name} x ${serving} serving(s) - ${imageName}${confidenceText}`;
  caloriesNote.style.color = 'var(--muted)';

  nutritionResult.innerHTML = `
    <table>
      <thead><tr><th>Nutrient</th><th>Per serving</th></tr></thead>
      <tbody>
        <tr><td>Carbohydrates</td><td>${carbs} g</td></tr>
        <tr><td>Protein</td><td>${protein} g</td></tr>
        <tr><td>Fiber</td><td>${fiber} g</td></tr>
      </tbody>
    </table>`;

  healthPointsResult.innerHTML = `
    <span style="color:${ptColor}">Health Points: ${healthPts > 0 ? '+' : ''}${healthPts}</span>
    <span class="small" style="margin-left:10px;">(${healthPts >= 5 ? 'Healthy choice!' : healthPts >= 0 ? 'Moderate' : 'Unhealthy - use sparingly'})</span>`;
}
