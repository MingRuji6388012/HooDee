const express = require("express");
const path = require("path");
// const connection_import = require("./database.js");
// const connection = connection_import.connection;
require('dotenv').config();

const result_route = express.Router();

result_route.use(express.json());
result_route.use(express.urlencoded({ extended: true }));

result_route.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "templetes", "html", "result.html"));
});

// result_route.get("/")

module.exports.result_route = result_route;

