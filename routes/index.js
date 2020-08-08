const express = require("express"),
      router = express.Router(),
      passport = require("passport");

const User = require("../models/user");

router.get("/", (req, res) => res.redirect("/recipes"));

// show register form
router.get("/register", (req, res) => res.render("register"));

// handle sign up logic
router.post("/register", (req, res) => {
    const newUser = new User({ username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/recipes");
            });
        }
    });
});

// show log in form
router.get("/login", (req, res) => res.render("login"));

// handle log in logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/recipes",
        failureRedirect: "/login"
    }), (req, res) => {
});

// log out route
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("recipes");
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/login");
    }
};

module.exports = router;