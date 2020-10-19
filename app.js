const express = require('express'),
      port = process.env.PORT || 3000,
      bodyParser = require('body-parser'),
      methodOverride = require("method-override"),
      mongoose = require("mongoose"),
      passport= require("passport"),
      localStrategy = require("passport-local"),
      app = express();

const Recipe = require("./models/recipe"),
      Comment = require("./models/comment"),
      User = require("./models/user");

const seedDB = require('./seed');

const recipeRoutes = require("./routes/recipes"),
      commentRoutes = require("./routes/comments"),
      indexRoutes = require("./routes/index");

const dbUrl = "mongodb+srv://new-user:kVoKQFMvtT5gDJ1L@cluster0.jnwxk.mongodb.net/<dbname>?retryWrites=true&w=majority";
// "mongodb://localhost/howToVeggie",

// app config
mongoose.connect(dbUrl, {
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

// passport config
app.use(require("express-session")({
    secret: "DO YOU WANNA BUILD THE SNOWMAN?",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// seedDB();

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/recipes", recipeRoutes);
app.use("/recipes/:id/comments", commentRoutes);

app.listen(port, process.env.IP, () => console.log("Server Connected!"));
