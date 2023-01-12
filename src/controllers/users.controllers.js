const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const addUser = async (req, res) => {
    const {username, password} = req.body;
    const user = await prisma.user.findMany({where: {username} })
    //console.log(user)
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

        res.send("Usuario creado correctamente");
    }else{
       res.status(401).json({error: 'el usuario ya existe en base de datos'})
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

// const userMessage = (req, res) => {
//     try{
//        const { name, email, phone, message } = req.body
//     }catch(err){
//         console.log(err)
//     }
// }
    


module.exports = {
    addUser,
    deleteUser,
    getUser
    
}