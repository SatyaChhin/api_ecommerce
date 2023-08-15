const employeeController  = require("../../controllers/EmployeeController")
const express = require("express")
const routes = express.Router()

//routes user
routes.route("/employee/:id?")
    .get(employeeController.index)
    .post(employeeController.create)
    .put(employeeController.update)
    .delete(employeeController.destroy)
module.exports = routes