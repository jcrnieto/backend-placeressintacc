const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
     
    try{
       const {username, password} = req.body;
       const user = await prisma.user.findMany({where:{ username }});
       

       if (!user) {
        return res.status(401).json({ error: "invalid user or password" });
      } 

      const passwordCorrect = user === null ? false : await bcrypt.compare(password, user[0].password);
      

      if (!(user && passwordCorrect)) {
        return res.status(401).json({ error: "invalid user or password" });
      }

      const userForToken = {
        id: user.id,
        username: user.username
      };
      console.log(userForToken)
      const token = jwt.sign(userForToken, process.env.SECRET);

      res.send({
        username: user.username,
        token,
        isAdmin: user.isAdmin,
      });

  
    }catch(err){
        console.log(err)
    }

}

module.exports = {
    login
}