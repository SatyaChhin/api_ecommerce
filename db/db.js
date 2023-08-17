const mysql = require('mysql')
const util = require('util')
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'api_ecommerce'
})
connection.query = util.promisify(connection.query).bind(connection)
connection.connect((err) => {
    err ? console.log(err) : console.log("Database connection success 👻👻👻 ")
})

module.exports = connection