# Design Document: G.A.I.N (Food Calorie Detector)

## 1. Overview
G.A.I.N (Gain Advantage through Intelligent Nutrition) is a web-based AI application designed to classify food items from images and provide nutritional tracking. It utilizes a gamified "Health Points" system to encourage healthy eating habits.

## 2. Architecture
The application follows a modular ES6 JavaScript architecture, separating data, logic, and presentation.

### 2.1 Modules
- **`index.html`**: Entry point and UI structure.
- **`app.js`**: Orchestrator module. Manages application state, event listeners, and coordinates between the AI model and UI updates.
- **`data.js`**: Centralized data store. Contains the `FOOD_DATABASE` (calories, nutrition, tips) and global `CONFIG`.
- **`ui.js`**: Rendering engine. Encapsulates all DOM manipulation and HTML template generation.

## 3. Technical Stack
- **Frontend**: HTML5, Vanilla CSS3 (Custom Properties), ES6+ JavaScript.
- **AI/ML**: TensorFlow.js with Google Teachable Machine.
- **Storage**: `localStorage` for cross-session persistence of user history and preferences.

## 4. Key Workflows

### 4.1 AI Prediction & Verification
1. User uploads an image via `FileReader`.
2. `app.js` passes the image to the Teachable Machine model.
3. If confidence > 65%, the system auto-selects the food and calculates results.
4. If confidence is low, the system prompts the user for manual verification.

### 4.2 Health Points Logic
Health points are deterministic based on the food's base `healthScore`:
`Points = (healthScore - 5) * 5 * servings`

### 4.3 Persistence
- `gain_food_log`: Stores the array of previous detections.
- `gain_theme`: Stores the user's preferred theme (light/dark).

## 5. Performance Optimizations
- **Model Warming**: A dummy prediction is run on initialization to eliminate cold-start lag.
- **Module Separation**: Improves load time and maintainability.
