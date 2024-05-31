const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
    ingredient_name: { type: String },
    protein: { type: Number },
    fat: { type: Number },
    carbs: { type: Number },
    calories: { type: Number }
});

const TotalSchema = new mongoose.Schema({
    protein: { type: Number },
    fat: { type: Number },
    carbs: { type: Number },
    calories: { type: Number }
});

const MealSchema = new mongoose.Schema({
    meal_name: { type: String },
    ingredients: [IngredientSchema],
    total: TotalSchema,
    meal_type: { type: String },
    best_for: { type: String }
});

const Meal = mongoose.model('MealDiet', MealSchema);

module.exports = Meal;
