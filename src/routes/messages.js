import express from 'express';
import messageCtrl from "../controllers/messageController.js";
import auth from "../middlewares/authentification.js"

const router = express.Router();

router.get("/", auth, messageCtrl.getMessages);
router.get("/:id", auth, messageCtrl.getMessageById);
router.post("/", auth, messageCtrl.createMessage);
router.put("/:id", auth, messageCtrl.updateMessage);
router.delete("/:id", auth, messageCtrl.deleteMessage);

export default router;
