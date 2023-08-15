const mysql = require("mysql2")
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'api_ecommerce'
})

connection.connect((err) => {
    err ? console.log(err) : console.log("Database connection")
})

module.exports = connection