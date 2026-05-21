# G.A.I.N — Food Calorie Detector

> **Gain Advantage through Intelligent Nutrition**

[![Live Demo GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-teal?style=flat-square)](https://itzdilip.github.io/G-A-I-N/)
[![Branch](https://img.shields.io/badge/Pages%20Branch-itzdilip--patch--1-blue?style=flat-square)](https://github.com/itzdilip/G-A-I-N/tree/itzdilip-patch-1)

## Overview

G.A.I.N is an Artificial Intelligence system backed by a trained Teachable Machine model that classifies **10 types of Indian and popular food**. Based on the food classification, calories, nutritional values (carbohydrates, proteins, fiber) and health points are associated. Points can be positive or negative depending on the food type, and the cumulative balance of points over a yearly time frame determines **discounts on health insurance premiums**.

## Live Demo

The app is deployed via **GitHub Pages** from the `itzdilip-patch-1` branch:

**URL:** https://itzdilip.github.io/G-A-I-N/

## Documentation

Comprehensive documentation for G.A.I.N is available in the [`docs/`](./docs/) directory:

- [**Design Document**](./docs/DESIGN.md): Technical architecture and data flow.
- [**User Guide**](./docs/USER_GUIDE.md): Instructions for using the application.
- [**API Docs**](./docs/API.md): Details on modules and functions.

## Repository Structure

```
G-A-I-N/
├── .github/
│   └── workflows/        # GitHub Actions CI/CD workflows
├── my_model/             # Teachable Machine trained model files
│   ├── model.json
│   └── metadata.json
├── app.js                # Main application logic
├── data.js               # Centralized food & nutrition database
├── style.css             # Modernized styling
├── index.html            # Main entry point (Refactored ADR2 Edition)
└── README.md             # This file
```

## Features

- **Modular Architecture:** Code split into ES6 modules for better maintainability.
- **Centralized Database:** All nutritional data and diet tips managed in a single `data.js` file.
- **AI-Powered Detection:** Upload a food image and auto-detect the food type using a Teachable Machine AI model.
- **Enhanced UI/UX:**
    - Loading states with spinners during model initialization and prediction.
    - **Session History:** Interactive table showing recent detections and health points.
    - **Reset Session:** Ability to clear current log and reset the interface.
- **Nutritional tracking:** Calculates calories, carbs, protein, and fiber based on serving size.
- **Health Points System:** Gamified feedback based on food healthiness.
- **CSV Export:** Comprehensive session log export.
- **Responsive Design:** Optimized for both mobile and desktop with a modern "Card" based layout.
- **Dark / Light Theme:** Seamless toggle for user preference.

## Supported Food Classes

| Food | Calories / Serving | Carbs (g) | Protein (g) | Fiber (g) |
|---|---|---|---|---|
| IDLY | 58 kcal | 12.5 | 2.3 | 1.2 |
| Masala-Dosa | 220 kcal | 32.0 | 5.0 | 1.7 |
| Pizza | 285 kcal | 36.0 | 12.0 | 2.3 |
| Jilabi | 300 kcal | 62.4 | 4.2 | 1.0 |
| Dhokala | 160 kcal | 22.0 | 6.0 | 2.0 |
| Dal Makhani | 181 kcal | 20.5 | 6.8 | 3.5 |
| Samosa | 308 kcal | 32.0 | 5.0 | 2.0 |
| Pakode | 287 kcal | 37.7 | 11.3 | 10.7 |
| Pani Puri | 170 kcal | 24.7 | 4.0 | 3.7 |
| Fried Rice | 168 kcal | 21.1 | 6.3 | 0.7 |

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
