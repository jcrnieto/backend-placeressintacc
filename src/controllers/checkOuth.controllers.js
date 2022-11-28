const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    //console.log('verifytoken',token)
    try{
        const info = jwt.verify(token, process.env.SECRET)
        //console.log('veryfytoken',info)
        return info;
    }catch(err){
            return null
        }
    }

const checkOuth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ').pop();
        console.log('token', token);
        const tokenData = await verifyToken(token);
        console.log('esto es token data',tokenData)
        if(tokenData.id){
            next()
        }else{
            res.status(409)
            res.send({error: 'acceso denegado'})
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    checkOuth
}