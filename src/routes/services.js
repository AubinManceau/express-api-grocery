import express from 'express';
import serviceCtrl from "../controllers/serviceController.js";
import auth from "../middlewares/authentification.js"

const router = express.Router();

router.get("/", auth, serviceCtrl.getServices);
router.get("/:id", auth, serviceCtrl.getServiceById);
router.post("/", auth, serviceCtrl.createService);
router.put("/:id", auth, serviceCtrl.updateService);
router.delete("/:id", auth, serviceCtrl.deleteService);

export default router;
