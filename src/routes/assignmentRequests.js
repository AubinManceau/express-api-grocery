import express from "express";
import assignmentRequestCtrl from "../controllers/assignmentResquestController.js";
import auth from "../middlewares/authentification.js";

const router = express.Router();

router.get("/", auth, assignmentRequestCtrl.getAssignmentRequests);
router.get("/:id", auth, assignmentRequestCtrl.getAssignmentRequestById);
router.post("/", auth, assignmentRequestCtrl.createAssignmentRequest);
router.put("/:id", auth, assignmentRequestCtrl.updateAssignmentRequest);
router.delete("/:id", auth, assignmentRequestCtrl.deleteAssignmentRequest);

export default router;
