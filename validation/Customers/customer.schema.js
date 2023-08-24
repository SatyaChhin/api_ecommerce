
const joi = require('@hapi/joi')
const schema = joi.object({
                    username : joi.required(),
                    password : joi.required(),
                    firstname : joi.required(),
                    lastname : joi.required(),
                    gender : joi.required(),
                    tel : joi.required(),
                    province_id : joi.required(),
                    address_des : joi.required(),
                })
module.exports = schema