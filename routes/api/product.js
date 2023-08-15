const productController  = require("../../controllers/ProductController")
const express = require("express")
const routes = express.Router()
const multer = require('multer')
const path = require('path')

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
    .post(upload.single('image') , productController.create)
routes.route("/product/:id")
    .get(productController.filter)
    .put(productController.update)
    .delete(productController.destroy)
module.exports = routes