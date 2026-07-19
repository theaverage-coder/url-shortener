import express from "express";
const router = express.Router();
import { shorten, analytics, myUrls } from "../controllers/urlController.js";
import authMiddleware from "../middleware/auth.js";

router.post("/shortenUrl", authMiddleware, shorten);
router.get("/analytics/:shortCode", analytics);
router.get("/my-urls", authMiddleware, myUrls);

export default router;
