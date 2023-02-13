const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

console.log("DATABASE_URL", process.env.DATABASE_URL);

//health check
const healthCheck = async (req, res) => {
  try {
    res.json({ ok: true, databaseUrl: process.env.DATABASE_URL });
  } catch (err) {
    console.log(err);
  }
};

//agregar productos
const getProduct = async (req, res) => {
  try {
    const result = await prisma.product.findMany();
    res.json(result); /*{ ok: true, result: result }*/
  } catch (e) {
    res.json({ ok: false, result: [], errorMessage: e?.message?.toString() });
  }
};

//agregar productos
const addProduct = async (req, res) => {
  console.log(req.file);
  const { firebaseUrl } = req.file ? req.file : "";

  try {
    const { title, description, price } = req.body;
    const priceInt = parseInt(price);

    const result = await prisma.product.create({
      data: {
        title,
        image: firebaseUrl,
        description,
        price: priceInt,
      },
    });
    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

//eliminar producto
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (id) {
      const result = await prisma.product.delete({
        where: { id: Number(id) },
      });
      res.json(result);
    } else {
      return res.status(401).json({ error: "no existe id" });
    }
  } catch (err) {
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
