import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import Url from "../models/Url.js";
import Click from "../models/Click.js";
import express from "express";
import prisma from "../lib/prisma";

// @desc Creates a short code for URL or a custom unique URL if given
// @router /url/shortenUrl
const shorten = async (req, res) => {
    try {
        const { originalUrl, customUrl } = req.body;
        let code;

        // Validate URL
        try {
            new URL(originalUrl);
        } catch {
            return res.status(400).json({ error: "Invalid URL" });
        }

        if (customUrl) {
            if (!isValidCode.test(customUrl)) {
                return res.status(400).json({
                    error: "Custom URL must be 3-20 characters with alphanumerics, _ and -"
                });
            }
            // Check if it's already been taken
            const existingUrl = await prisma.url.findUnique({
                where: {
                    code: customUrl
                }
            });

            if (existingUrl) {
                return res.status(400).json({ error: "Custom URL already in use" });
            }

            code = customUrl;
        } else {
            code = new nanoid(6); // Generate random code
        }

        prisma.url.create({
            data: {
                originalUrl,
                code,
                userId: req.user,
            }
        })

        return res.status(200).json({
            shortUrl: `http://localhost:5000/${code}`
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

// Regex expression that checks if a string is 3-20 characters and contains only alphanumerics, _ and - 
const isValidCode = /^[a-zA-Z0-9_-]{3,20}$/;


// @desc Get analytics for a given URL
// @router /url/analytics/:shortCode
const analytics = async (req, res) => {
    try {
        const url = await prisma.url.findUnique({
            where: {
                code: req.params.shortCode
            }
        });

        if (!url) return res.status(404).send("Not found");

        const clicks = await prisma.$queryRaw`
        SELECT
        EXTRACT (YEAR FROM timestamp) AS year,
        EXTRACT (MONTH FROM timestamp) AS month,
        EXTRACT (DAY FROM timestamp) AS day,
        COUNT(*)::int AS count
        FROM "Click"
        WHERE "UrlId" = ${url.id}
        GROUP BY year, month, day
        ORDER BY year, month, day
        `;

        const uniqueVisitors = await prisma.$queryRaw`
        SELECT COUNT(DISTINCT visitor)::int AS count
        FROM "Click"
        WHERE "urlId" = ${url.id}
        `

        return res.status(200).json({
            dateCreated: url.dateCreated,
            originalUrl: url.originalUrl,
            totalClicks: url.clicks,
            analytics: clicks,
            uniqueVisitors: uniqueVisitors[0].count
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Server error" });
    }
}

// @desc Get all URL codes created by a user
// @router /url/my-urls
const myUrls = async (req, res) => {
    try {
        const urls = await prisma.url.findMany({
            where: {
                userId: req.user
            }
        })
        return res.status(200).json(urls);
    } catch (err) {
        return res.status(500).json({ err: "Server error" });
    }
}


export {
    shorten,
    analytics,
    myUrls
}