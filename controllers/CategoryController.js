const connection = require("../db/db")

const index = (req , res) => {
    let sql = "SELECT * FROM category ORDER BY category_id DESC "
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
    let sql = "SELECT * FROM category WHERE category_id = ?"
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
        description = req.body.description ,
        parent_id = req.body.parent_id ,
        status = req.body.status ,
        create_at = new Date()

    let sql = "INSERT INTO category(name,description,parent_id,status,create_at) VALUES(?,?,?,?,?)"
    try {
        connection.query(sql,[name,description,parent_id,status,create_at],(error,result) => {
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
        description = req.body.description ,
        parent_id = req.body.parent_id ,
        status = req.body.status ,
        create_at = new Date()
        
    let sql = " UPDATE category SET name = ?, description = ?, parent_id = ?, status = ? , create_at = ? WHERE category_id = ?"
    try {
        connection.query(sql,[ name , description , parent_id , status , create_at , id],(error,result) => {
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
    let sql = "DELETE FROM category WHERE category_id = ? "
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

const changeStatus = (req,res) => {
    let id = req.params.id,
        status = req.params.status
        
    let sql = " UPDATE category SET status = ?  WHERE category_id = ?"
    try {
        connection.query(sql,[ status,id],(error,result) => {
            if(error){
                throw err
            }
            res.send(" 1 record update ")
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
   changeStatus,
   destroy
}