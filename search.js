const express = require("express");
const path = require("path");
// const connection_import = require("./database.js");
// const connection = connection_import.connection;
require('dotenv').config();


const search_route = express.Router();

search_route.use(express.json());
search_route.use(express.urlencoded({ extended: true }));

search_route.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "templetes", "html", "search.html"));
});


// search_api_route.get("/result", function (req, res) {
//     /**
//      * 
//      */
//     // let query_text = req.query.query_text;  
//     // let quantifier = req.query.quantifier;
//     // let user_list = null, music_list = null, playlist_list = null;
//     // if(quantifier === "user" || quantifier === "all"){
//     //     user_list = fetch(`/api/user/search_by_username?UserName=${query_text}`, {
//     //         method: "GET",
//     //     }).then(res => res.json());
//     // }
//     // if(quantifier === "music" || quantifier === "all"){
//     //     music_list = fetch(`/api/music/search_by_musicname/${query_text}`, {
//     //         method: "GET",
//     //     }).then(res => res.json());
//     // }
//     // if(quantifier === "artist" || quantifier === "all"){
//     //     playlist_list = fetch(`/api/playlist/search_by_playlistname/${query_text}`, {
//     //         method: "GET",
//     //     }).then(res => res.json());
//     // }
//     // let data = {
//     //     user: await user_list,
//     //     music: await music_list,
//     //     playlist: await playlist_list
//     // };
//     res.sendFile(path.join(__dirname, "templetes", "html", "result.html")); 
// });


module.exports.search_route = search_route;

