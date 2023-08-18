const employeeController  = require("../../controllers/EmployeeController")
const express = require("express")
const routes = express.Router()
const { validateProduct } = require('../../validation/products/product.validation')


//routes user
routes.route("/employee/:id?")
    .get(employeeController.index)
    .post(employeeController.create)
    .put(employeeController.update)
    .delete(employeeController.destroy)
module.exports = routes