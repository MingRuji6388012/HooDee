require('dotenv').config();
const express = require("express");
const database = require("./database.js");
const connection = database.connection;

const music_api_route = express.Router();

music_api_route.use(express.json());
music_api_route.use(express.urlencoded({ extended: true }));


music_api_route.post("/add", function(req, res){
    /**
     * expected to get 
     * {
     *      "Music" : {
     *          "UserID" : value,
     *          "MusicName" : value,
     *          "MusicFile" : value,
     *          "MusicIMG" : value or null          
     *      }
     * }
     * in request body
     * 
     * expected to return
     * {
     *      "error" : bool,
     *      "message" : str
     * }
     */
    let music = req.body.Music;
    connection.query("INSERT INTO Music SET ?;", music, function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString()}); 
        else res.send({error: false, message: "add song success"});
    });    
});

music_api_route.get("/search", function(req, res){
    /**
     * expected to get
     * {
     *      "MusicName" : value
     * }
     * in request query
     * 
     * expected to return
     * {
     *      "error" : bool,
     *      "musics" : list of Music or null, 
     *      "message" : str
     * }
     */
    let music_name = req.query.MusicName;
    let music_name_query = "%" + music_name + "%";
    connection.query("SELECT * FROM Music WHERE MusicName LIKE ?;", music_name_query, function(error, results, fields){
        if(error) res.status(500).send({error: true, musics: null, message: error.toString()});
        else res.send({error: false, musics: results, message: "search successful"});
    });
});

music_api_route.delete("/remove", function(req, res){
    /**
     * expected to get 
     * {
     *      "MusicID" : value
     * }
     * in request query
     * 
     * expected to return
     * {
     *      "error" : bool,
     *      "message" : str
     * }
     */
    let music_id = req.body.MusicID;
    connection.query("UPDATE Music SET IsDeleted = True WHERE MusicID = ?;", music_id, function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString()});
        else res.send({error: false, message: "delete complete"});
    });
});

module.exports.music_api_route = music_api_route;