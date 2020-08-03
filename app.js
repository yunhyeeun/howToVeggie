const express = require('express'),
      port = 3000,
      bodyParser = require('body-parser'),
      methodOverride = require("method-override"),
      mongoose = require("mongoose"),
      app = express();

//app config
mongoose.connect("mongodb://localhost/howToVeggie", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then (
        () => console.log("Connect Success to DB!"))
    .catch (
        (error => console.log(error.message)));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

const Recipe = require("./models/recipe");

// RESTful routes
app.get("/", (req, res) => res.redirect("/recipes"));

// INDEX ROUTE
app.get("/recipes", (req, res) => {
    Recipe.find({}, (err, recipes) => {
        if (err) {
            console.log("ERROR!");
        } else {
            res.render("recipes", { recipes: recipes });
        }
    });
});

// NEW ROUTE
app.get("/recipes/new", (req, res) => res.render("new"));

// CREATE ROUTE
app.post("/recipes", (req, res) => {
    console.log(req.body);
    Recipe.create(req.body.recipe, (err, newBlog) => {
        if (err) {
            res.render("new");
        } else {
            console.log(newBlog);
            res.redirect("/recipes");
        }
    });
});

// SHOW ROUTE
app.get("/recipes/:id", (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            res.redirect("/recipes");
        } else {
            res.render("show", {recipe: foundRecipe});
        }
    })
});

// EDIT ROUTE
app.get("/recipes/:id/edit", (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            res.redirect("/recipes");
        } else {
            res.render("edit", {recipe: foundRecipe});
        }
    });
});

// UPDATE ROUTE
app.put("/recipes/:id", (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, (err, updatedRecipe) => {
        if (err) {
            res.redirect("/recipes");
        } else {
            res.redirect("/recipes/" + req.params.id);
        }
    })
})

// DELETE ROUTE
app.delete("/recipes/:id", (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/recipes");
        } else {
            res.redirect("/recipes");
        }
    });
})

app.listen(port, () => console.log("Server Connected!"));
