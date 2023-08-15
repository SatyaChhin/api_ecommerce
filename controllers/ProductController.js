const connection = require("../db/db")

const index = (req , res) => {
    let sql = "SELECT * FROM product ORDER BY product_id  DESC "
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

const filter = (req , res) => {
    let id = req.params.id
    let sql = "SELECT * FROM product WHERE product_id = ?"
    try {
        connection.query(sql,[id],(error,result) => {
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
    let name = req.body.name ,
        barcode = req.body.barcode ,
        star_rating = req.body.star_rating ,
        quantity = req.body.quantity ,
        price = req.body.price ,
        image = req.file.filename
        description = req.body.description,
        is_active = req.body.is_active ,
        create_at = new Date()
    let sql = "INSERT INTO product(name,barcode,star_rating,quantity,price,image,description,is_active,create_at) VALUES(?,?,?,?,?,?,?,?,?)"
    try {
        connection.query(sql,
            [
                name,
                barcode,
                star_rating,
                quantity,
                price,
                image,
                description,
                is_active,
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
        name = req.body.name ,
        barcode = req.body.barcode ,
        star_rating = req.body.star_rating ,
        quantity = req.body.quantity ,
        price = req.body.price ,
        image = req.body.image ,
        description = req.body.description ,
        is_active = req.body.is_active ,
        create_at = new Date()
        
    let sql = " UPDATE product SET barcode = ?, name = ?, star_rating = ?, quantity = ?, price = ? , image = ? ,  description = ? , is_active = ? , create_at = ? WHERE product_id  = ?"
    try {
        connection.query(sql,
            [ 
                barcode ,
                name ,
                star_rating ,
                quantity ,
                price ,
                image ,
                description ,
                is_active,
                create_at ,
                id
            ],
            (error,result) => {
            if(error){
                throw err
            }
            res.send(" 1 record update id " + id )
        })
    } catch (error) {
        console.error(error)
    }
}
// Remove the specified resource from storage
const destroy = (req , res) => {
    let id = req.params.id
    let sql = "DELETE FROM product WHERE product_id  = ? "
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
   filter,
   create,
   update,
   destroy
}