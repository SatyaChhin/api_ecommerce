const db = require("../db/db")
const connection = db.connection
const { isEmptyOrNull } = require("../util/service")

//get data all products
const index = async (req , res) => {
    const listProduct = await connection.all("SELECT * FROM product ORDER BY product_id  DESC ")
    return res.json({
        list : listProduct
    })
} 
//filter data  products
const filter = async (req , res) => {
    let id = req.params.id
    const filterProduct = await connection.each("SELECT * FROM product WHERE product_id = ? " , [id])
    return res.json({
        list : filterProduct
    })
} 

// Show the form for creating a new resource.
const create = (req , res) => {
    let name = req.body.name ,
        barcode = req.body.barcode ,
        star_rating = req.body.star_rating ,
        quantity = req.body.quantity ,
        price = req.body.price ,
        image = ("/upload/image/" + req.file.filename) ,
        description = req.body.description ,
        is_active = req.body.is_active ,
        create_at = new Date()

    // validate parameters
    let message  = {}
    if(isEmptyOrNull(name)){message.name="name required!"}
    if(isEmptyOrNull(barcode)){message.barcode="barcode required!"}
    if(isEmptyOrNull(star_rating)){message.star_rating="star_rating required!"}
    if(isEmptyOrNull(quantity)){message.quantity="quantity required!"}
    if(isEmptyOrNull(price)){message.price="price required!"}
    if(isEmptyOrNull(description)){message.description="description required!"}
    if(Object.keys(message).length > 0){
        res.json({
            error:true,
            message:message
        })
        return false
    }

    let sql = "INSERT INTO product(name,barcode,star_rating,quantity,price,image,description,is_active,create_at) VALUES(?,?,?,?,?,?,?,?,?)"
    try {
        connection.run(sql,
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
            (error , result) => {
            if(error){     
                throw error
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
        image = ("/upload/image/" + req.file.filename) ,
        description = req.body.description ,
        is_active = req.body.is_active ,
        updated_at = new Date()
        
    let sql = " UPDATE product SET barcode = ?, name = ?, star_rating = ?, quantity = ?, price = ? , image = ? ,  description = ? , is_active = ? , updated_at = ? WHERE product_id  = ?"
    try {
        connection.run(sql,
            [ 
                barcode ,
                name ,
                star_rating ,
                quantity ,
                price ,
                image ,
                description ,
                is_active,
                updated_at ,
                id
            ],
            (error , result) => {
            if(error){
                throw error
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
        connection.run(sql,[id],(error,result)=>{
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