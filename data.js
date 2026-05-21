/**
 * G.A.I.N Food Database
 * Centralized data for calories, nutrition, and diet tips.
 */

export const FOOD_DATABASE = {
  "burger": {
    name: "Burger",
    calories: 250,
    carbs: 30.0,
    protein: 12.0,
    fiber: 2.0,
    healthScore: 4,
    tip: "Choose whole wheat buns and add extra veggies."
  },
  "butter_naan": {
    name: "Butter Naan",
    calories: 260,
    carbs: 40.0,
    protein: 6.0,
    fiber: 2.0,
    healthScore: 5,
    tip: "High in refined flour. Limit consumption."
  },
  "chai": {
    name: "Chai",
    calories: 80,
    carbs: 10.0,
    protein: 2.0,
    fiber: 0.0,
    healthScore: 5,
    tip: "Limit added sugar. Try with ginger or cardamom."
  },
  "chapati": {
    name: "Chapati",
    calories: 70,
    carbs: 15.0,
    protein: 3.0,
    fiber: 2.0,
    healthScore: 9,
    tip: "A healthy staple. Best when made without excess oil."
  },
  "chole_bhature": {
    name: "Chole Bhature",
    calories: 450,
    carbs: 50.0,
    protein: 10.0,
    fiber: 5.0,
    healthScore: 3,
    tip: "Heavy and deep-fried. Enjoy occasionally."
  },
  "dal_makhani": {
    name: "Dal Makhani",
    calories: 181,
    carbs: 20.5,
    protein: 6.8,
    fiber: 3.5,
    healthScore: 7,
    tip: "Good protein source. Limit butter/cream."
  },
  "dhokla": {
    name: "Dhokla",
    calories: 160,
    carbs: 22.0,
    protein: 6.0,
    fiber: 2.0,
    healthScore: 7,
    tip: "Low-fat fermented snack. Good for evenings."
  },
  "fried_rice": {
    name: "Fried Rice",
    calories: 168,
    carbs: 21.1,
    protein: 6.3,
    fiber: 0.7,
    healthScore: 5,
    tip: "Use less oil. Opt for brown rice."
  },
  "idli": {
    name: "Idli",
    calories: 58,
    carbs: 12.5,
    protein: 2.3,
    fiber: 1.2,
    healthScore: 8,
    tip: "Pair with sambar. Limit to 2-3 pieces per meal."
  },
  "jalebi": {
    name: "Jalebi",
    calories: 300,
    carbs: 62.4,
    protein: 4.2,
    fiber: 1.0,
    healthScore: 1,
    tip: "High sugar. Avoid if diabetic or weight-managing."
  },
  "kaathi_rolls": {
    name: "Kaathi Rolls",
    calories: 280,
    carbs: 35.0,
    protein: 8.0,
    fiber: 3.0,
    healthScore: 6,
    tip: "Ask for less oil and more vegetables."
  },
  "kadai_paneer": {
    name: "Kadai Paneer",
    calories: 250,
    carbs: 12.0,
    protein: 15.0,
    fiber: 3.0,
    healthScore: 7,
    tip: "Rich in protein. Balance with rotis or brown rice."
  },
  "kulfi": {
    name: "Kulfi",
    calories: 180,
    carbs: 25.0,
    protein: 4.0,
    fiber: 0.0,
    healthScore: 2,
    tip: "Traditional dessert. High in calories and sugar."
  },
  "masala_dosa": {
    name: "Masala Dosa",
    calories: 220,
    carbs: 32.0,
    protein: 5.0,
    fiber: 1.7,
    healthScore: 6,
    tip: "Opt for less oil. Best as breakfast or lunch."
  },
  "momos": {
    name: "Momos",
    calories: 200,
    carbs: 30.0,
    protein: 6.0,
    fiber: 2.0,
    healthScore: 5,
    tip: "Prefer steamed over fried. Watch the spicy chutney."
  },
  "paani_puri": {
    name: "Pani Puri",
    calories: 170,
    carbs: 24.7,
    protein: 4.0,
    fiber: 3.7,
    healthScore: 4,
    tip: "Limit to 4-6 pieces per serving."
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
  "pav_bhaji": {
    name: "Pav Bhaji",
    calories: 400,
    carbs: 50.0,
    protein: 8.0,
    fiber: 4.0,
    healthScore: 4,
    tip: "Limit butter on pav and use more bhaji (vegetables)."
  },
  "pizza": {
    name: "Pizza",
    calories: 285,
    carbs: 36.0,
    protein: 12.0,
    fiber: 2.3,
    healthScore: 3,
    tip: "Restrict to once a week. Choose thin-crust with vegetables."
  },
  "samosa": {
    name: "Samosa",
    calories: 308,
    carbs: 32.0,
    protein: 5.0,
    fiber: 2.0,
    healthScore: 3,
    tip: "Deep-fried. Limit to one piece occasionally."
  }
};

export const CONFIG = {
  YEARLY_TARGET: 500,
  DISCOUNT_PERCENT: 10,
  TM_MODEL_URL: './my_model/'
};
