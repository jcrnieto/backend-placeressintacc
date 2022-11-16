const { Router } = require('express');
const {getProduct, addProduct, deleteProduct, editProduct}= require('../controllers/product.controllers');

const router = Router();

const orderDetail = require('../../models').OrderDetail;

router.get('/getProduct', getProduct);

router.post('/addProduct', addProduct);

router.delete('/deleteProduct/:id', deleteProduct);

router.put('/editProduct/:id', editProduct);


module.exports = router;