require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});
// const connection = null;

module.exports.connection = connection;