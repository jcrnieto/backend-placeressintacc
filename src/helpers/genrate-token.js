const jwt = require('jsonwebtoken');

const generateJWT = (id, name) => {
    
     const payload = {id, name};
       
     const token = jwt.sign( payload, process.env.SECRET_JWT_SEED, { 
            expiresIn: '2h'
        });
        if(!token){
            return 'no se pudo generar token'
        }

        return token;


}

module.exports = {
    generateJWT
}