const productController  = require("../../controllers/ProductController")
const express = require("express")
const routes = express.Router()
const multer = require('multer')
const path = require('path')
const app = express()
const validation  = require('../../validation/products/product.validation')

app.use(express.static('public/images'));

const storage = multer.diskStorage({
    destination : './public/upload/image',
    filename: ( req , file , callBack )=>{
        return callBack( null , `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage : storage
});

//routes user
routes.route("/product")
    .get(productController.index)
    .post(upload.single('image') , validation , productController.create)
routes.route("/product/:id")
    .get(productController.filter)
    .put(upload.single('image') , validation , productController.update)
    .delete(productController.destroy)
routes.route("/product/search/list")
    .get(productController.search)
module.exports = routes