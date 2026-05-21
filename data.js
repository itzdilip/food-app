/**
 * G.A.I.N Food Database
 * Centralized data for calories, nutrition, and diet tips.
 */

export const FOOD_DATABASE = {
  "IDLY": {
    name: "Idly",
    calories: 58,
    carbs: 12.5,
    protein: 2.3,
    fiber: 1.2,
    healthScore: 8,
    tip: "Pair with sambar. Limit to 2-3 pieces per meal."
  },
  "Masala-Dosa": {
    name: "Masala Dosa",
    calories: 220,
    carbs: 32.0,
    protein: 5.0,
    fiber: 1.7,
    healthScore: 6,
    tip: "Opt for less oil. Best as breakfast or lunch."
  },
  "Pizza": {
    name: "Pizza",
    calories: 285,
    carbs: 36.0,
    protein: 12.0,
    fiber: 2.3,
    healthScore: 3,
    tip: "Restrict to once a week. Choose thin-crust with vegetables."
  },
  "Jilabi": {
    name: "Jilabi",
    calories: 300,
    carbs: 62.4,
    protein: 4.2,
    fiber: 1.0,
    healthScore: 1,
    tip: "High sugar. Avoid if diabetic or weight-managing."
  },
  "Dhokala": {
    name: "Dhokla",
    calories: 160,
    carbs: 22.0,
    protein: 6.0,
    fiber: 2.0,
    healthScore: 7,
    tip: "Low-fat fermented snack. Good for evenings."
  },
  "dalmakni": {
    name: "Dal Makhani",
    calories: 181,
    carbs: 20.5,
    protein: 6.8,
    fiber: 3.5,
    healthScore: 7,
    tip: "Good protein source. Limit butter/cream."
  },
  "samosa": {
    name: "Samosa",
    calories: 308,
    carbs: 32.0,
    protein: 5.0,
    fiber: 2.0,
    healthScore: 3,
    tip: "Deep-fried. Limit to one piece occasionally."
  },
  "pakode": {
    name: "Pakoda",
    calories: 287,
    carbs: 37.7,
    protein: 11.3,
    fiber: 10.7,
    healthScore: 4,
    tip: "Avoid frequent consumption. Try air-fried version."
  },
  "Panipuri": {
    name: "Pani Puri",
    calories: 170,
    carbs: 24.7,
    protein: 4.0,
    fiber: 3.7,
    healthScore: 4,
    tip: "Limit to 4-6 pieces per serving."
  },
  "friedrice": {
    name: "Fried Rice",
    calories: 168,
    carbs: 21.1,
    protein: 6.3,
    fiber: 0.7,
    healthScore: 5,
    tip: "Use less oil. Opt for brown rice."
  }
};

export const CONFIG = {
  YEARLY_TARGET: 500,
  DISCOUNT_PERCENT: 10,
  TM_MODEL_URL: './my_model/'
};
