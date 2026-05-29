import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/Url";

const router = express.Router();

// @desc Creates a short code for URL
// @ /shortenUrl
router.post("/shortenUrl", async (req, res) => {
    const { originalUrl } = req.body;

    const code = nanoid(6);

    const newUrl = new Url({ originalUrl, code });
    await newUrl.save();

    res.json({
        shortUrl: `http://localhost:5000/${code}`
    });
});

// @ Redirect to URL given a code
router.get("/:code", async (req, res) => {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (!url) return res.status(404).send("Not found");

    res.redirect(url.originalUrl);
});

export default router;
