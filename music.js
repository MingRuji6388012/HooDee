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
    let transaction = {
        UserID: music.UserID, 
        MusicIMG: music.MusicIMG, 
        MusicFile: music.MusicFile, 
        MusicName: music.MusicName,
        TimeCreated: new Date().toISOString().slice(0, 19).replace('T', ' '),
        IsDeleted: false,
    }
    connection.query("INSERT INTO Music SET ?;", transaction, function(error, results, fields){
        if(error) {res.status(500).send({error: true, message: error.toString()}); return;} 
        else res.send({error: false, message: "add song success"});
    });    
});

music_api_route.get("/search_by_musicname/:MusicName", function(req, res){
    /**
     * expected to get
     * "MusicName" : str
     * in request query
     * 
     * expected to return
     * {
     *      "error" : bool,
     *      "musics" : list of Music or null, 
     *      "message" : str
     * }
     */
    let music_name = req.params.MusicName;
    let music_name_query = "%" + music_name + "%";
    connection.query("SELECT MusicID, MusicName, MusicIMG, MusicFile, m.TimeCreated, u.UserID, u.UserName FROM Music m INNER JOIN User u ON m.UserID = u.UserID WHERE MusicName LIKE ? AND m.IsDeleted = False;", music_name_query, function(error, results, fields){
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
    connection.query("UPDATE Music SET IsDeleted = true WHERE MusicID = ?;", music_id, function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString()});
        else res.send({error: false, message: "delete complete"});
    });
});

music_api_route.put("/edit", function(req, res){
    /**
     * expected to get 
     * {
     *      "Music" : {
     *          "MusicID" : value,
     *          "UserID" : value,
     *          "MusicName" : value,
     *          "MusicIMG" : value
     *      }
     * }
     * 
     * expected to return 
     * {
     *      "error" : bool,
     *      "message" : str
     * }
     */
    let music = req.body.Music;
    let music_id = music.MusicID;
    if(music.MusicFile) delete music.MusicFile; // stricly cant change
    if(music.TimeCreated) delete music.TimeCreated; // stricly cant change
    connection.query("UPDATE Music SET ? WHERE MusicID = ?;", [music, music_id], function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString()});
        else res.send({error: false, message: "edit success"});
    });
});

music_api_route.get("/search_by_authorname/:name", function(req, res){
    let author_name = req.params.name;
    let author_name_query = "%" + author_name + "%";
    connection.query("SELECT MusicID, m.UserID, m.MusicName, m.MusicIMG, m.MusicFile, u.UserID, u.UserName FROM Music m INNER JOIN User u ON m.UserID = u.UserID WHERE UserName LIKE ? AND u.IsDeleted = False AND m.IsDeleted = False;", author_name_query, function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString(), music: null});
        else res.send({error: false, message: "Musics found", musics: results});
    });
});

music_api_route.get("/search_by_authorid/:id", function(req, res){
    let user_id = req.params.id;
    connection.query("SELECT MusicID, UserID, MusicName, MusicIMG, MusicFile, TimeCreated FROM Music WHERE IsDeleted = False AND UserID = ?;", user_id, function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString(), musics: null});
        else res.send({error: false, message: "querying music success", musics: results});
    });
});


module.exports.music_api_route = music_api_route;