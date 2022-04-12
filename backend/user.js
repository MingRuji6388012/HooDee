//import all dependencies
const express = require("express");
const crypto = require("crypto");
const session = require('express-session')
const { authenticator } = require('otplib')
const QRCode = require('qrcode')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const bodyParser = require('body-parser')
const database = require("./database.js");
const connection = database.connection;

const user_api_route = express.Router();

user_api_route.use(express.json());
user_api_route.use(express.urlencoded({ extended: true }));

user_api_route.use(session({
    secret: 'supersecret', //Make supersecret session
  }))


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
    console.log(req.body.User);
    console.log("registering");
    let secret = authenticator.generateSecret()
    let password = req.body.User.Password;
    let salt = crypto.randomBytes(20).toString("hex");
    let hashed_password = crypto.createHash('sha256').update(password + salt).digest('hex');
    let email = req.body.User.Email;
    let user = {
        UserName : req.body.User.UserName,
        FirstName : req.body.User.FirstName,
        LastName : req.body.User.LastName,
        UserProfileIMG : req.body.User.UserProfileIMG,
        Email : email,
        DOB : req.body.User.DOB,
        Password : hashed_password,
        salt : salt,
        Role : 0, // role = 0 -> User, role = 1 -> Artist, role = 2 -> Administrator
        TimeCreated : new Date().toISOString().slice(0, 19).replace('T', ' '),
        IsDeleted : false,
        Secret : secret
    };
    connection.query("INSERT INTO User SET ?;", user, function(error, result, fields) {
        if (error) res.status(500).send({ error: true, message: error.toString()});
        // res.status(400).send({ authenticate: false, message: "SQL SUCKS" });
        else{
            QRCode.toDataURL(authenticator.keyuri(email, 'HooDee', secret), (err, url) => {
                if (err) {throw err}
                // req.session.qr = url;
                // req.session.email = email;
                // res.redirect('/sign-up-2fa'); //Redirect to 2FA Page
                res.send({error: false, email: email, qr: url});
            });
        }
    });
});

user_api_route.post('/sign-up-2fa', (req, res) => {
    if (!req.body.email) {
      return res.redirect('/');
    }
    let email = req.body.email, code = req.body.code;
  
    verification_2fa(email, code, req, res);
});

function verification_2fa(email, code, req, res){
    let token;
    connection.query("SELECT * FROM User WHERE email = ?;", email, function(error, results, fields){
        if(error)  res.status(500).send({error: true, message: error.toString(), token: null});
        else if (results.length === 0 || !authenticator.check(code, results[0].Secret)) {
            res.send({error: true, message: "authorize failed", token: null, authenticate: false, user: null});
        }
        else{
            //correct, add jwt to session
            const login_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
            let found_user = results[0];
            const values = {
                UserID : found_user.UserID,
                LoginTime : login_time
            };
            delete found_user.Password;
            delete found_user.Salt;
            delete found_user.Secret;
            token = jwt.sign(email, 'supersecret');
            connection.query("INSERT INTO LoginLog SET ?;", values, function (error, results, fields) {
                if(error) res.status(500).send({error: true, message: error.toString()});
                console.log("login logged: " + login_time);
                res.send({error: false, message: "authorized", token: token, authenticate: true, user: found_user});
            });
        }
    });
}


// const express = require("express");
// const crypto = require("crypto");
// const database = require("./database.js");
// const connection = database.connection;

// const user_api_route = express.Router();

// user_api_route.use(express.json());
// user_api_route.use(express.urlencoded({ extended: true }));


// user_api_route.post("/registeration", function(req, res) {
//     /*
//     expected to get
//     {
//         "User" : {
//             "Email" : value,         necessary
//             "Password" : value       necessary
//         }
//     }
//     in the body

//     expected to send
//     to database
//     null or one column of User table

//     expected to response
//     {
//         "error" : bool,
//         "message" : "register complete"
//     }
//     */
//     console.log(req.body.User);
//     console.log("registering");
//     let password = req.body.User.Password;
//     let salt = crypto.randomBytes(20).toString("hex");
//     let hashed_password = crypto.createHash('sha256').update(password + salt).digest('hex');
//     let user = {
//         UserName : req.body.User.UserName,
//         FirstName : req.body.User.FirstName,
//         LastName : req.body.User.LastName,
//         UserProfileIMG : req.body.User.UserProfileIMG,
//         Email : req.body.User.Email,
//         DOB : req.body.User.DOB,
//         Password : hashed_password,
//         salt : salt,
//         Role : 0, // role = 0 -> User, role = 1 -> Artist, role = 2 -> Administrator
//         TimeCreated : new Date().toISOString().slice(0, 19).replace('T', ' '),
//         IsDeleted : false
//     };
//     connection.query("INSERT INTO User SET ?;", user, function(error, result, fields) {
//         if (error) res.status(500).send({ error: true, message: error.toString()});
//         // res.status(400).send({ authenticate: false, message: "SQL SUCKS" });
//         else res.send({ error: false, message: "registeration complete" });
//     });
// });

