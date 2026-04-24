# G.A.I.N — Food Calorie Detector

> **Gain Advantage through Intelligent Nutrition**

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-teal?style=flat-square)](https://itzdilip.github.io/G-A-I-N/)
[![Branch](https://img.shields.io/badge/Pages%20Branch-itzdilip--patch--1-blue?style=flat-square)](https://github.com/itzdilip/G-A-I-N/tree/itzdilip-patch-1)

## Overview

G.A.I.N is an Artificial Intelligence system backed by a trained Teachable Machine model that classifies **10 types of Indian and popular food**. Based on the food classification, calories and health points are associated. Points can be positive or negative depending on the food type, and the cumulative balance of points over a yearly time frame determines **discounts on health insurance premiums**.

## Live Demo

The app is deployed via **GitHub Pages** from the `itzdilip-patch-1` branch:

**URL:** https://itzdilip.github.io/G-A-I-N/

## Features

- Upload a food image and auto-detect the food type using a Teachable Machine AI model
- Manually select food and serving size from the dropdown
- Calculate estimated calories per serving
- **Session Log CSV Export** — tracks every food item calculated in a session and exports as a `.csv` file (date-stamped)
- Download single result as a `.txt` file
- Diet Chart with healthy eating tips for all 10 food items
- Dark / Light theme toggle
- Fully responsive — works on mobile and desktop

## Supported Food Classes

| Food | Calories / Serving |
|---|---|
| IDLY | 58 kcal |
| Masala-Dosa | 220 kcal |
| Pizza | 285 kcal |
| Jilabi | 300 kcal |
| Dhokala | 160 kcal |
| Dal Makhani | 181 kcal |
| Samosa | 308 kcal |
| Pakode | 287 kcal |
| Pani Puri | 170 kcal |
| Fried Rice | 168 kcal |

## Export Options (Branches)

Three export strategies are available across different branches:

| Branch | Export Type | Description |
|---|---|---|
| `itzdilip-patch-1` | **Session Log CSV** | Tracks all food items in a session; exports multi-row `.csv` — ideal for daily insurance reporting |
| `export-csv-simple` | Simple CSV | Exports current food item as a single-row `.csv`; compatible with Google Sheets / Excel |
| `export-googlefit-json` | Google Fit JSON | Exports in Google Fit REST API `dataPoint` format for programmatic health data upload |

## Repository Layout

```
G-A-I-N/
├── index.html          # Main app (single-file static app)
└── my_model/
    ├── model.json      # Teachable Machine model
    ├── metadata.json   # Class labels and metadata
    └── weights.bin     # Trained model weights
```

## How to Use

1. Go to the [Live Demo](https://itzdilip.github.io/G-A-I-N/)
2. Upload a food image using the **Choose File** button
3. The AI model will auto-detect the food and calculate calories
4. Optionally adjust the **Serving multiplier** and click **Calculate calories**
5. Click **Export Session Log (CSV)** to download a full session report
6. Scroll down to view the **Diet Chart** for healthy eating tips

## Tech Stack

- **Frontend:** Pure HTML, CSS, JavaScript (no frameworks)
- **AI Model:** [Teachable Machine](https://teachablemachine.withgoogle.com/) by Google
- **Deployment:** GitHub Pages (`itzdilip-patch-1` branch)
- **Libraries:** TensorFlow.js, Teachable Machine Image library (via CDN)

## Configuration

Yearly point target and insurance discount percentage are configurable via the hidden `gainConfig` element in `index.html`:

```html
<div id="gainConfig"
     data-yearly-target="500"
     data-discount-percent="10"
     style="display:none;">
</div>
```

- **Yearly Target:** 500 points
- **Discount:** 10% off health insurance premium upon reaching target

## Diet Chart Summary

The app includes a built-in Diet Chart with recommendations for each food item, including portion control tips, healthier preparation suggestions, and nutritional context.

## License

MIT License — free to use and modify.