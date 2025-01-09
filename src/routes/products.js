import express from 'express';
import productCtrl from "../controllers/productController.js";
import auth from "../middlewares/authentification.js"

const router = express.Router();

router.get("/", auth, productCtrl.getProducts);
router.get("/:id", auth, productCtrl.getProductById);
router.post("/", auth, productCtrl.createProduct);
router.put("/:id", auth, productCtrl.updateProduct);
router.delete("/:id", auth, productCtrl.deleteProduct);

export default router;
