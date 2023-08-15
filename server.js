const express = require("express")
const app = express()
const bodyParser = require('body-parser')
// parse application/json
app.use(bodyParser.json())
// parse application x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

require("dotenv").config()

// users Routes
app.use(require("./routes/api/employee"))
app.use(require("./routes/api/category"))

const port = process.env.PORT || 8000
app.listen(port , () => {
    console.log('Server started at http://localhost:' + port);
})





