# G.A.I.N — Food Calorie Detector

> **Gain Advantage through Intelligent Nutrition**

[![Live Demo GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-teal?style=flat-square)](https://itzdilip.github.io/G-A-I-N/)
[![Branch](https://img.shields.io/badge/Pages%20Branch-itzdilip--patch--1-blue?style=flat-square)](https://github.com/itzdilip/G-A-I-N/tree/itzdilip-patch-1)

## Overview

G.A.I.N is an Artificial Intelligence system backed by a trained Teachable Machine model that classifies **10 types of Indian and popular food**. Based on the food classification, calories, nutritional values (carbohydrates, proteins, fiber) and health points are associated. Points can be positive or negative depending on the food type, and the cumulative balance of points over a yearly time frame determines **discounts on health insurance premiums**.

## Live Demo

The app is deployed via **GitHub Pages** from the `itzdilip-patch-1` branch:

**URL:** https://itzdilip.github.io/G-A-I-N/

## Repository Structure

```
G-A-I-N/
├── .github/
│   └── workflows/        # GitHub Actions CI/CD workflows
├── my_model/             # Teachable Machine trained model files
│   ├── model.json
│   └── metadata.json
├── index.html            # Main G.A.I.N app (ADR2 Edition)
└── README.md             # This file
```

## App Page

| Page | URL | Description |
|---|---|---|
| **index.html** | [Live](https://itzdilip.github.io/G-A-I-N/index.html) | G.A.I.N ADR2 Edition — food image upload, AI detection, calorie calculation, nutritional data, health points, session CSV export, diet chart |

## Features

- Upload a food image and auto-detect the food type using a Teachable Machine AI model
- Manually select food and serving size from the dropdown
- Calculate estimated calories per serving
- **Nutritional data** — static carbohydrates, protein and fiber values per serving for all 10 food classes
- **Health Points** — points per food entry based on a health score (1–10), displayed with colour coding (green = healthy, red = unhealthy)
- **Nutrition Reference table** — sidebar table showing carbs / protein / fiber for all 10 foods
- **Session Log CSV Export** — tracks every food item calculated in a session and exports as a `.csv` file (date-stamped) with columns: Timestamp, Food, Calories, Servings, Carbohydrates (g), Protein (g), Fiber (g), Health Points, Confidence, Image
- Download single result as a `.txt` file
- Diet Chart with healthy eating tips for all 10 food items
- Dark / Light theme toggle
- Fully responsive — works on mobile and desktop

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

## Diet Chart & Healthy Eating Tips

- **Idly (58 kcal):** Pair with sambar. Limit to 2-3 pieces per meal.
- **Masala Dosa (220 kcal):** Opt for less oil. Best as breakfast or lunch.
- **Pizza (285 kcal):** Restrict to once a week. Choose thin-crust with vegetables.
- **Jilabi (300 kcal):** High sugar. Avoid if diabetic or weight-managing.
- **Dhokla (160 kcal):** Low-fat fermented snack. Good for evenings.
- **Dal Makhani (181 kcal):** Good protein source. Limit butter/cream.
- **Samosa (308 kcal):** Deep-fried. Limit to one piece occasionally.
- **Pakoda (287 kcal):** Avoid frequent consumption. Try air-fried version.
- **Pani Puri (170 kcal):** Limit to 4-6 pieces per serving.
- **Fried Rice (168 kcal):** Use less oil. Opt for brown rice.

## Tech Stack

| Component | Technology |
|---|---|
| AI Model | Teachable Machine (Google) |
| ML Runtime | TensorFlow.js |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Hosting | GitHub Pages |
| Model Files | `my_model/` (model.json + metadata.json) |

## Branch Info

| Branch | Purpose |
|---|---|
| `itzdilip-patch-1` | Active development + GitHub Pages deployment |
| `main` | Base branch |
