const express = require("express");
const login = require("./login.js");
const search = require("./search.js");
const home = require("./home.js");
const path = require("path");
require('dotenv').config();

const app = express();

app.use("/", express.static(path.join(__dirname, "templetes", "html")));
app.use("/", express.static(path.join(__dirname, "templetes", "css")));
app.use("/public", express.static(path.join(__dirname, "templetes", "public")));
app.use("/images", express.static(path.join(__dirname, "templetes", "images")));
app.use("/login", login.login_route);
app.use("/search", search.search_route);
app.use("/result", )
app.use("/", home.home_route);

app.listen(process.env.PORT, function () {
    console.log("hosted on " + process.env.PORT);
});
