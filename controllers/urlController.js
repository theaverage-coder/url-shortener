import { nanoid } from "nanoid";
import Url from "../models/Url";
import express from "express";
const router = express.Router();

// @desc Creates a short code for URL
// @router /shortenUrl
const shorten = async (req, res) => {
    const { originalUrl } = req.body;

    const code = nanoid(6);

    const newUrl = new Url({ originalUrl, code });
    await newUrl.save();

    res.json({
        shortUrl: `http://localhost:5000/${code}`
    });
}

// @desc Redirect to URL given a code
// router /get/:code
const displayCode = async (req, res) => {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (!url) return res.status(404).send("Not found");

    res.redirect(url.originalUrl);
}

export {
    shorten,
    displayCode,
}