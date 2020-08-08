const mongoose = require("mongoose");

//mongoose model config
const recipeSchema = new mongoose.Schema ({
    name: String,
    image: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recipe", recipeSchema);
