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

router.post("/addProduct", upload.single("image"), uploadImage, addProduct);

router.delete("/deleteProduct/:id", deleteProduct);

router.put("/editProduct/:id", editProduct);

router.get("/getId/:id", getId);

router.get("/getName", getName);

//rutas de usuarios
router.post("/addUser", addUser);

router.delete("/deleteUser/:id", deleteUser);

router.get("/getUser", getUser);

//rutas de login
router.post("/login", login);

//ruta de firebase

module.exports = router;
