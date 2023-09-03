const orderStatusController  = require("../../controllers/OrderStatusController")
const express = require("express")
const routes = express.Router()
const { userGuard } = require("../../controllers/AuthController")

//routes user
routes.route("/order_status")
    .get(userGuard('order.Read'),orderStatusController.index)
    .post(userGuard('order.Create'),orderStatusController.create)
routes.route("/order_status/:id")
    .delete(userGuard('order.Delete'),orderStatusController.destroy)
module.exports = routes