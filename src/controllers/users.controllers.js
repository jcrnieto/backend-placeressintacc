const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const addUser = async (req, res) => {

    try {
        const {username, password} = req.body;
        let user = await prisma.user.findMany({where: {username}});

        if(!user.length){
                bcrypt.hash(password, saltRounds, async(err, hash)=>{
                    if(err){
                        console.log(err)
                    }
                    await prisma.user.create({
                        data: {
                            username,
                            password: hash,
                            isAdmin: false
                        }
                    })
                })
            }else{
                return res.status(400).json({
                    ok:false,
                    msg:'el usuario ya existe con ese correo'
                   })
            }
       
          res.json({
            ok:true,
            msg:'usuario creado correctamente'
          })
    } catch (error) {
        console.log(error)
    }
   
   
}

const deleteUser = async (req, res) => {
    try{
    const {id} = req.params;
    const result = await prisma.user.delete({
        where: {id: Number(id)}
     })
     res.json(result);
    }catch(err){
        console.log(err)
    }
}

const getUser = async (req, res) => {

    try{
       const result = await prisma.user.findMany();
       res.json(result);
    }catch(err){
        console.log(err)
    }
}


module.exports = {
    addUser,
    deleteUser,
    getUser
    
}