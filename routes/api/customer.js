const customerController  = require("../../controllers/CustomerController")
const express = require("express")
const routes = express.Router()
const validation  = require('../../validation/Customers/customer.validation')
const { userGuard } = require("../../controllers/AuthController")

//routes customer
routes.route("/customer")
    .get(userGuard('customer.Read'),customerController.listCustomer)
    .post(userGuard('customer.Create'),validation , customerController.create)
routes.route("/customer/:id")
    .put(userGuard('customer.Update'),customerController.update)
    .delete(userGuard('customer.Delete'),customerController.destroy)
routes.route("/customer/login")
    .post(customerController.login)
//route customer_address
routes.route("/customer/address")
    .get(customerController.listCustomerAddress)
    .post(customerController.createCustomerAddress)
routes.route("/customer/address/:id")
    .put(customerController.updateCustomerAddress)
    .delete(customerController.destroyCustomerAddress)
module.exports = routes