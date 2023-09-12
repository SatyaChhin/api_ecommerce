const connection = require("../db/db")
const { isEmptyOrNull , TOKEN_KEY } = require("../util/service")
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
const { getPermissionEmployee } = require("./AuthController")

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
// login user employee
const login = async (req,res) => {
  var { username , password } = req.body;
  var message = {};
  if(isEmptyOrNull(username)){ message.username = "Please fill in username!" }
  if(isEmptyOrNull(password)){ message.password = "Please fill in password!" }
  if(Object.keys(message).length>0){
      res.json({
          error:true,
          message:message
      })
      return 
  }
  var user = await connection.query("SELECT * FROM employee WHERE tel = ?",[username]);
  if(user.length > 0){
      var passDb = user[0].password 
      var isCorrect = bcrypt.compareSync(password,passDb)
      if(isCorrect){
          var user = user[0]
          delete user.password 
          var permission = await getPermissionEmployee(user.employee_id)
          var obj = {
              user:user,
              permission:permission,
          }
          var access_token = jwt.sign({data:{...obj}},TOKEN_KEY,{expiresIn:"2h"})
          var refresh_token = jwt.sign({data:{...obj}},TOKEN_KEY)
          res.json({
              ...obj,
              access_token:access_token,
              refresh_token:refresh_token,
          }) 
      }else{
          res.json({
              message:"Password incorrect!",
              error:true
          }) 
      }
  }else{
      res.json({
          message:"Account does't exist!. Please goto register!",
          error:true
      })
   }
}

//set password employee
const setPassword = async (req,res) => {
  const {
      username,
      password
  } = req.body;
  var message = {};
  if(isEmptyOrNull(username)) {message.username = "Please fill in username!"}
  if(isEmptyOrNull(password)) {message.password = "Please fill in password!"}
  if(Object.keys(message).length>0){
      res.json({
          error:true,
          message:message
      })
      return 
  }
  var employee = await connection.query("SELECT * FROM employee WHERE tel = ?",[username]);
  if(employee.length > 0){
      var passwordGenerate =  bcrypt.hashSync(password,10) 
      console.log(passwordGenerate)
      var update = await connection.query("UPDATE employee SET password = ? WHERE tel=? ",[ passwordGenerate , username ])
      res.json({
          message:"Password update",
          data:update
      })
  }else{
      res.json({
          message:"Account does't exist!. Please goto register!",
          error:true
      })
  }
}

module.exports = {
   index,
   create,
   update,
   setPassword,
   destroy,
   login
}