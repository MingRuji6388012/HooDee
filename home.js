const express = require("express");
const path = require("path");
require('dotenv').config();

const home_route = express.Router();

home_route.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "templetes", "html", "home.html"));
});

module.exports.home_route = home_route;