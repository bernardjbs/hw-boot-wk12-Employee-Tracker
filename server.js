const mysql = require('mysql2/promise');
require('dotenv').config()

const PORT = process.env.PORT || 3001

async function connect() {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: "employee_db",
    },
    console.log(`connected to database on ${PORT}`)
    );
}



connect();
module.exports = connect;