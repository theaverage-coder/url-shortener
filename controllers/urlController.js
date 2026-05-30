import { nanoid } from "nanoid";
import Url from "../models/Url";
import Click from "../models/Click";
import express from "express";
const router = express.Router();

// @desc Creates a short code for URL
// @router /shortenUrl
const shorten = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        const code = nanoid(6);

        const newUrl = new Url({ originalUrl, code });
        await newUrl.save();

        return res.status(200).json({
            shortUrl: `http://localhost:5000/${code}`
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Server error" });
    }
}

// @desc Redirect to URL given a code
// @router /get/:code
const displayCode = async (req, res) => {
    try {
        const url = await Url.findOne({ shortCode: req.params.code });

        if (!url) return res.status(404).send("Not found");

        // Increment clicks
        const updated = await Url.findByIdAndUpdate(url._id,
            { $inc: { clicks: 1 } }
        );

        // Create click instance
        const click = await Click.create({
            urlId: url._id,
        })

        // Redirect to original URL
        return res.redirect(url.originalUrl);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Server error" });
    }
}

// @desc Get analytics for a given URL
// @router /analytics/:code
const analytics = async (req, res) => {

    try {
        const url = await Url.findOne({ shortCode: req.params.code });

        if (!url) return res.status(404).send("Not found");

        const clicks = await Click.aggregate([
            {
                $match: {
                    urlId: url._id,
                }
            },
            {
                $group: {
                    _id: {
                        day: { $dayOfMonth: "$timestamp" },
                        month: { $month: "$timestamp" },
                        year: { $year: "$timestamp" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
            }
        ])

        return res.status(200).json({
            originalUrl: url.originalUrl,
            totalClicks: url.clicks,
            analytics: clicks
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Server error" });
    }
}

export {
    shorten,
    displayCode,
    analytics,
}