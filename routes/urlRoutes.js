import express from "express";
const router = express.Router();
import { shorten, displayCode, analytics } from "../controllers/urlController";


router.post("/shortenUrl", shorten);
router.get("/:code", displayCode);
router.get("/analytics/:code", analytics);


export default router;
