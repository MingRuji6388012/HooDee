require('dotenv').config();
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});



connection.connect();

// connection.query(`
// DROP TABLE IF EXISTS MusicInPlaylist;
// `);
// connection.query(`
// DROP TABLE IF EXISTS LoginLog;
// `);
// connection.query(`
// DROP TABLE IF EXISTS UserFollowUser;
// `);
// connection.query(`
// DROP TABLE IF EXISTS UserCreateMusic;
// `);
// connection.query(`
// DROP TABLE IF EXISTS UserCreatePlaylist;
// `);
// connection.query(`
// DROP TABLE IF EXISTS UserFollowPlaylist;
// `);
// connection.query(`
// DROP TABLE IF EXISTS Playlist;
// `);
// connection.query(`
// DROP TABLE IF EXISTS Music;
// `);
// connection.query(`
// DROP TABLE IF EXISTS User;
// `);

// connection.query(`
// CREATE TABLE User (
//     UserID			int		    PRIMARY KEY AUTO_INCREMENT,
//     UserName		varchar(20),
//     FirstName		varchar(100),
//     LastName		varchar(100),
//     DOB				date,
//     UserProfileIMG	varchar(256),
//     TimeCreated		datetime,
//     Role			int,
//     Email			varchar(100),
//     Password		varchar(64),
//     Salt			varchar(40),
//     IsDeleted       boolean
// );
// `);

// connection.query(`
// CREATE TABLE Music (
//     MusicID			int		PRIMARY KEY AUTO_INCREMENT,
//     UserID			int,
//     MusicName		varchar(250),
//     MusicIMG		varchar(256),
//     MusicFile		varchar(256),
//     TimeCreated		datetime,
//     IsDeleted       boolean,

//     CONSTRAINT fk_UserID FOREIGN KEY (UserID) 
//     REFERENCES User(UserID)
// );
// `);

// connection.query(`
// CREATE TABLE Playlist (
//     PlaylistID		int		PRIMARY KEY AUTO_INCREMENT,
//     PlaylistCreator	int,
//     PlaylistName	varchar(250),
//     PlaylistIMG		varchar(256),
//     TimeCreated     datetime,
//     IsDeleted       boolean,

//     CONSTRAINT fk_PlaylistCreator FOREIGN KEY (PlaylistCreator)
//     REFERENCES User(UserID)
// );
// `);

// connection.query(`
// CREATE TABLE LoginLog (
//     UserID			int,
//     LoginTime		datetime,

//     CONSTRAINT fk_UserID2 FOREIGN KEY (UserID)
//     REFERENCES User(UserID)
// );
// `);


// connection.query(`
// CREATE TABLE UserFollowUser (
//     FolloweeID			int,
//     FollowerID			int,
//     FollowTime			datetime,
//     IsUnFollow          boolean,

//     CONSTRAINT fk_FolloweeID FOREIGN KEY (FolloweeID)
//     REFERENCES User(UserID),
//     CONSTRAINT fk_FollowerID FOREIGN KEY (FollowerID)
//     REFERENCES User(UserID)
// );
// `);

// connection.query(  // add isunfollow? 
// `
// CREATE TABLE UserFollowPlaylist (
//     UserID			int,
//     PlaylistID		int,
//     FollowTime		datetime,
//     IsUnfollow      boolean,
    
//     CONSTRAINT fk_UserID4 FOREIGN KEY (UserID)
//     REFERENCES User(UserID),
//     CONSTRAINT fk_PlaylistID FOREIGN KEY (PlaylistID)
//     REFERENCES Playlist(PlaylistID)
// );
// `);

// connection.query(/* Represent music itself in the playlist. M <-> M relation */`
// CREATE TABLE MusicInPlaylist(
//     MusicID     int,
//     PlaylistID  int,

//     CONSTRAINT fk_musicinplaylist_musicid FOREIGN KEY (MusicID)
//     REFERENCES Music(MusicID),
//     CONSTRAINT fk_musicinplaylist_playlistid FOREIGN KEY (PlaylistID)
//     REFERENCES Playlist(PlaylistID)
// );
// `);

// // new table about

connection.query("SELECT * FROM User;", function(error, results, fields) {
    if(error) throw error;
    console.log("user:");
    console.log(results);
});

connection.query("SELECT * FROM LoginLog;", function(error, results, fields) {
    if(error) throw error;
    console.log("LoginLog:");
    console.log(results);
});

connection.query("SELECT * FROM Music;", function(error, results, fields){
    if(error) throw error;
    console.log("Music: ");
    console.log(results);
});

connection.query("SELECT * FROM UserFollowUser;",  function(error, results, fields){
    if(error) throw error;
    console.log("UserFollowUser: ");
    console.log(results);
});

connection.query("SELECT * FROM Playlist;",  function(error, results, fields){
    if(error) throw error;
    console.log("Playlist: ");
    console.log(results);
});

connection.query("SELECT * FROM UserFollowPlaylist;",  function(error, results, fields){
    if(error) throw error;
    console.log("UserFollowPlaylist: ");
    console.log(results);
});

connection.query("SELECT * FROM Music m INNER JOIN MusicInPlaylist mip ON m.MusicID = mip.MusicID;",  function(error, results, fields){
    if(error) throw error;
    console.log("MusicInPlaylist with Music: ");
    console.log(results);
});


connection.end();