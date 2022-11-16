const modelProduct = require('../../models').Product;
const orderDetail = require('../../models').OrderDetail;

//agregar productos
const getProduct = (req, res) => {
    modelProduct.findAll({
        include: [ { model:orderDetail } ]
     })
     .then( (data)=>{
        res.json({datos: data})
    })
    .catch( error => {
        console.log(error)
    })
}

//agregar productos
const addProduct = (req, res) => {
    modelProduct.create(req.body)
        .then( (data)=>{
            res.json({datos: data})
       })
       .catch( error => {
           console.log(error)
       })
}

const deleteProduct = (req, res) => {
    
        modelProduct.destroy( {
            where: {id: req.params.id}
        })
        .then( (data)=>{
            res.json({datos: data})
        })
        .catch( error => {
            console.log(error)
        });
        res.send('producto eliminado con exito')
}

//editar productos
const editProduct = (req, res) => {
    modelProduct.update(req.body, {
        where: {id: req.params.id}
     })
     .then( (data)=>{
         res.json({datos: data})
     })
     .catch( error => {
         console.log(error)
     });
     res.send('producto modificado con exito')
}


module.exports = {
    getProduct,
    addProduct,
    deleteProduct,
    editProduct
}