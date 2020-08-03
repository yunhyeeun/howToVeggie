const mongoose = require("mongoose");

//mongoose model config
const recipeSchema = new mongoose.Schema ({
    name: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recipe", recipeSchema);
