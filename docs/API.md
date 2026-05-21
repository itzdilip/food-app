# API Documentation

## `data.js`
Centralized data and configuration.

### `FOOD_DATABASE`
Object containing food item metadata.
```javascript
{
  "KEY": {
    name: string,
    calories: number,
    carbs: number,
    protein: number,
    fiber: number,
    healthScore: number (1-10),
    tip: string
  }
}
```

---

## `ui.js`
Pure functions for UI rendering.

### `renderReferenceTables(db, calorieElem, nutritionElem)`
Renders the static nutritional reference tables.

### `renderDietChart(db, listElem)`
Populates the dietary guidelines list.

### `renderHistory(log, bodyElem)`
Renders the session history table from the `foodLog` array.

### `updateResultDisplay(elements, data)`
Updates the main result cards. Expects DOM elements and a flat data object.

---

## `app.js` (Private Methods)
Internal logic handlers.

### `initModel()`
Asynchronously loads the TensorFlow.js model and performs warming.

### `calcHealthPoints(key, servings)`
Calculates deterministic health points.

### `predictFromImage(imgElement)`
Processes an image element through the AI model and triggers UI updates.
