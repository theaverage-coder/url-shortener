import express from "express";
const router = express.Router();
import { shorten, displayCode, analytics } from "../controllers/urlController";
import { authMiddleware } from "../middleware/auth";

router.post("/shortenUrl", authMiddleware, shorten);
router.get("/:code", displayCode);
router.get("/analytics/:code", analytics);


export default router;
