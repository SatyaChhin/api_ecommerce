const BannerController  = require("../../controllers/BannerController")
const express = require("express")
const routes = express.Router()
const multer = require('multer')
const path = require('path')

// this define the banner schemas
/** 
 * @swagger
 * components:
 *  schemas:
 *      Banner:
 *          type: object
 *          required:
 *              - image
 *              - description
 *          properties:
 *              banner_id:
 *                  type: Integer
 *                  description: auto increment id
 *              image:
 *                  type: String
 *                  description: image path
 *              description:
 *                  type: String    
 *                  description: description of the banner
 *              created_at:
 *                  type: Date
 *                  description: create date of banner
 *              updated_at:
 *                  type: Date
 *                  description: update date of banner
 */

/**
 * @swagger
 * /banner:
 *  get:
 *      summary: Return the list of all banners ORDER BY banner_id  DESC
 *      responses:
 *          200:
 *              description: list of banners
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Banner'
 * 
 */

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