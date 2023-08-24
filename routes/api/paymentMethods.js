const paymentMethodsController  = require("../../controllers/PaymentMethodsController")
const express = require("express")
const routes = express.Router()

//routes user
routes.route("/payment_methods")
    .get(paymentMethodsController.index)
    .post(paymentMethodsController.create)
routes.route("/payment_methods/:id")
    .delete(paymentMethodsController.destroy)
module.exports = routes