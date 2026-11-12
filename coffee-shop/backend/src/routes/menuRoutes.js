import { Router } from "express";
import { getAllMenu, getMenuByCategory } from "../controllers/menuController.js";

const router = Router();

router.get("/", getAllMenu);
router.get("/:category", getMenuByCategory);

export default router;

