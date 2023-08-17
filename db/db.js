const sqlite3 = require('sqlite3').verbose();
// create the connection to database
// open the database
let connection = new sqlite3.Database('./ecomdb.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to database.');
 });

 module.exports = {connection };