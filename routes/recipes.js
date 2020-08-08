const express = require("express"),
      router = express.Router();

const Recipe = require("../models/recipe");

// INDEX ROUTE
router.get("/", (req, res) => {
    Recipe.find({}, (err, allRecipes) => {
        if (err) {
            console.log(err);
        } else {
            res.render("recipe/recipes", { recipes: allRecipes, currentUser: req.user });
        }
    });
});

// NEW ROUTE
router.get("/new", isLoggedIn, (req, res) => res.render("recipe/new"));

// CREATE ROUTE
router.post("/", isLoggedIn, (req, res) => {
    Recipe.create(req.body.recipe, (err, newRecipe) => {
        if (err) {
            res.render("recipe/new");
        } else {
            const author = {
                id: req.user._id,
                username: req.user.username
            };
            newRecipe.author = author;
            newRecipe.save();
            console.log(newRecipe);
            res.redirect("/recipes");
        }
    });
});

// SHOW ROUTE
router.get("/:id", (req, res) => {
    Recipe.findById(req.params.id).populate("comments").exec((err, foundRecipe) => {
        if (err) {
            res.redirect("/recipes");
        } else {
            res.render("recipe/show", {recipe: foundRecipe});
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", checkRecipeOwnership, (req, res) => {
    // is user logged in
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        res.render("recipe/edit", { recipe: foundRecipe });
    });
});


// UPDATE ROUTE
router.put("/:id", checkRecipeOwnership, (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, (err, updatedRecipe) => {
        if (err) {
            res.redirect("/recipes");
        } else {
            res.redirect("/recipes/" + req.params.id);
        }
    })
});

// DELETE ROUTE
router.delete("/:id", checkRecipeOwnership, (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/recipes");
        } else {
            res.redirect("/recipes");
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/login");
    }
}

function checkRecipeOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        // otherwise, redirect
        Recipe.findById(req.params.id, (err, foundRecipe) => {
            if (err) {
                res.redirect("back");
            } else {
                // does user own the recipe?
                if (foundRecipe.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;