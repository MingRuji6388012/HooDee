const express = require("express");
const path = require("path");
// const connection_import = require("./database.js");
// const connection = connection_import.connection;
require('dotenv').config();


const search_api_route = express.Router();

search_api_route.use(express.json());
search_api_route.use(express.urlencoded({ extended: true }));

search_api_route.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "templetes", "html", "search.html"));
});


search_api_route.get("/result", function (req, res) {

    /**
     * 
     */
    
    // res.sendFile(path.join(__dirname, "templetes", "html", "result.html")); 

});


module.exports.search_api_route = search_api_route;

