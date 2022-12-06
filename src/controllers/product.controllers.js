const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");


//agregar productos
const getProduct = async (req, res) => {

try{
   const result = await prisma.product.findMany();
   res.json(result);
}catch(err){
    console.log(err)
}
}

//agregar productos
const addProduct = async (req, res) => {
        console.log(req.file);
        const {firebaseUrl} = req.file ? req.file : "";
        
        try{
            const {title, description, price} = req.body;
            const priceInt = parseInt(price);

             const result = await prisma.product.create({
                 data: {
                     title,
                     image:firebaseUrl,
                     description,
                     price:priceInt
                 },
              })
              console.log(result)
              res.json(result);
            }catch(err){
                console.log(err)
            }
}

//eliminar producto
const deleteProduct = async (req, res) => {
    
    try{
     const {id} = req.params;
     console.log(id)
     if(id){
        const result = await prisma.product.delete({
            where: {id: Number(id)}
         })
         res.json(result);
     }else{
        return res.status(401).json({ error: "no existe id" });
     }
    }catch(err){
        console.log(err)
    }
}

//editar productos
const editProduct = async (req, res) => {
    try{
    const {id} = req.params;
    const {title, image, description, price} = req.body;
    const result = await prisma.product.update({
        where: {id: Number(id)},
        data: {title, image, description, price}
    })
    res.json(result);
}catch(err){
    console.log(err)
}
}



module.exports = {
    getProduct,
    addProduct,
    deleteProduct,
    editProduct
}