const express = require("express");
// const path = require("path");
const connection_import = require("./database.js");
const connection = connection_import.connection;
require('dotenv').config();


const search_api_route = express.Router();

search_api_route.use(express.json());
search_api_route.use(express.urlencoded({ extended: true }));

// search_api_route.get("/", function (res, req) {
//     req.sendFile(path.join(__dirname, "templetes", "html", "search.html"));
// });


search_api_route.get("/query", function (req, res) {
    /**
     * 
     */
    console.log("unimplemented");
    console.log(req.query);
    let query = req.query;
    let quantifier = query.quantifier;
    let text_query = query.text_query;
    let user_result = null, music_result = null, playlist_result = null;
    
    // maybe add some await here
    // if (quantifier == "user" || quantifier == "all")
    //     user_result = connection.query("SELECT * FROM User WHERE UserName LIKE '%?%';", text_query);
    // if (quantifier == "music" || quantifier == "all")
    //     music_result = connection.query("SELECT * FROM Music WHERE MusicName LIKE '%?%'", text_query);
    // if (quantifier == "playlist" || quantifier == "all")
    //     playlist_result = connection.query("SELECT * FROM Playlist WHERE PlaylistName LIKE '%?%'", text_query);
    res.send({error: false, user: user_result, music: music_result, playlist: playlist_result});
});


module.exports.search_api_route = search_api_route;

