const BannerController  = require("../../controllers/BannerController")
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

//routes category
routes.route("/banner")
    .get(BannerController.index)
    .post(upload.single('image') , BannerController.create)
routes.route("/banner/:id")
    .put(upload.single('image') , BannerController.update)
    .delete(BannerController.destroy)
module.exports = routes