const connection = require("../db/db")
const { isEmptyOrNull } = require("../util/service")
const bcrypt = require("bcrypt")

const index = async (req , res) => {
    const listCustomer = await connection.query("SELECT * FROM customer ORDER BY customer_id  DESC ")
    return res.json({
        list : listCustomer
    })
} 

const create = (req,res) => {
    // check is exist
    // parameter required
    // password bcrypt
    // inert two tables customer/customer_address 
    let {
        username, 
        password,
        firstname,
        lastname,
        gender,
        province_id,
        address_des
    } = req.body;
    // validate parameters 
    let message  = {}
    if(isEmptyOrNull(username)){message.username="username required!"}
    if(isEmptyOrNull(password)){message.password="password required!"}
    if(isEmptyOrNull(firstname)){message.firstname="firstname required!"}
    if(isEmptyOrNull(lastname)){message.lastname="lastname required!"}
    if(isEmptyOrNull(gender)){message.gender="gender required!"}
    if(isEmptyOrNull(province_id)){message.province_id="province_id required!"}
    if(Object.keys(message).length > 0){
        res.json({
            error:true,
            message:message
        })
        return false
    }
    const sqlFind = "SELECT customer_id FROM customer WHERE username = ? "
    connection.query(sqlFind,[username],(error1,result1)=>{
        if(result1.length > 0){ 
            res.json({
                error:true,
                message:"Account already exist!"
            })
            return false;
        }else{
            password = bcrypt.hashSync(password,10)

            const sqlCustomer = "INSERT INTO customer (firstname, lastname, gender, username, password) VALUES (?, ?, ?, ?, ?) "
            const paramCustomer = [firstname, lastname, gender, username, password]
            connection.query(sqlCustomer,paramCustomer,(error2,result2)=>{ // insert to customer
                if(!error2){
                    // insert customer_address
                    const sqlCustomerAdd = "INSERT INTO customer_address (customer_id, province_id, firstname, lastname, tel, address_des) VALUES (?,?,?,?,?,?) "
                    const paramCustomerAdd = [result2.insertId, province_id, firstname, lastname, username, address_des]
                    connection.query(sqlCustomerAdd,paramCustomerAdd,(error3,result3)=>{
                        if(!error3){
                            res.json({
                                message:"Account created!",
                                data:result3
                            })
                        }else{
                            res.json({
                                error:true,
                                message:error3
                            })
                        }
                    })
                }
            })
        }
    })
}


// Update the specified resource in storage
const update = (req , res) => {
    const {
        firstname,
        lastname,
        gender,
    } = req.body
    const updated_at = new Date()
    const id = req.params.id 

    let message  = {}
    if(isEmptyOrNull(firstname)){message.firstname=" firstname required!"}
    if(isEmptyOrNull(lastname)){message.lastname=" lastname required!"}
    if(isEmptyOrNull(gender)){message.gender=" gender required!"}
    if(Object.keys(message).length > 0){
        res.json({
            error:true,
            message:message
        })
        return false
    }
    let sql = " UPDATE customer SET firstname = ?, lastname = ?, gender = ?, updated_at = ? WHERE customer_id   = ?"
    try {
        connection.query(sql,
            [ 
                firstname,
                lastname,
                gender,
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
    let sql = "DELETE FROM customer WHERE customer_id = ? "
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