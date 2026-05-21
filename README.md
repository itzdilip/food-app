# G.A.I.N — Food Calorie Detector

> **Gain Advantage through Intelligent Nutrition**

[![Live Demo GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-teal?style=flat-square)](https://itzdilip.github.io/G-A-I-N/)
[![Branch](https://img.shields.io/badge/Pages%20Branch-itzdilip--patch--1-blue?style=flat-square)](https://github.com/itzdilip/G-A-I-N/tree/itzdilip-patch-1)

## Overview

G.A.I.N is an Artificial Intelligence system backed by a trained Teachable Machine model that classifies **20 types of Indian and popular food**. Based on the food classification, calories, nutritional values (carbohydrates, proteins, fiber) and health points are associated. Points can be positive or negative depending on the food type, and the cumulative balance of points over a yearly time frame determines **discounts on health insurance premiums**.

## Live Demo

The app is deployed via **GitHub Pages**:

**URL:** https://itzdilip.github.io/G-A-I-N/

## Documentation

Comprehensive documentation for G.A.I.N is available in the [`docs/`](./docs/) directory:

- [**Design Document**](./docs/DESIGN.md): Technical architecture and data flow.
- [**User Guide**](./docs/USER_GUIDE.md): Instructions for using the application.
- [**API Docs**](./docs/API.md): Details on modules and functions.

## Repository Structure

```
G-A-I-N/
├── Food-Images/          # Training dataset (20 categories)
├── my_model/             # Trained model files (model.json, metadata.json, weights.bin)
├── app.js                # Main application logic
├── data.js               # Centralized food & nutrition database
├── train.js              # Node.js training script
├── style.css             # Modernized styling
├── index.html            # Main entry point
└── README.md             # This file
```

## Features

- **Expanded AI Model:** Trained on 20 categories with ~6000 images using transfer learning.
- **Image Sanitization:** Training pipeline includes robust image cleaning for 100% data utilization.
- **Modular Architecture:** Code split into ES6 modules for better maintainability.
- **Centralized Database:** All nutritional data and diet tips managed in a single `data.js` file.
- **AI-Powered Detection:** Upload a food image and auto-detect the food type using a Teachable Machine compatible AI model.
- **Enhanced UI/UX:**
    - Loading states with spinners during model initialization and prediction.
    - **Session History:** Interactive table showing recent detections and health points.
    - **Reset Session:** Ability to clear current log and reset the interface.
- **Nutritional tracking:** Calculates calories, carbs, protein, and fiber based on serving size.
- **Health Points System:** Gamified feedback based on food healthiness.
- **CSV Export:** Comprehensive session log export.
- **Responsive Design:** Optimized for both mobile and desktop with a modern "Card" based layout.
- **Dark / Light Theme:** Seamless toggle for user preference.

## Supported Food Classes (20)

| Food Category | Calories / Serving | Health Score |
|---|---|---|
| Burger | 250 kcal | 4 |
| Butter Naan | 260 kcal | 5 |
| Chai | 80 kcal | 5 |
| Chapati | 70 kcal | 9 |
| Chole Bhature | 450 kcal | 3 |
| Dal Makhani | 181 kcal | 7 |
| Dhokla | 160 kcal | 7 |
| Fried Rice | 168 kcal | 5 |
| Idli | 58 kcal | 8 |
| Jalebi | 300 kcal | 1 |
| Kaathi Rolls | 280 kcal | 6 |
| Kadai Paneer | 250 kcal | 7 |
| Kulfi | 180 kcal | 2 |
| Masala Dosa | 220 kcal | 6 |
| Momos | 200 kcal | 5 |
| Pani Puri | 170 kcal | 4 |
| Pakoda | 287 kcal | 4 |
| Pav Bhaji | 400 kcal | 4 |
| Pizza | 285 kcal | 3 |
| Samosa | 308 kcal | 3 |

## Tech Stack

| Component | Technology |
|---|---|
| AI Model | Teachable Machine (Google) |
| ML Runtime | TensorFlow.js |
| Frontend | HTML5, Vanilla CSS3 (Custom Properties), ES6+ JavaScript |
| Architecture | Modular Module Pattern |
| Hosting | GitHub Pages |
| Model Files | `my_model/` (model.json + metadata.json) |

## Branch Info

| Branch | Purpose |
|---|---|
| `may-changes` | Modernized & Modularized version (Active) |
| `itzdilip-patch-1` | Legacy ADR2 version |
| `main` | Base branch |
