import express from 'express';
import userCtrl from "../controllers/userController.js";
import auth from "../middlewares/authentification.js"

const router = express.Router();

router.post("/login", userCtrl.login);
router.post("/signup", userCtrl.signup);
router.get("/", auth, userCtrl.getUsers);
router.get("/:id", auth, userCtrl.getUserById);
router.get("/:role", auth, userCtrl.getUsersByRole);
router.put("/:id", auth, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);

export default router;
