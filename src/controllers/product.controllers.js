const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const db = process.env.DATABASE_URL
console.log('db',db)
//health check
const healthCheck = async (req, res) => {
  try {
    res.json({ ok: true, databaseUrl:db });
  } catch (err) {
    console.log(err);
  }
};

//traer productos
const getProduct = async (req, res) => {
  try {
    const result = await prisma.product.findMany();
    console.log('result', result)
   
    if(!result || result.length === 0){
      return res.status(404).json({ mensaje: 'No se encontraron productos' });
    }
    res.status(200).json({ 
      ok:true,
      result: result
    });
   
  } catch (e) {
    res.status(400).json({ ok: false, result: [], errorMessage: e?.message?.toString() });
  }
};

//agregar productos
const addProduct = async (req, res) => {
  //console.log(req.file);
  const { firebaseUrl } = req.file ? req.file : "";

  try {
    const { title, description, price,id } = req.body;
    const priceInt = parseInt(price);

    let result = await prisma.product.findFirst({ where: { title }, });
         //console.log('esto es check title',result)
    if(!result){
     
      const productCreate = await prisma.product.create({
        data: {
          title,
          image: firebaseUrl,
          description,
          price: priceInt,
        },
      });
        
     // console.log(productCreate);
      res.json({
        ok:true,
        result: productCreate
      });

    }else{
      return res.status(400).json({
        ok:false,
        msg:'la receta ya existe en base de datos'
       })
    }

    
   
  } catch (err) {
    console.log(err);
  }
};

//eliminar producto
const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
   
      const result = await prisma.product.findUnique({ where: {id}});

      if(!result){
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
      }
      
      await prisma.product.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({ mensaje: 'Producto eliminado exitosamente' });

    } 
   catch (err) {
    console.log(err);
  }
};

//editar productos
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description, price } = req.body;
    const result = await prisma.product.update({
      where: { id: Number(id) },
      data: { title, image, description, price },
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const getId = async (req, res) => {
  try {
    //console.log(req.params)
    const id = req.params.id;
    // console.log(id)
    const idParams = parseInt(id);
    //console.log('idparams',idParams)
    const result = await prisma.product.findUnique({
      where: {
        id: idParams,
      },
    });

    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

const getName = async (req, res) => {
  try {
    const title = req.query.title;

    if(title){
      const result = await prisma.product.findMany({
        where: { title: String(title.toLowerCase()) },
      //console.log(result)
    });
     res.send(result)
     }else{
      return res.send([{error: "No fue encontrado"}])
    }

  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getProduct,
  addProduct,
  deleteProduct,
  editProduct,
  getId,
  getName,
  healthCheck,
};
