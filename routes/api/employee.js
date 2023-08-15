const userController  = require("../../controllers/EmployeeController")
const express = require("express")
const routes = express.Router()

//routes user
routes.route("/employee/:id?")
    .get(userController.index)
    .post(userController.create)
    .put(userController.update)
    .delete(userController.destroy)
module.exports = routes