import express from "express";
const router = express.Router();
import { shorten, analytics, myUrls, displayUrl } from "../controllers/urlController.js";
import { authMiddleware } from "../middleware/auth.js";

router.post("/shortenUrl", authMiddleware, shorten);
router.get("/analytics/:shortCode", analytics);
router.get("/my-urls", authMiddleware, myUrls);
router.get("/:code", displayUrl)

export default router;
