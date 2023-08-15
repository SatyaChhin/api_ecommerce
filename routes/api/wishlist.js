const wishlistController  = require("../../controllers/WishlistController")
const express = require("express")
const routes = express.Router()

//routes user
routes.route("/wishlist")
    .get(wishlistController.index)
    .post(wishlistController.create)
routes.route("/wishlist/:id")
    .put(wishlistController.update)
    .delete(wishlistController.destroy)
module.exports = routes