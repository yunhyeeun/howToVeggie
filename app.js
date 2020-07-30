const express = require('express'),
      app = express(),
      port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("index"));

app.listen(port, () => console.log("Server Connected!"));
