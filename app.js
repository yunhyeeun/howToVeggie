const express = require('express'),
      app = express(),
      port = 3000;

app.set("view engine", "ejs");

// get home page
app.get("/", (req, res) => res.render("index"));

// get recipe page
app.get("/recipes", (req, res) => {
    //example data
    var recipes = [
        { name: "머시룸 타코", image: "https://www.wellplated.com/wp-content/uploads/2018/12/Vegetarian-Tofu-Mushroom-Tacos-600x852.jpg" },
        { name: "토마토 양파 수프", image: "https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2009/12/Weight-Watchers-tomato-and-red-onion-soup.jpg"},
        { name: "토마토 두부 볶음", image: "https://www.readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_7921_8547.jpg" }
    ]

    res.render("recipes", { recipes: recipes });
});

app.listen(port, () => console.log("Server Connected!"));
