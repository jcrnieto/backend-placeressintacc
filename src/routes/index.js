const { Router } = require("express");
const {
  getProduct,
  addProduct,
  deleteProduct,
  editProduct,
  getId,
  getName,
  healthCheck,
} = require("../controllers/product.controllers");
const {
  addUser,
  deleteUser,
  getUser,
} = require("../controllers/users.controllers");
const { login } = require("../controllers/login.controllers");
const { checkOuth } = require("../controllers/checkOuth.controllers");
const { uploadImage } = require("../services/firebase");
const { emailClient } = require("../controllers/emailClient.controllers");
const{check}= require('express-validator');
const { validateFields } = require('../middlewares/validate-forms');


const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});

const router = Router();

//health-check
router.get("/healthCheck", healthCheck);

//rutas de productos
router.get("/getProduct", getProduct);

router.post("/addProduct",
 upload.single("image"),
 uploadImage,
[
  check('title', 'El title es obligatorio').notEmpty(),
  //check('image', 'la imagen es obligatoria').notEmpty(),
  check('description', 'la descripcion es obligatoria').notEmpty(),
  check('price', 'el precio es obligatorio').notEmpty().isInt().withMessage('el precio debe ser un número entero'),
  validateFields
], addProduct);

router.delete("/deleteProduct/:id", deleteProduct);

router.put("/editProduct/:id", editProduct);

router.get("/getId/:id", getId);

router.get("/getName", getName);

//rutas de usuarios
router.post("/addUser",[
  check('username', 'El email es obligatorio').isEmail(),
  check('password', 'El password debe tener 6 o mas caracteres').isLength({min:6}),
  validateFields
  ], addUser);

router.delete("/deleteUser/:id", deleteUser);

router.get("/getUser", getUser);

//rutas de login
router.post("/login",
[ 
check('username', 'El email es obligatorio').isEmail(),
check('password', 'El password debe tener 6 o mas caracteres').isLength({min:6}),
validateFields
],login);

//ruta de mensaje del cliente
router.post("/clientEmail", emailClient );

module.exports = router;