user_api_route.post("/authentication", function (req, res) {
    /*
    expected to get
    {
        "User" : {
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
    let code = req.body.Code;
    // maybe hash them
    // check email and hashed_password with db
    connection.query('SELECT * FROM User WHERE email = ? AND IsDeleted = false;', email, function(error, results, fields) {
        if(error) res.status(500).send({error: true, message: error.toString()});
        else if(results.length === 0) res.send({error: false, authenticate: false, user: null, message: "Email not found"});
        else{
            let found_user = results[0];
            let salt = found_user.Salt;
            let hashed_password = crypto.createHash('sha256').update(password+salt).digest('hex');
            if(hashed_password == found_user.Password){
                // res.send({error: false, authenticate: true, user: found_user, message: "Autenticate complete"});
                verification_2fa(email, code, req, res)
            }
            else{
                res.send({error: false, authenticate: false, user: null, message: "Autenticate fail"});
            }

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
    if(user.Password !== undefined){ delete user.password; } // strictly cant change
    if(user.Email !== undefined){ delete user.Email; }   // strictly cant change
    if(user.UserName === null){ delete user.UserName; }
    if(user.FirstName === null){ delete user.FirstName; }
    if(user.LastName === null){ delete user.LastName; }
    if(user.DOB === null){ delete user.DOB; }
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
     *      "message" : str
     * }
     * 
     */
    console.log("delete acc");
    let user_id  = req.body.UserID;
    // tobe fix
    connection.query("UPDATE User SET IsDeleted = true WHERE UserID = ?;", user_id, function(error, results, fields){
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
    connection.query("SELECT UserID, UserName, FirstName, LastName, DOB, UserProfileIMG, Role FROM User WHERE UserName LIKE ? AND IsDeleted = False;", username_query, function(error, results, fields){
        if(error) res.status(500).send({error: true, users: null, messsage: error.toString()});
        else res.send({error: false, users: results, message: "returning found users"});
    });
});

user_api_route.post("/follow", function(req, res){
    let FolloweeID = req.body.FolloweeID;
    let FollowerID = req.body.FollowerID;
    let record = {
        FolloweeID: FolloweeID,
        FollowerID: FollowerID,
        FollowTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
    // add checker here, or maybe change db's FolloweeID and FollowerID to primary keys
    connection.query("INSERT INTO UserFollowUser SET ?;", record, function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString()});
        else res.send({error: false, message: "follow complete"});
    });
});

user_api_route.delete("/follow", function(req, res){
    let FolloweeID = req.body.FolloweeID;
    let FollowerID = req.body.FollowerID;
    connection.query("DELETE FROM UserFollowUser WHERE FolloweeID = ? and FollowerID = ?;", [FolloweeID, FollowerID], function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString()});
        else if(results.affectedRows == 0) res.send({error: false, message: "Didn't follow in the first place"})
        else res.send({error: false, message: "unfollow complete"});
    });
});

user_api_route.get("/search_by_id/:id", function(req, res){
    let user_id = req.params.id;
    connection.query("SELECT UserID, UserName, FirstName, LastName, DOB, UserProfileIMG, TimeCreated, Role FROM User WHERE UserID = ? AND IsDeleted = False;", user_id, function(error, results, fields){
        if(error) res.status(500).send({error: true, message: error.toString(), user: null});
        else if (results.length) {
            let user = results[0];
            // follower      ->      followee
            //             follow
            connection.query("SELECT FollowerID FROM UserFollowUser WHERE FolloweeID = ?;", user_id, function(error, results, fields){
                if(error) res.status(500).send({error: true, message: error.toString() + " some how unable to retrive follower", user: user});
                else{
                    user["Followers"] = results;
                    connection.query("SELECT FolloweeID FROM UserFollowUser WHERE FollowerID = ?;", user_id, function(error, results, fields){
                        if(error) res.status(500).send({error: true, message: error.toString() + " some how unable to retrive followee", user: user});
                        else {
                            user["Followees"] = results;
                            res.send({error: false, message: "User found", user: user});
                        }
                    });
                }
            });
        }
        else res.send({error: false, message: "User is deleted or no user use that id", user: null});
    });
});

module.exports.user_api_route = user_api_route;