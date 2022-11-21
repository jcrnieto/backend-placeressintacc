const { Router } = require('express');
const {getProduct, addProduct, deleteProduct, editProduct}= require('../controllers/product.controllers');
const {addUser, deleteUser} = require('../controllers/users.controllers');
const {login} = require('../controllers/login.controllers');


const router = Router();

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//rutas de productos
router.get('/getProduct', getProduct);

router.post('/addProduct', addProduct);

router.delete('/deleteProduct/:id', deleteProduct);

router.put('/editProduct/:id', editProduct);

//rutas de usuarios
router.post('/addUser', addUser);

router.delete('/deleteUser/:id', deleteUser);

//rutas de login
router.post('/login', login);




module.exports = router;