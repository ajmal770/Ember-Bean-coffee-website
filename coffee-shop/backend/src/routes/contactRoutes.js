import { Router } from "express";
import { handleContactSubmission, getSessionSubmissions } from "../controllers/contactController.js";

const router = Router();

router.post("/", handleContactSubmission);
router.get("/session", getSessionSubmissions);

export default router;

