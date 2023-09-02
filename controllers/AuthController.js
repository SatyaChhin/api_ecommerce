const { TOKEN_KEY } = require("../util/service");
const jwt = require("jsonwebtoken")
const connection = require("../db/db")

exports.userGuard = (parameter) => {
    return (req, res, next) => {
        // token from client
        var authorization = req.headers.authorization; 
        var token_from_client = null
        if (authorization != null && authorization != "") {
            // authorization : Bearer in postman
            token_from_client = authorization.split(" ") 
            token_from_client = token_from_client[1]
        }
        if (token_from_client == null) {
            res.status(401).send({
                message: 'Unauthorized',
            });
        } else {
            jwt.verify(token_from_client, TOKEN_KEY, (error, result) => {
                if (error) {
                    res.status(401).send({
                        message: 'Unauthorized',
                        error: error
                    });
                } else {
                    // check is has permission 
                    var permission = result.data.permission // get permission array from verify token
                    req.user = result.data // write user property 
                    req.user_id = result.data.user.customer_id
                    if(parameter == null){
                        next();
                    }else if(permission.includes(parameter)){
                        next();
                    }else{
                        res.status(401).send({
                            message: 'Unauthorized',
                        });
                    }  
                }
            })
        }
    }
}

exports.getPermissionUser = async (id) => {
    var sql = `SELECT p.code
        FROM customer c 
            INNER JOIN role r ON c.role_id = r.role_id
            INNER JOIN role_permission rp ON r.role_id = rp.role_id
            INNER JOIN permission p ON rp.permission_id = p.permission_id
        WHERE c.customer_id =  ? `
    var list = await connection.query(sql, [id]);
    var tmpArr = [];
    list.map((item, index) => [
        tmpArr.push(item.code)
    ])
    return tmpArr;
}

