# G.A.I.N — Food Calorie Detector

> **Gain Advantage through Intelligent Nutrition**

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-teal?style=flat-square)](https://itzdilip.github.io/G-A-I-N/)
[![Branch](https://img.shields.io/badge/Pages%20Branch-itzdilip--patch--1-blue?style=flat-square)](https://github.com/itzdilip/G-A-I-N/tree/itzdilip-patch-1)

## Overview

G.A.I.N is an Artificial Intelligence system backed by a trained Teachable Machine model that classifies **10 types of Indian and popular food**. Based on the food classification, calories and health points are associated. Points can be positive or negative depending on the food type, and the cumulative balance of points over a yearly time frame determines **discounts on health insurance premiums**.

## Live Demo

The app is deployed via **GitHub Pages** from the `itzdilip-patch-1` branch:

**URL:** https://itzdilip.github.io/G-A-I-N/

## App Pages

| Page | URL | Description |
|---|---|---|
| **index.html** | [Live](https://itzdilip.github.io/G-A-I-N/index.html) | Main G.A.I.N app — food image upload, AI detection, calorie calculation, session CSV export, diet chart |
| **adr2.html** | [Live](https://itzdilip.github.io/G-A-I-N/adr2.html) | ADR2 Edition — all features of index.html plus nutritional data (carbs, protein, fiber) and randomised health points per food item |

## Features (index.html)

- Upload a food image and auto-detect the food type using a Teachable Machine AI model
- Manually select food and serving size from the dropdown
- Calculate estimated calories per serving
- **Session Log CSV Export** — tracks every food item calculated in a session and exports as a `.csv` file (date-stamped)
- Download single result as a `.txt` file
- Diet Chart with healthy eating tips for all 10 food items
- Dark / Light theme toggle
- Fully responsive — works on mobile and desktop

## Additional Features (adr2.html)

- Everything in index.html, plus:
- **Nutritional data** — static carbohydrates, protein and fiber values per serving for all 10 food classes (sourced from FatSecret, Clearcals, NutriScan)
- **Health Points** — randomised points per food entry based on a health score (1–10), displayed with colour coding (green = healthy, red = unhealthy)
- **Nutrition Reference table** — sidebar table showing carbs / protein / fiber for all 10 foods
- Enhanced CSV export includes: Timestamp, Food, Calories, Servings, Carbohydrates (g), Protein (g), Fiber (g), Health Points, Confidence, Image

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

## Diet Chart Summary

Both pages include a built-in Diet Chart with recommendations for each food item:

| Food | Tip |
|---|---|
| Idly | Pair with sambar. Limit to 2-3 pieces per meal |
| Masala Dosa | Opt for less oil. Best as breakfast or lunch |
| Pizza | Restrict to once a week. Choose thin-crust with vegetables |
| Jilabi | High sugar. Avoid if diabetic or weight-managing |
| Dhokla | Low-fat fermented snack. Good for evenings |
| Dal Makhani | Good protein source. Limit butter/cream |
| Samosa | Deep-fried. Limit to one piece occasionally |
| Pakoda | Avoid frequent consumption. Try air-fried version |
| Pani Puri | Limit to 4-6 pieces per serving |
| Fried Rice | Use less oil. Opt for brown rice |

> Aim for a balanced plate: 50% vegetables, 25% protein, 25% whole grains.

## Repository Layout

```
G-A-I-N/
├── index.html        # Main G.A.I.N app (GitHub Pages entry point)
├── adr2.html         # ADR2 Edition — with nutrition data & health points
└── my_model/
    ├── model.json    # Teachable Machine model
    ├── metadata.json # Class labels and metadata
    └── weights.bin   # Trained model weights
```

## How to Use

1. Go to the [Live Demo](https://itzdilip.github.io/G-A-I-N/)
2. Upload a food image using the **Choose File** button
3. The AI model will auto-detect the food and calculate calories
4. Optionally adjust the **Serving multiplier** and click **Calculate calories**
5. Click **Export Session Log (CSV)** to download a full session report
6. Scroll down to view the **Diet Chart** for healthy eating tips
7. For nutritional breakdown (carbs/protein/fiber) and health points, visit [adr2.html](https://itzdilip.github.io/G-A-I-N/adr2.html)

## Export Options

| Branch | Export Type | Description |
|---|---|---|
| `itzdilip-patch-1` (index.html) | **Session Log CSV** | Timestamp, Food, Calories, Servings, Confidence, Image |
| `itzdilip-patch-1` (adr2.html) | **Enhanced Session Log CSV** | Adds Carbohydrates, Protein, Fiber, Health Points columns |

## Tech Stack

- **Frontend:** Pure HTML, CSS, JavaScript (no frameworks)
- **AI Model:** [Teachable Machine](https://teachablemachine.withgoogle.com/) by Google
- **Deployment:** GitHub Pages (`itzdilip-patch-1` branch)
- **Libraries:** TensorFlow.js, Teachable Machine Image library (via CDN)

## Configuration

Yearly point target and insurance discount percentage are configurable via the hidden `gainConfig` element in `index.html`:

```html
<div id="gainConfig" data-yearly-target="500" data-discount-percent="10" style="display:none;"></div>
```

- **Yearly Target:** 500 points
- **Discount:** 10% off health insurance premium upon reaching target

## License

MIT License — free to use and modify.
