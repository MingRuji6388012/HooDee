const express = require("express");
const path = require("path");
// const login = require("./login.js");
const search = require("./search.js");
// const home = require("./home.js");
const result = require("./result.js");

const user_api = require("./user.js");
const music_api = require("./music.js");
const playlist_api = require("./playlist.js");
require('dotenv').config();

const app = express();

app.use("/", express.static(path.join(__dirname, "templetes", "html")));
app.use("/", express.static(path.join(__dirname, "templetes", "css")));
app.use("/", express.static(path.join(__dirname, "templetes", "js")));
app.use("/public", express.static(path.join(__dirname, "templetes", "public")));

// app.use("/", home.home_route);
app.use("/images", express.static(path.join(__dirname, "templetes", "images")));

app.get("/user", function(req, res) {
    res.sendFile(path.join(__dirname, "templetes", "html", "artist.html"));
});
// app.use("/login", login.login_route);
app.use("/search", search.search_route);
app.use("/result", result.result_route);

app.use("/api/user", user_api.user_api_route);
app.use("/api/music", music_api.music_api_route);
app.use("/api/playlist", playlist_api.playlist_api_route);


app.listen(process.env.PORT, function () {
    console.log("hosted on " + process.env.PORT);
});
