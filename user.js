require('dotenv').config();
const express = require("express");
// const path = require("path");
const crypto = require("crypto");
const database = require("./database.js");
const connection = database.connection;

const user_api_route = express.Router();

user_api_route.use(express.json());
user_api_route.use(express.urlencoded({ extended: true }));


user_api_route.post("/registeration", function(req, res) {
    /*
    expected to get
    {
        "User" : {
            "Email" : value,         necessary
            "Password" : value       necessary
        }
    }
    in the body

    expected to send
    to database
    null or one column of User table

    expected to response
    {
        "error" : bool,
        "message" : "register complete"
    }
    */
    console.log("registering");
    let user = req.body.User;
    let password = user.Password;
    let salt = crypto.randomBytes(20).toString("hex");
    let hashed_password = crypto.createHash('sha256').update(password + salt).digest('hex');
    user.salt = salt;
    user.Password = hashed_password;
    user.Role = 0; // role = 0 -> User, role = 1 -> Artist, role = 2 -> Administrator
    user.TimeCreated = new Date().toISOString().slice(0, 19).replace('T', ' ');
    connection.query("INSERT INTO User SET ?;", user, function(error, result, fields) {
        if (error) res.status(500).send({ error: true, message: error.toString()});
        // res.status(400).send({ authenticate: false, message: "SQL SUCKS" });
        res.send({ error: false, message: "registeration complete" });
    });
});

user_api_route.post("/authentication", function (req, res) {
    /*
    expected to get
    {
        "user" : {
            "Email" : value,       necessary
            "Password" : value     necessary
        } 
    }
    in the body

    expected to response 200
    {
        error: bool,
        authenticate: bool,  // if authenicate is False, user is null
        user: null or {
            "Email" : value,
            "UserName" : value,
            "FirstName" : value,
            "LastName" : value,
            "UserProfileIMG" : value,
            "Role" : value,
            "DOB" : value
        },
        "message" : "login complete/fail"
    }

    500
    {
        error: true,
        message : exception.toString
    }
    */
    // get info from form, {login, password}
    console.log("authenticating");
    let user = req.body.User
    let email = user.Email;
    let password = user.Password;
    // maybe hash them
    // check email and hashed_password with db
    connection.query('SELECT * FROM User WHERE email = ?;', email, function(error, results, fields) {
        if(error) res.status(500).send({error: true, message: error.toString()});

        let found_user = results[0];
        let salt = found_user.Salt;
        let hashed_password = crypto.createHash('sha256').update(password+salt).digest('hex');
        if(hashed_password == found_user.Password){
            const login_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const values = {
                UserID : found_user.UserID,
                LoginTime : login_time
            }
            connection.query("INSERT INTO LoginLog SET ?;", values, function (error, results, fields) {
                if(error) throw error;
                console.log("login logged: " + login_time);
            });
            
            delete found_user.UserID;
            delete found_user.Password;
            delete found_user.Salt;
            delete found_user.TimeCreated;
            res.send({error: false, authenticate: true, user: found_user, message: "Autenticate complete"});
        }
        else{
            res.send({error: false, authenticate: false, user: null, message: "Autenticate fail"});
        }
    });
});

user_api_route.put("/edit", function(req, res){
    /**
     * expected to get, this api can edit only these attribute
     * {
     *      "User" : {
     *          "UserID" : value,
     *          "UserName" : value or null,
     *          "FirstName" : value or null,
     *          "LastName" : value or null,
     *          "DOB" : value or null
     *      }
     * }
     * in req body
     * 
     * expected to response
     * {
     *      "error" : bool,
     *      "message" : "edit user profile complete/fail"
     * }
     * 
     */
    console.log("editing");
    let user = req.body.User
    let user_id = user.UserID;
    if(user.UserName == null){ delete user.UserName; }
    if(user.FirstName == null){ delete user.FirstName; }
    if(user.LastName == null){ delete user.LastName; }
    if(user.DOB == null){ delete user.DOB; }
    connection.query("UPDATE User SET ? WHERE UserID = ?;", [user, user_id], function (error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString()});
        else res.send({error: false, message: "edit user profile complete"});
    });
});

user_api_route.delete("/remove", function(req, res){
    /**
     * expected to get
     * {
     *      "UserID" : value
     * }
     * in req body
     * 
     * expected to response
     * {
     *      "error" : bool,
     *      "message" : "rm user succ"
     * }
     * 
     */
    console.log("delete acc");
    let user_id  = req.body.UserID;
    // tobe fix
    connection.query("DELETE FROM User WHERE UserID = ?;", user_id, function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString()});
        else res.send({error: false, message: "that person gone in to dust"});
    });

});


user_api_route.get("/search_by_username", function(req, res){
    /**
     * Search users in db by username
     * expected to get
     * {
     *      "UserName" : value,
     * }
     * in req query
     * 
     * expected to response
     * {
     *      "error" : bool,
     *      "users" : list of user(username, firstname, lastname, dob, userprofileimg, role) or null,
     *      "message" : exception message 
     * }
     */
    let username = req.query.UserName;
    if (username == null) {res.status(400).send({error: true, users: null, message: "UserName can't be null"}); return;}
    let username_query = "%" + username + "%";
    connection.query("SELECT UserName, FirstName, LastName, DOB, UserProfileIMG, Role FROM User WHERE UserName LIKE ?;", username_query, function(error, results, fields){
        if(error) res.status(500).send({error: true, users: null, messsage: error.toString()});
        else res.send({error: false, users: results, message: "returning found users"});
    });
});

module.exports.user_api_route = user_api_route;