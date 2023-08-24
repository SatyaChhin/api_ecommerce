const customer = require('./customer.schema')
const addProductValidation =  async (req , res , next) => {
    const value = await customer.validate(req.body)
    if(value.error){
        res.json({
            success : false ,
            message : value.error.details[0].message
        })
    }else{
        next()
    }
}
module.exports = addProductValidation