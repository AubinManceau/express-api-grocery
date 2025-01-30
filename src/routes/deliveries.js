import express from "express";
import deliveryCtrl from "../controllers/deliveryController.js";
import auth from "../middlewares/authentification.js";

const router = express.Router();

router.get("/", auth, deliveryCtrl.getDeliveries);
router.get("/:id", auth, deliveryCtrl.getDeliveryById);
router.post("/", auth, deliveryCtrl.createDelivery);
router.put("/:id", auth, deliveryCtrl.updateDelivery);
router.delete("/:id", auth, deliveryCtrl.deleteDelivery);

export default router;
