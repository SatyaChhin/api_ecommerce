const CategoryController  = require("../../controllers/CategoryController")
const express = require("express")
const { route } = require("./employee")
const routes = express.Router()

//routes category
routes.route("/category")
    .get(CategoryController.index)
    .post(CategoryController.create)
routes.route("/category/:id")
    .get(CategoryController.filter)
    .put(CategoryController.update)
    .delete(CategoryController.destroy)
routes.route("/category/:id/:status")
    .put(CategoryController.changeStatus)

module.exports = routes