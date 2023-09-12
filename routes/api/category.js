const CategoryController  = require("../../controllers/CategoryController")
const express = require("express")
const routes = express.Router()
const { userGuard } = require("../../controllers/AuthController")

//routes category
routes.route("/category")
    .get(CategoryController.index)
    .post(CategoryController.create)
routes.route("/category/:id")
    .get(CategoryController.filter)
    // userGuard('product.Update'),
    .put(CategoryController.update)
    .delete(CategoryController.destroy)
routes.route("/category/:id/:status")
    .put(CategoryController.changeStatus)
module.exports = routes