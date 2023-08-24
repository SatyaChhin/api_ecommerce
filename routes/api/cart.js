const cartController  = require("../../controllers/CartController")
const express = require("express")
const routes = express.Router()

//routes user
routes.route("/cart")
    .get(cartController.index)
    .post(cartController.create)
routes.route("/cart/:id")
    .put(cartController.update)
    .delete(cartController.destroy)
module.exports = routes