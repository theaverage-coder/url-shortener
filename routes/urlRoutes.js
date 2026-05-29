import express from "express";
const router = express.Router();
import { shorten, displayCode } from "../controllers/urlController";


router.post("/shortenUrl", shorten);
router.get("/:code", displayCode);


export default router;
