const connection = require("../db/db")
const { isEmptyOrNull } = require("../util/service")

//get data all products
const index = async (req , res) => {
    try {
        const listProduct = await connection.query("SELECT * FROM product ORDER BY product_id  DESC ")
        return res.json({
            list : listProduct
        })   
    } catch (error) {
        console.log(error)
    }
} 
//filter data  products
const filter = async (req , res) => {
    try {
        let id = req.params.id
        const filterProduct = await connection.query("SELECT * FROM product WHERE product_id = ? " , [id])
        return res.json({
            list : filterProduct
        })
    } catch (error) {
        console.log(error)
    }
} 

// Show the form for creating a new resource.
const create = async (req , res) => {
    try {
        let {
            category_id,
            name,
            barcode,
            star_rating,
            quantity,
            price,
            description,
            product_type,
            is_active,
        } = req.body
        let image = ("/upload/image/" + req.file.filename) 
        let create_at = new Date()
        // validate parameters
        let message  = {}
        if(isEmptyOrNull(name)){message.name = "name required!"}
        if(isEmptyOrNull(barcode)){message.barcode = "barcode required!"}
        if(isEmptyOrNull(star_rating)){message.star_rating = "star_rating required!"}
        if(isEmptyOrNull(quantity)){message.quantity = "quantity required!"}
        if(isEmptyOrNull(price)){message.price = "price required!"}
        if(isEmptyOrNull(description)){message.description = "description required!"}
        if(isEmptyOrNull(product_type)){message.product_type = "product_type required!"}
        if(Object.keys(message).length > 0){
            res.json({
                error:true,
                message:message
            })
            return false
        }
        const sql = `INSERT INTO product(
                        category_id,
                        name,
                        barcode,
                        star_rating,
                        quantity,
                        price,image,
                        description,
                        product_type,
                        is_active,
                        create_at
                    ) 
                VALUES(?,?,?,?,?,?,?,?,?,?,?)`
        const createProduct = await connection.query(sql,
            [
                category_id,
                name,
                barcode,
                star_rating,
                quantity,
                price,
                image,
                description,
                product_type,
                is_active,
                create_at
            ])
        return res.json({
            message : "Product create success",
            data : createProduct
        })
    } catch (error) {
        console.error(error)
    }
}
// Update the specified resource in storage
const update = async (req , res) => {
    try {
        let {
            category_id,
            name,
            barcode,
            star_rating,
            quantity,
            price,
            description,
            product_type ,
            is_active,
        } = req.body
        let id = req.params.id 
        let image = ("/upload/image/" + req.file.filename) 
        let updated_at = new Date()

        // validate parameters
        let message  = {}
        if(isEmptyOrNull(name)){message.name = "name required!"}
        if(isEmptyOrNull(barcode)){message.barcode = "barcode required!"}
        if(isEmptyOrNull(star_rating)){message.star_rating = "star_rating required!"}
        if(isEmptyOrNull(quantity)){message.quantity = "quantity required!"}
        if(isEmptyOrNull(price)){message.price = "price required!"}
        if(isEmptyOrNull(description)){message.description = "description required!"}
        if(Object.keys(message).length > 0){
            res.json({
                error:true,
                message:message
            })
            return false
        }
        //update data product by id  product
        const sql = `UPDATE product 
                SET ( 
                        category_id,
                        barcode = ?,
                        name = ?,
                        star_rating = ?,
                        quantity = ?,
                        price = ? ,
                        image = ? ,
                        description = ? ,
                        product_type = ? ,
                        is_active = ? ,
                        updated_at = ?
                    )
                WHERE product_id  = ?`
        const updateProduct = await connection.query(sql,
            [ 
                category_id,
                barcode ,
                name ,
                star_rating ,
                quantity ,
                price ,
                image ,
                description ,
                product_type ,
                is_active,
                updated_at , 
                id
            ])
        return res.json({
            message : "1 record update id " + id ,
            data : updateProduct
        })
    } catch (error) {
        console.error(error)
    }
    
}
// Remove the specified resource from storage
const destroy = async (req , res) => {
    try {
        let id = req.params.id
        let sql = "DELETE FROM product WHERE product_id  = ? "
        const destroyProduct = await connection.query(sql,[id])

        return res.json({
            message : 'Delete Product id ' + id + ' success',
            data : destroyProduct
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