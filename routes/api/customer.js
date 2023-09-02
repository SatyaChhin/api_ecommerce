const customerController  = require("../../controllers/CustomerController")
const express = require("express")
const routes = express.Router()
const validation  = require('../../validation/Customers/customer.validation')

//routes customer
routes.route("/customer")
    .get(customerController.listCustomer)
    .post(validation , customerController.create)
routes.route("/customer/:id")
    .put(customerController.update)
    .delete(customerController.destroy)
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