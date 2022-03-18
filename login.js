const express = require("express");
const path = require("path");
const crypto = require("crypto");
const database = require("./database.js");
const connection = database.connection;
require('dotenv').config();

const login_route = express.Router();

login_route.use(express.json());
login_route.use(express.urlencoded({ extended: true }));

login_route.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "templetes", "html", "login.html"));
});

// login authentication
login_route.post("/authentication", function (req, res) {
    /*
    expected to get
    {
        "user" : {
            "Email" : value, 
            "Password" : value
        }
    }
    in the body

    expected to response
    {
        authenticate: bool,  // if authenicate is False, user is null
        user: {
            "Email" : value,
            "UserName" : value,
            "ProfilePic" : value,
            "IsAdmin" : value
        },
        "message" : "login complete/fail"
    }
    */
    // get info from form, {login, password}
    let email = req.body.Email;
    let password = req.body.Password;
    // maybe hash them
    // check email and hashed_password with db
    connection.connect();
    connection.query('SELECT * FROM User WHERE email = ?;', email, function(error, results, fields) {
        // if(!error) res.status(400).send("SQL Suck");
        let salt = results.salt;
        let hashed_password = crypto.createHash('sha256').update(password+salt).digest('hex');
        if(hashed_password == result.hashed_password){
            const values = {
                UserID : results.UserID,
                LoginTime : Date.now()
            }
            connection.query("INSERT INTO LoginLog VALUES ?;", values);
            return res.send({authenticate: true});
        }
        return res.send({authenticate: false});
    });
    connection.end();
    
});

module.exports.login_route = login_route;