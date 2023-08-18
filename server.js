const express = require("express")
const bodyParser = require('body-parser')
//swagger
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const definition = {
}

const options = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "API_ECOMMERCE",
            version: "1.0.0",
            description: ""
        },
        servers: [
            {
                url: "http://localhost:8000"
            }
        ]
    },
    // this will locate the route
    apis:["./routes/api/*.js"]
}

const specs = swaggerJsDoc(options);
const app = express()
//swagger doc route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
// parse application/json
app.use(bodyParser.json())
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

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
    console.log('=> Server swagger doc at http://localhost:' + port + "/api-docs")
})





