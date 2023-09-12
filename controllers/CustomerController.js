const connection = require("../db/db")
const { isEmptyOrNull , TOKEN_KEY } = require("../util/service")
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
const { getPermissionUser } = require("./AuthController")

const listCustomer = async (req , res) => {
    try {
        const listCustomer = await connection.query(`
                SELECT * 
                FROM customer 
                ORDER BY customer_id  DESC`
        )
        return res.json({
            success: true,
            message : "Get data customer success",
            list : listCustomer
        })
    } catch (error) {
        console.log(error)
    }
} 
const create = (req,res) => {
    let {
        username, 
        password,
        firstname,
        lastname,
        tel,
        gender,
        province_id,
        address_des
    } = req.body

    const sqlFind = `SELECT customer_id 
                     FROM customer 
                     WHERE username = ?`
    connection.query(sqlFind,[username],(error1,result1)=>{
        if(result1.length > 0){ 
            res.json({
                error:true,
                message:"Account already exist!"
            })
            return false;
        }else{
            password = bcrypt.hashSync(password,10)
            const sqlCustomer = `INSERT INTO 
                                        customer(
                                            firstname,
                                            lastname,
                                            gender,
                                            username,
                                            password
                                        ) 
                                VALUES (?, ?, ?, ?, ?)`
            const paramCustomer = [firstname, lastname, gender, username, password]
            connection.query(sqlCustomer,paramCustomer,(error2,result2)=>{ 
                if(!error2){
                    // insert customer_address
                    const sqlCustomerAdd = `INSERT INTO 
                                                customer_address(
                                                    customer_id,
                                                    province_id,
                                                    firstname,
                                                    lastname,
                                                    tel,
                                                    address_des
                                                ) 
                                            VALUES (?,?,?,?,?,?)`
                    const paramCustomerAdd = [result2.insertId, province_id, firstname, lastname, tel , address_des]
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
    let {
        firstname,
        lastname,
        gender,
    } = req.body
    let updated_at = new Date()
    let id = req.params.id 
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
    let sql = ` UPDATE customer 
                SET firstname = ?, lastname = ?, gender = ?, updated_at = ? 
                WHERE customer_id   = ?`
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
            res.send(" update customer success")
        })
    } catch (error) {
        console.error(error)
    }
}
// Remove the specified resource from storage
const destroy = (req , res) => {
    let id = req.params.id
    let sql = `DELETE FROM customer 
               WHERE customer_id = ?`
    try {
        connection.query(sql,[id],(error,result)=>{
            if(error){
                throw error
            }
            res.send("Delete customer id " + id + "success")
        })
    } catch (error) {
        console.error(error)
    }
}
const listCustomerAddress = async (req , res) => {
    try {
        const listCustomerAddress = await connection.query(
            `SELECT * 
             FROM customer_address 
             ORDER BY customer_id  DESC `
        )
        return res.json({
            success: true,
            message : "Get data customer address success",
            list : listCustomerAddress
        })
    } catch (error) {
        console.log(error)
    }
} 
//Login By Customer
const login = async (req,res) => {
    let { username , password } = req.body;
    let message = {};
    if(isEmptyOrNull(username)) {message.username = "Please fill in username!"}
    if(isEmptyOrNull(password)) {message.password = "Please fill in password!"}
    if(Object.keys(message).length>0){
        res.json({
            error : true,
            message : message
        })
        return 
    }
    var user = await connection.query("SELECT * FROM customer WHERE username = ?",[ username ]);
    if(user.length > 0){
        var passDb = user[0].password 
        var correct = bcrypt.compareSync(password,passDb)
        if(correct){
            var user = user[0]
            delete user.password ; 
            var permission = await getPermissionUser(user.customer_id)
            var obj = {
                user : user,
                permission : permission,
                token:""
            }
            var access_token = jwt.sign({data:{...obj}},TOKEN_KEY)
            res.json({
                ...obj, 
                access_token:access_token,
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
//Create customerAddress
const createCustomerAddress =  (req , res) => {
    let {
        customer_id,
        firstname,
        lastname,
        tel,
        province_id,
        address_des
    } = req.body;
    let message = {}
    if(isEmptyOrNull(customer_id)) { message.customer_id = "customer_id required!"}
    if(isEmptyOrNull(firstname)) { message.firstname = "firstname required!"}
    if(isEmptyOrNull(lastname)) { message.lastname = "lastname required!"}
    if(isEmptyOrNull(tel)) { message.tel = "tel required!"}
    if(isEmptyOrNull(province_id)) { message.province_id = "province_id required!"}
    if(isEmptyOrNull(address_des)) { message.address_des = "address_des required!"}
    if(Object.keys(message).length > 0){
        res.json({
            error:true,
            message:message
        })
        return;
    }
    let sql =  `INSERT INTO 
                       customer_address (
                            customer_id,
                            province_id,
                            firstname,
                            lastname,
                            tel,
                            address_des
                        ) 
               VALUES (?,?,?,?,?,?)`;
    let param = [customer_id,province_id,firstname,lastname,tel,address_des]
    connection.query(sql,param,(error,row)=>{
        if(error){
            res.json({
                error:true,
                message:error
            })
        }else{
            res.json({
                message : row.affectedRows ? "Create successfully!" : "Data not in system!",
                data : row
            })
        }
    })
}
const updateCustomerAddress =  (req , res) => {
    let {
        customer_id,
        firstname,
        lastname,
        tel,
        province_id,
        address_des
    } = req.body;
    let customer_address_id = req.params.id
    let message = {}
    if(isEmptyOrNull(customer_id)) { message.customer_id = "customer_id required!"}
    if(isEmptyOrNull(firstname)) { message.firstname = "firstname required!"}
    if(isEmptyOrNull(lastname)) { message.lastname = "lastname required!"}
    if(isEmptyOrNull(tel)) { message.tel = "tel required!"}
    if(isEmptyOrNull(province_id)) { message.province_id = "province_id required!"}
    if(isEmptyOrNull(address_des)) { message.address_des = "address_des required!"}
    if(Object.keys(message).length > 0){
        res.json({
            error:true,
            message:message
        })
        return;
    }
    let sql = `UPDATE customer_address 
                    SET customer_id=?,
                            province_id=?,
                            firstname=?,
                            lastname=?,
                            tel=?,
                            address_des=? 
               WHERE customer_address_id = ?`
    let param = [customer_id,province_id,firstname,lastname,tel,address_des,customer_address_id]
    connection.query(sql,param,(error,row)=>{
        if(error){
            res.json({
                error:true,
                message:error
            })
        }else{
            res.json({
                message : row.affectedRows ? "update successfully!" : "Data not in system!",
                data : row
            })
        }
    })
}

//delete data CustomerAddress
const destroyCustomerAddress = async (req , res) => {
    let id = req.params.id
    let sql = `DELETE FROM customer_address 
               WHERE customer_address_id = ?`

    const destroyAddressCustomer = await connection.query(sql,[id])
    return res.json({
        message : 'Delete customer address  success',
        data : destroyAddressCustomer
    })
}

//export module to Route Customer
module.exports = {
   create,
   update,
   destroy,
   login,
   listCustomer,
   listCustomerAddress,
   createCustomerAddress,
   updateCustomerAddress,
   destroyCustomerAddress,
}