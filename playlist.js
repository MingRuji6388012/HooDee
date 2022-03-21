require('dotenv').config();
const express = require("express");
const database = require("./database.js");
const connection = database.connection;

const playlist_api_route = express.Router();

playlist_api_route.use(express.json());
playlist_api_route.use(express.urlencoded({ extended: true }));

playlist_api_route.post("/create", function(req, res){
    /**
     * expected to get 
     * {
     *      "PlaylistCreator" : value (FK to User),
     *      "PlaylistName" : value, 
     *      "PlaylistImg" : value or none
     * }
     * in request body
     * 
     * {
     *      "error" : bool,
     *      "message" : str
     * }
     */
    let playlist = req.body.Playlist; // json
    let record = {
        "PlaylistCreator" : playlist.PlaylistCreator,
        "PlaylistName" : playlist.PlaylistName,
        "PlaylistIMG" : playlist.PlaylistImg,
        "TimeCreated" : new Date().toISOString().slice(0, 19).replace('T', ' '),
        "IsDeleted" : false
    };
    connection.query("INSERT INTO Playlist SET ?;", record, function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString()});
        else res.send({error: false, message: "New playlist created"});   // maybe it should return playlist id 
    });
});

playlist_api_route.get("/search_by_playlistname", function(req, res){
    /**
     * 
     * {
     *      "PlaylistName" : value
     * }
     */
    let playlist_name = req.query.PlaylistName; // str
    if(!playlist_name) {res.status(400).send({error: true, message: "playlist name can't be null"}); return;}
    let playlist_name_query = "%" + playlist_name + "%";
    connection.query("SELECT * FROM Playlist WHERE PlaylistName LIKE ?;", playlist_name_query, function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString()});
        else res.send({error: false, playlists:results, message: "playlist(s) found"});
    });
});

playlist_api_route.post("/user_follow", function(req, res){
    let user_id = req.body.UserID; // int
    let playlist_id = req.body.PlaylistID; // int
    let record = {
        UserID: user_id,
        PlaylistID: playlist_id,
        FollowTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
        IsUnFollow: false
    };
    // maybe make it primary key to prevent collsion
    connection.query("INSERT INTO UserFollowPlaylist SET ?;", record, function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString()});
        else res.send({error: false, message: "Follow playlist complete"});
    });
});

playlist_api_route.delete("/user_follow", function(req, res){
    let user_id = req.body.UserID; // int
    let playlist_id = req.body.PlaylistID; // int
    connection.query("UPDATE UserFollowPlaylist SET IsUnFollow = true WHERE UserID = ? and PlaylistID = ?;", [user_id, playlist_id], function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString()});
        else res.send({error: false, message: "unfollow playlist success"});
    });
});

playlist_api_route.get("/user_follow", function(req, res){
    let user_id = req.query.UserID; // int
    connection.query("SELECT * FROM UserFollowPlaylist ufp INNER JOIN Playlist p on ufp.PlaylistID = p.PlaylistID WHERE ufp.UserID = ? AND ufp.IsUnFollow = 0;", user_id, function(error, results, fields){
        if(error) res.status(500).send({error: true, playlists: null, message: error.toString()});
        else res.send({error: false, playlists: results, message: "return playlist success"});
    });
});

playlist_api_route.put("/add_music", function(req, res){
    let music_id = req.body.MusicID; // int
    let playlist_id = req.body.PlaylistID; // int
    let record = {MusicID: music_id, PlaylistID: playlist_id};
    connection.query("INSERT INTO MusicInPlaylist SET ?;", record, function(error, results, fields){
        if(error) res.status(500).send({error: true, playlists: null, message: error.toString()});
        else res.send({error: false, message: "add music from playlist complete"});
    });
});

playlist_api_route.delete("/add_music", function(req, res){
    let music_id = req.body.MusicID; // int
    let playlist_id = req.body.PlaylistID; // int
    connection.query("DELETE FROM MusicInPlaylist WHERE MusicID = ? AND PlaylistID = ?;", [music_id, playlist_id], function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString()});
        else res.send({error: false, message: "remove music from playlist complete"});
    });
});

module.exports.playlist_api_route = playlist_api_route;