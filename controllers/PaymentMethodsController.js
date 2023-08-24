const connection = require("../db/db")

const index = async (req,res) => {
    try {
        let sql = `SELECT * 
               FROM payement_methode`
        const listOrderStatus = await connection.query(sql)
        res.json({
            success: true ,
            message : "Get data payment_methods success",
            list : listOrderStatus
        })
    } catch (error) {
        console.log(error)
    }
}

const create = async (req,res) => {
    try {
        let {
             name,
             code 
        } = req.body
        let sql = `INSERT INTO payement_methode (name,code) 
                VALUES (?,?) `
        let param = [ name , code ]
        let CreatePaymentMethods = await connection.query(sql,param)
        res.json({
            success : true ,
            message : "Create data payment method success",
            data : CreatePaymentMethods 
        })
    } catch (error) {
        console.log(error)
    }
}

const destroy = async (req,res) => {
    try{
        let payement_methode_id   = req.params.id
        let sql = `DELETE FROM payement_methode 
                   WHERE payement_methode_id = ? `
        let DestroyOrderStatus = await connection.query(sql,[payement_methode_id ])
        res.json({
            success : true ,
            message : "Remove data payment method success",
            data : DestroyOrderStatus 
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    index,
    create,
    destroy
}