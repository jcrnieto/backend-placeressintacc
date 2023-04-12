const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateJWT } = require('../helpers/genrate-token');



const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findMany({ where: { username } });
    //console.log('esto es user',user[0])
   
    if(user[0] === undefined){
      return res.status(400).json({
                  ok:false,
                  msg:'no existe usuario'
                 })
    }

      const validPassword = bcrypt.compareSync( password, user[0].password);
      const token = await generateJWT(user.id, user.name);
      
      if( validPassword) {
        res.status(200).json({
          ok:true,
          uid: user[0].id,
          username: user[0].username,
          token
        })
      }

     

  } catch (err) {
    console.log(err);
  }
};


module.exports = {
  login,
};
