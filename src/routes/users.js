import express from 'express';
import userCtrl from "../controllers/userController.js";
import auth from "../middlewares/authentification.js"

const router = express.Router();

router.post("/login", userCtrl.login);
router.post("/signup", userCtrl.signup);
router.get("/", auth, userCtrl.getUsers)

export default router;
