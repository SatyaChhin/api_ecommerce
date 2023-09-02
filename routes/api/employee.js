const employeeController  = require("../../controllers/EmployeeController")
const express = require("express")
const routes = express.Router()
const { validateProduct } = require('../../validation/products/product.validation')

//routes user
routes.route("/employee")
    .get(employeeController.index)
    .post(employeeController.create)
routes.route("/employee/:id")
    .put(employeeController.update)
    .delete(employeeController.destroy)
routes.route("/employee/login")  
    .post(employeeController.login)
routes.route("/employee/setPassword")  
    .post(employeeController.setPassword)
module.exports = routes