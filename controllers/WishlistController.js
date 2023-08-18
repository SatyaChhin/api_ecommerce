const connection = require("../db/db")

const index = async (req , res) => {
    try {
        let sql = "SELECT * FROM wishlist ORDER BY wishlist_id  DESC "
        const getWishlist = await connection.query(sql)
        return res.json({
            success: true,
            message : "Get data wishlist success",
            data : getWishlist
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
            create_at = new Date()
        let sql = "INSERT INTO wishlist(product_id,customer_id,create_at) VALUES(?,?,?)"
        const createWishlist = await connection.query(sql, [product_id,customer_id,create_at])
        return res.json({
            success: true,
            message : "Create data wishlist success",
            data : createWishlist
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
        let sql = " UPDATE wishlist SET product_id = ?, customer_id = ?, updated_at = ? WHERE wishlist_id  = ?"
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
        let sql = "DELETE FROM wishlist WHERE wishlist_id = ? "
        const destroyWishlist = await connection.query(sql,[id])
        return res.json({
            success: true,
            message : "Destroy data wishlist success",
            data : destroyWishlist
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