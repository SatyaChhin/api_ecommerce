const db = require("../db/db")
const connection = db.connection

const index = (req , res) => {
    let sql = "SELECT * FROM banner ORDER BY banner_id  DESC "
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
    let image = ("/upload/image/" + req.file.filename) ,
        description = req.body.description ,
        create_at = new Date()

    let sql = "INSERT INTO banner(image,description,created_at) VALUES(?,?,?)"
    try {
        connection.query(sql,
            [
                image,
                description,
                create_at
            ],
            (error,result) => {
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
        image = ("/upload/image/" + req.file.filename) ,
        description = req.body.description,
        updated_at = new Date()
    let sql = " UPDATE banner SET image = ?, description = ?, updated_at = ? WHERE banner_id  = ?"
    try {
        connection.query(sql,
            [ 
                image ,
                description ,
                updated_at ,
                id
            ],
            (error,result) => {
            if(error){
                throw error
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
    let sql = "DELETE FROM banner WHERE banner_id = ? "
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