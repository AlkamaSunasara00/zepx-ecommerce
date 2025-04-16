


const mysql = require("mysql");
const mysql2 = require("mysql2/promise");

// Create a regular connection for backward compatibility
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "_zepx"
});

// Add getConnection method to the existing connection object
connection.getConnection = async function() {
    // If pool doesn't exist, create it
    if (!connection.pool) {
        connection.pool = mysql2.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: "_zepx",
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
    
    // Return a connection from the pool
    return await connection.pool.getConnection();
};

module.exports = connection;