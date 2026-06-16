import express from "express";
const router = express.Router();
import { shorten, displayCode, analytics, myUrls } from "../controllers/urlController.js";
import { authMiddleware } from "../middleware/auth.js";

router.post("/shortenUrl", authMiddleware, shorten);
router.get("/analytics/:shortCode", analytics);
router.get("/my-urls", authMiddleware, myUrls);
router.get("/display/:code", displayCode);

export default router;
