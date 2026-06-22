import { Router } from "express";
import { getHealth } from "../controllers/healthController.js";
import { testDatabase } from "../controllers/databaseController.js";
import { uploadMissionProof } from "../controllers/uploadController.js";
import upload from "../middleware/upload.js";

const router = Router();

router.get("/health", getHealth);
router.get("/db-test", testDatabase);
router.post("/uploads/mission-proof", upload.single("file"), uploadMissionProof);

export default router;
