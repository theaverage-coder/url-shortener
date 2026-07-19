import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from "cookie-parser";
import { v4 as uuid } from "uuid";
import prisma from "./lib/prisma.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/url", urlRoutes);
app.use("/users", userRoutes);

// @desc Display URL given a code
// @router /:code
app.use("/:code", async (req, res) => {
    try {

        // Find URL
        const url = await prisma.url.findUnique({
            where: {
                code: req.params.code,
            },
        });

        if (!url) {
            return res.status(404).send("Not found");
        }

        // Increment clicks
        await prisma.url.update({
            where: {
                id: url.id
            },
            data: {
                clickCount: {
                    increment: 1
                },
            },
        })

        // Retrieve user cookie
        let visitorId = req.cookies.visitorId;

        // Create one if it doesn't exist
        if (!visitorId) {
            visitorId = uuid();

            res.cookie(
                "visitorId",
                visitorId,
                {
                    maxAge: 1000 * 60 * 60 * 24 * 365,
                    httpOnly: true
                }
            );
        }

        // Create click instance
        await prisma.click.create({
            data: {
                urlId: url.id,
                visitor: visitorId,
            },
        });

        // Redirect to original URL
        return res.redirect(url.originalUrl);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "Server error" });
    }
})
export default app;