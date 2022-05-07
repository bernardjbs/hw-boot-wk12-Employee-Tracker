const mysql = require('mysql2/promise');
require('dotenv').config()

async function dbConn() {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: "employee_db",
    });
}
console.log(`connected to database on localhost`);

module.exports = { dbConn };