const mongoose = require("mongoose"),
    Recipe = require("./models/recipe"),
    Comment = require("./models/comment");

const data = [
    {
        name: "Avocado Taco",
        image: "https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
		body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Avocado Taco",
        image: "https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
		body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Avocado Taco",
        image: "https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
		body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]

function seedDB() {
    // Remove all recipes
    Recipe.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed all recipes!");
            // Add sample data
            data.forEach(function (seed) {
                Recipe.create(seed, function (err, recipe) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added sample recipes!");
                        Comment.create({
                            text: "This is really tasty",
                            author: "Annie"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                recipe.comments.push(comment);
                                recipe.save();
                                console.log("created new comment");
                            }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;