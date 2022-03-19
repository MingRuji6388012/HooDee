require('dotenv').config();
const express = require("express");
// const path = require("path");
const crypto = require("crypto");
const database = require("./database.js");
const connection = database.connection;

const music_api_route = express.Router();

music_api_route.use(express.json());
music_api_route.use(express.urlencoded({ extended: true }));


music_api_route.get("/search_music", function(res, req){
    
});