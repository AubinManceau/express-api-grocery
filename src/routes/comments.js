import express from 'express';
import commentCtrl from "../controllers/commentController.js";
import auth from "../middlewares/authentification.js"

const router = express.Router();

router.get("/:product_id/comments", auth, commentCtrl.getComments);
router.get("/:product_id/comments/:id", auth, commentCtrl.getCommentById);
router.post("/:product_id/comments", auth, commentCtrl.createComment);
router.put("/:product_id/comments/:id", auth, commentCtrl.updateComment);
router.delete("/:product_id/comments/:id", auth, commentCtrl.deleteComment);

export default router;
