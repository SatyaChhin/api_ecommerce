const connection = require("../db/db")

const index = async (req , res) => {
    try {
        const customer_id = req.body.customer_id
        let sql = ` SELECT 
                        cart.cart_id,
                        cart.quantity,
                        customer.username,
                        product.* 
                    FROM cart
                        INNER JOIN product 
                            ON cart.product_id = product.product_id
                        INNER JOIN customer
                            ON cart.customer_id = customer.customer_id
                    WHERE cart.customer_id = ?  `
        const getCart = await connection.query(sql,[customer_id])
        return res.json({
            success: true,
            message : "Get data cart success",
            data : getCart
        })
    } catch (error) {
        console.error(error)
    }
} 

// Show the form for creating a new resource.
const create = async (req , res) => {
    try {
        let product_id = req.body.product_id ,
            customer_id = req.body.customer_id ,
            quantity = req.body.quantity ,
            create_at = new Date()
        let sql = `INSERT INTO cart(customer_id , product_id , quantity , create_at) 
                   VALUES(?,?,?,?)`
        const createCart = await connection.query(sql, [customer_id,product_id,quantity,create_at])
        return res.json({
            success: true,
            message : "Create data cart success",
            data : createCart
        })
    } catch (error) {
        console.error(error)
    }
}
// Update the specified resource in storage
const update = async (req , res) => {
    try {
        let id = req.params.id ,
            product_id = req.body.product_id ,
            customer_id = req.body.customer_id ,
            updated_at = new Date()
        let sql = `UPDATE wishlist 
                   SET product_id = ?, customer_id = ?, updated_at = ? 
                   WHERE wishlist_id  = ?`
        const updateWishlist = await connection.query(sql , [product_id,customer_id,updated_at,id])
        return res.json({
            success: true,
            message : "Update data wishlist success",
            data : updateWishlist
        })
    } catch (error) {
        console.error(error)
    }
}
// Remove the specified resource from storage
const destroy =  async (req , res) => {
    try {
        let id = req.params.id
        let sql = "DELETE FROM cart WHERE cart_id = ? "
        const destroyCart = await connection.query(sql,[id])
        return res.json({
            success: true,
            message : "Destroy data cart success",
            data : destroyCart
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
   index,
   create,
   update,
   destroy
}