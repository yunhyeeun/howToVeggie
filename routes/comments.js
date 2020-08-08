const express = require("express"),
      router = express.Router({mergeParams: true});

const Recipe = require("../models/recipe"),
      Comment = require("../models/comment");

// show comment form
router.get("/new", isLoggedIn, (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comment/new", {recipe: foundRecipe});
        }
    });
});

// comments create
router.post("/", isLoggedIn, (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            console.log(err);
            res.redirect("/recipes");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundRecipe.comments.push(comment);
                    foundRecipe.save();
                    res.redirect("/recipes/" + foundRecipe._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect("back");
            } else {
                res.render("comment/edit", { recipe_id: req.params.id, comment: foundComment});
            }
        });
});

router.put("/:comment_id", checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/recipes/" + req.params.id);
        }
    });
});

router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/recipes/" + req.params.id);
        }
    });
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/login");
    }
};

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    }
}
module.exports = router;
