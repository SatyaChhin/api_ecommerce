const orderStatusController  = require("../../controllers/OrderStatusController")
const express = require("express")
const routes = express.Router()

//routes user
routes.route("/order_status")
    .get(orderStatusController.index)
    .post(orderStatusController.create)
routes.route("/order_status/:id")
    .delete(orderStatusController.destroy)
module.exports = routes