const express = require("express");
const path = require("path");

const main_route = require("./main_page.js");
const user_api = require("./user.js");
const music_api = require("./music.js");
const playlist_api = require("./playlist.js");
require('dotenv').config();

const app = express();

app.use("/", main_route.main_route);

app.use("/api/user", user_api.user_api_route);
app.use("/api/music", music_api.music_api_route);
app.use("/api/playlist", playlist_api.playlist_api_route);

app.listen(process.env.PORT, function () {
    console.log("hosted on " + process.env.PORT);
});
