
const joi = require('@hapi/joi')
const schema = joi.object({
            category_id : joi.required(),
            name : joi.required(),
            barcode : joi.required(),
            star_rating : joi.required(),
            quantity : joi.required(),
            price : joi.required(),
            description : joi.required(),
            product_type : joi.required(),
            is_active : joi.required(),
        })
module.exports = schema