const connection = require("../db/db")

const index = (req , res) => {
    let sql = "SELECT * FROM employee  ORDER BY employee_id desc"
    try {
      connection.query(sql,function (err, result) {
        if(err){
          throw err
        }
        res.json({
          list : result
        })
      })
    } catch (error) {
      console.error(error);
    }
} 
// Show the form for creating a new resource.
const create = (req , res) => {
    let fname = req.body.firstname,
        lname = req.body.lastname,
        tell = req.body.tel,
        email = req.body.email,
        base_salary = req.body.base_salary,
        address = req.body.address,
        province = req.body.province,
        country = req.body.country,
        create_at = new Date()

    let sql =  `INSERT INTO employee 
               (firstname,lastname,tel,email,base_salary,address,province,country,create_at) 
               VALUES (?,?,?,?,?,?,?,?,?)`
    try {
      connection.query(sql ,[
        fname , lname , tell , email , base_salary , address , province , country , create_at
      ],(err , result) => {
        if (err) {
          throw err
        } 
        res.send("1 record inserted")
    })
    } catch (error) {
        console.error(error)
    }
}
// Update the specified resource in storage
const update = (req , res) => {
    let id = req.params.id,
        fname = req.body.firstname,
        lname = req.body.lastname,
        tell = req.body.tel,
        email = req.body.email,
        base_salary = req.body.base_salary,
        address = req.body.address,
        province = req.body.province,
        country = req.body.country,
        create_at = new Date()

    let message = {}
    if(fname == null){
        message.fname = "fistName required"
    }
    if(lname == null){
        message.lname = "lestName required"
    }
    if( Object.keys(message).length > 0 ){
        res.json({
            message : message
        })
        return
    }
    let sql = `UPDATE employee 
               SET (firstname = ?, 
                    lastname = ?,
                    tel = ?,
                    email = ?,
                    base_salary = ?, 
                    address = ?, 
                    province = ?,
                    country = ?,
                    create_at = ?
                  ) 
               WHERE employee_id = ? `
    try {
      connection.query(sql , 
        [
          fname , 
          lname , 
          tell ,
          email , 
          base_salary ,
          address ,
          province , 
          country ,
          create_at ,
          id
        ], (err , result) => {
          if(err){
            throw err
          }
          res.send("update employee id " + id)
      })
    } catch (error) {
      console.error(error)
    }
}
// Remove the specified resource from storage
const destroy = (req , res) => {
    let id = req.params.id
    try {
      connection.query("DELETE FROM employee WHERE employee_id = ?" , [id] , (err , result) => {
          if(err){
            throw err
          }
          res.send("delete id " + id)
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