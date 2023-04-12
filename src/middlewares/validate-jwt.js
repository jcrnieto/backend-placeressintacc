const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next) => {

     const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'no hay token en la peticion'
        })
    }

    try {
        
        const { id, name } = jwt.verify(
           token,
           process.env.SECRET_JWT_SEED
        );
         
        req.id = id;
        req.name = name;
        //console.log(payload);

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'token no valido'
        })
    }

     next();
}

module.exports = {
    validateJWT
}