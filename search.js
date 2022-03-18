const express = require("express");
const path = require("path");
const connection_import = require("./database.js");
const connection = connection_import.connection;
require('dotenv').config();


const search_route = express.Router();

search_route.use(express.json());
search_route.use(express.urlencoded({ extended: true }));

search_route.get("/", function (res, req) {
    req.sendFile(path.join(__dirname, "templetes", "html", "search.html"));
});

search_route.post("/query", function (res, req) {
    let query = res.body.query;
    let quantifier = query.quantifier;
    let user_result = null, music_result = null, playlist_result = null;
    connection.connect();
    // maybe add some await here
    if (quantifier == "user" || quantifier == "all")
        user_result = connection.query("SELECT * FROM User WHERE UserName LIKE '*?*';", query); 
    if (quantifier == "music" || quantifier == "all")
        music_result = connection.query("SELECT * FROM Music WHERE MusicName LIKE '*?*'", query);
    if (quantifier == "playlist" || quantifier == "all")
        playlist_result = connection.query("SELECT * FROM Playlist WHERE PlaylistName LIKE '*?*'", query);
    req.send({error: false, user: user_result, music: music_result, playlist: playlist_result});
    connection.exit();

});


module.exports.search_route = search_route;

