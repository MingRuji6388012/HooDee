DROP DATABASE IF EXISTS `Project_Phrase2`;
CREATE DATABASE IF NOT EXISTS `Project_Phrase2`;
USE `Project_Phrase2`;

CREATE TABLE User (
    UserID			int		    PRIMARY KEY AUTO_INCREMENT,
    UserName		varchar(20),
    FirstName		varchar(100),
    LastName		varchar(100),
    DOB				date,
    UserProfileIMG	varchar(256),
    TimeCreated		datetime,
    Role			int,
    Email			varchar(100) UNIQUE,
    Password		varchar(64),
    Salt			varchar(40),
    IsDeleted       boolean,
    Secret          varchar(255)
);

CREATE TABLE Music (
    MusicID			int		PRIMARY KEY AUTO_INCREMENT,
    UserID			int,
    MusicName		varchar(250),
    MusicIMG		varchar(256),
    MusicFile		varchar(256),
    TimeCreated		datetime,
    IsDeleted       boolean,

    CONSTRAINT fk_UserID FOREIGN KEY (UserID) 
    REFERENCES User(UserID)
);

CREATE TABLE Playlist (
    PlaylistID		int		PRIMARY KEY AUTO_INCREMENT,
    PlaylistCreator	int,
    PlaylistName	varchar(250),
    PlaylistIMG		varchar(256),
    TimeCreated     datetime,
    IsDeleted       boolean,

    CONSTRAINT fk_PlaylistCreator FOREIGN KEY (PlaylistCreator)
    REFERENCES User(UserID)
);

CREATE TABLE LoginLog (
    UserID			int,
    LoginTime		datetime,

    CONSTRAINT fk_UserID2 FOREIGN KEY (UserID)
    REFERENCES User(UserID)
);

CREATE TABLE UserFollowUser (
    FolloweeID			int     UNIQUE,
    FollowerID			int     UNIQUE,
    FollowTime			datetime,

    CONSTRAINT fk_FolloweeID FOREIGN KEY (FolloweeID)
    REFERENCES User(UserID),
    CONSTRAINT fk_FollowerID FOREIGN KEY (FollowerID)
    REFERENCES User(UserID)
);

CREATE TABLE UserFollowPlaylist (
    UserID			int,
    PlaylistID		int,
    FollowTime		datetime,
    
    CONSTRAINT fk_UserID4 FOREIGN KEY (UserID)
    REFERENCES User(UserID),
    CONSTRAINT fk_PlaylistID FOREIGN KEY (PlaylistID)
    REFERENCES Playlist(PlaylistID)
);

CREATE TABLE MusicInPlaylist(
    MusicID     int,
    PlaylistID  int,

    CONSTRAINT fk_musicinplaylist_musicid FOREIGN KEY (MusicID)
    REFERENCES Music(MusicID),
    CONSTRAINT fk_musicinplaylist_playlistid FOREIGN KEY (PlaylistID)
    REFERENCES Playlist(PlaylistID)
);