const customerController  = require("../../controllers/CustomerController")
const express = require("express")
const routes = express.Router()

//routes user
routes.route("/customer")
    .get(customerController.index)
    .post(customerController.create)
routes.route("/customer/:id")
    .put(customerController.update)
    .delete(customerController.destroy)
module.exports = routes