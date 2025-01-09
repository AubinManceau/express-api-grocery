import express from 'express';
import orderCtrl from "../controllers/orderController.js";
import auth from "../middlewares/authentification.js"

const router = express.Router();

router.get("/", auth, orderCtrl.getOrders);
router.get("/:id", auth, orderCtrl.getOrderById);
router.post("/", auth, orderCtrl.createOrder);
router.put("/:id", auth, orderCtrl.updateOrder);
router.delete("/:id", auth, orderCtrl.deleteOrder);

export default router;
