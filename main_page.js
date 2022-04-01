
const express = require("express");
const path = require("path");
// const connection_import = require("./database.js");
// const connection = connection_import.connection;
require('dotenv').config();

const main_route = express.Router();

main_route.use(express.json());
main_route.use(express.urlencoded({ extended: true }));

main_route.use("/", express.static(path.join(__dirname, "templetes", "css")));
main_route.use("/", express.static(path.join(__dirname, "templetes", "js")));
main_route.use("/public", express.static(path.join(__dirname, "templetes", "public")));
main_route.use("/images", express.static(path.join(__dirname, "templetes", "images")));

main_route.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "templetes", "html", "home.html"));
});

main_route.get("/user", function(req, res) {
    res.sendFile(path.join(__dirname, "templetes", "html", "artist.html"));
});

main_route.get("/playlist", function(req, res){
    res.sendFile(path.join(__dirname, "templetes", "html", "playlist.html"));
});

main_route.get("/search", function (req, res) {
    res.sendFile(path.join(__dirname, "templetes", "html", "search.html"));
});

main_route.get("/result", function (req, res) {
    res.sendFile(path.join(__dirname, "templetes", "html", "result.html"));
});

main_route.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "templetes", "html", "login.html"));
});

main_route.get("/about_us", function (req, res) {
    res.sendFile(path.join(__dirname, "templetes", "html", "about_us.html"));
});

// main_route.get("/register", function(req, res) {
//     res.sendFile(path.join(__dirname, "templetes", "register.html"));
// });

module.exports.main_route = main_route;

