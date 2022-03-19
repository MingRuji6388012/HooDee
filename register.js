require('dotenv').config();
const express = require("express");
const path = require("path");
const crypto = require("crypto");
const database = require("./database.js");
const connection = database.connection;


const register_route = express.Router();

register_route.use(express.json());
register_route.use(express.urlencoded({ extended: true }));


register_route.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "templetes", "register.html"));
});


register_route.post("/registering", function(req, res) {
    /*
    expected to get
    {
        "user" : {
            "Email" : value,
            "Password" : value
        }
    }
    in the body

    expected to send
    to database
    Email=?, Password=?, Salt=?, TimeCreated=?, IsAdmin=?

    expected to response
    {
        "authenticate" : bool,
        "message" : "register complete"
    }
    */
    let user = req.body.User;
    let password = user.Password;
    let salt = crypto.randomBytes(20).toString("hex");
    let hashed_password = crypto.createHash('sha256').update(password + salt).digest('hex');
    user.salt = salt;
    user.password = hashed_password;
    user.Role = 0; // role = 0 -> User, role = 1 -> Artist, role = 2 -> Administrator
    user.TimeCreated = Date.now()
    connection.connect();
    connection.query("INSERT INTO User VALUES ?;", user, function(error, result, fields) {
        if (!error) return res.status(400).send({ authenticate: false, message: "SQL SUCKS" });
        return res.send({ authenticate: true, message: "registeration complete" });
    });
    connection.end();
});

module.exports.register_route = register_route;
