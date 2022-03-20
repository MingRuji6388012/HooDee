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
// DROP TABLE LoginLog;
// `);
// connection.query(`
// DROP TABLE UserFollowUser;
// `);
// connection.query(`
// DROP TABLE UserCreateMusic;
// `);
// connection.query(`
// DROP TABLE UserCreatePlaylist;
// `);
// connection.query(`
// DROP TABLE UserFollowPlaylist;
// `);
// connection.query(`
// DROP TABLE Playlist;
// `);
// connection.query(`
// DROP TABLE Music;
// `);
// connection.query(`
// DROP TABLE User;
// `);

// connection.query(
// `CREATE TABLE User (
//     UserID			int		PRIMARY KEY AUTO_INCREMENT,
//     UserName		varchar(20),
//     FirstName		varchar(100),
//     LastName		varchar(100),
//     DOB				date,
//     UserProfileIMG	varchar(256),
//     TimeCreated		datetime,
//     Role			int,
//     Email			varchar(100),
//     Password		varchar(64),
//     Salt			varchar(40)
// );
// `);

// connection.query( 
// `CREATE TABLE Music (
//         MusicID			int		PRIMARY KEY AUTO_INCREMENT,
//         UserID			int,
//         MusicName		varchar(250),
//         MusicIMG		varchar(256),
//         MusicFile		varchar(256),
//         TimeCreated		datetime,
//         CONSTRAINT fk_UserID FOREIGN KEY (UserID) REFERENCES User(UserID)
//     );
// `);

// connection.query(
// `CREATE TABLE Playlist (
//     PlaylistID		int		PRIMARY KEY AUTO_INCREMENT,
//     PlaylistCreator	int,
//     PlaylistName	varchar(250),
//     PlaylistIMG		varchar(256),
//     CONSTRAINT fk_PlaylistCreator FOREIGN KEY (PlaylistCreator)
//     REFERENCES User(UserID)
// );`);

// connection.query(
// `CREATE TABLE LoginLog (
//     UserID			int,
//     LoginTime		datetime,
//     CONSTRAINT fk_UserID2 FOREIGN KEY (UserID)
//     REFERENCES User(UserID)
// );`);

// connection.query(
// `CREATE TABLE UserFollowUser (
//     FolloweeID			int,
//     FollowerID			int,
//     FollowTime			datetime,
//     CONSTRAINT fk_FolloweeID FOREIGN KEY (FolloweeID)
//     REFERENCES User(UserID),
//     CONSTRAINT fk_FollowerID FOREIGN KEY (FollowerID)
//     REFERENCES User(UserID)
// );`
// );

// connection.query(
// `CREATE TABLE UserCreateMusic (
//     UserID			int,
//     MusicID			int,
//     CreateTime		datetime,
//     IsDeleted		boolean,
//     CONSTRAINT fk_UserID3 FOREIGN KEY (UserID)
//     REFERENCES User(UserID),
//     CONSTRAINT fk_MusicID FOREIGN KEY (MusicID)
//     REFERENCES Music(MusicID)
// );`);

// connection.query( 
// `CREATE TABLE UserFollowPlaylist (
//     UserID			int,
//     PlaylistID			int,
//     FollowTime		datetime,
//     CONSTRAINT fk_UserID4 FOREIGN KEY (UserID)
//     REFERENCES User(UserID),
//     CONSTRAINT fk_PlaylistID FOREIGN KEY (PlaylistID)
//     REFERENCES Playlist(PlaylistID)
// );`);

// connection.query( 
// `CREATE TABLE UserCreatePlaylist (
//     UserID			int,
//     PlaylistID		int,
//     CreateTime		datetime,
//     IsDeleted		boolean,
//     CONSTRAINT fk_UserID5 FOREIGN KEY (UserID)
//     REFERENCES User(UserID),
//     CONSTRAINT fk_PlaylistID2 FOREIGN KEY (PlaylistID)
//     REFERENCES Playlist(PlaylistID)
// );`);

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

connection.end();