const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
// parse application/json
app.use(bodyParser.json())
app.use(cors())
// parse application x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//serves your public folder at your app
app.use(express.static(__dirname + '/public'));

require("dotenv").config()

// users Routes
app.use(require("./routes/api/employee"))
app.use(require("./routes/api/category"))
app.use(require("./routes/api/product"))
app.use(require("./routes/api/banner"))
app.use(require("./routes/api/wishlist"))
app.use(require("./routes/api/customer"))
app.use(require("./routes/api/cart"))
app.use(require("./routes/api/orderStatus"))
app.use(require("./routes/api/paymentMethods"))


const port = process.env.PORT || 8000
app.listen(port , () => {
    console.log('Server started at http://localhost:' + port);
})





