const connection = require("../db/db")
const { message } = require("../validation/products/product.schema")

const index = async (req,res) => {
    try {
        let sql = `SELECT * 
                   FROM order_status`
        const listOrderStatus = await connection.query(sql)
        res.json({
            success: true ,
            message : "Get data order_status success",
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
             message,
             sort_order 
        } = req.body
        let sql = `INSERT INTO order_status (name,message,sort_order) 
                VALUES (?,?,?) `
        let param = [name,message,sort_order]
        let CreateOrderStatus = await connection.query(sql,param)
        res.json({
            success : true ,
            message : "Create data order_status success",
            data : CreateOrderStatus 
        })
    } catch (error) {
        console.log(error)
    }
}

const destroy = async (req,res) => {
    try{
        let order_status_id  = req.params.id
        let sql = `DELETE FROM order_status 
                   WHERE order_status_id= ? `
        let DestroyOrderStatus = await connection.query(sql,[order_status_id])
        res.json({
            success : true ,
            message : "Remove data order_status success",
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