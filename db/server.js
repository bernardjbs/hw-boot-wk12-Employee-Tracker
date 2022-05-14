const mysql = require('mysql2/promise');
const colors = require('colors');

require('dotenv').config()

// Creating a connection to mysql database
async function dbConn() {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: "employee_db",
    });
}
console.log(`connected to database on localhost`.green);

module.exports = { dbConn };