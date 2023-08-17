const connection = require("../db/db")

const index = (req , res) => {
    let sql = "SELECT * FROM wishlist ORDER BY wishlist_id  DESC "
    try {
        connection.query(sql,(error,result) => {
            if(error){
                throw error
            }
            res.json({
                list : result
            })
        })
    } catch (error) {
        console.error(error)
    }
} 

// Show the form for creating a new resource.
const create = (req , res) => {
    let product_id = req.body.product_id ,
        customer_id = req.body.customer_id ,
        create_at = new Date()
    let sql = "INSERT INTO wishlist(product_id,customer_id,create_at) VALUES(?,?,?)"
    try {
        connection.query(sql,
            [
                product_id,
                customer_id,
                create_at
            ],
            (error,result) => {
                if(error){
                    throw err
                }
                res.send(" 1 record inserted ")
            })
        } catch (error) {
            console.error(error)
        }
}
// Update the specified resource in storage
const update = (req , res) => {
    let id = req.params.id ,
        product_id = req.body.product_id ,
        customer_id = req.body.customer_id ,
        updated_at = new Date()
    let sql = " UPDATE wishlist SET product_id = ?, customer_id = ?, updated_at = ? WHERE wishlist_id  = ?"
    try {
        connection.query(sql,
            [ 
                product_id,
                customer_id,
                updated_at,
                id
            ],
            (error,result) => {
            if(error){
                throw err
            }
            res.send(" 1 record update ")
        })
    } catch (error) {
        console.error(error)
    }
}
// Remove the specified resource from storage
const destroy = (req , res) => {
    let id = req.params.id
    let sql = "DELETE FROM wishlist WHERE wishlist_id = ? "
    try {
        connection.query(sql,[id],(error,result)=>{
            if(error){
                throw error
            }
            res.send("Delete id " + id)
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