import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from "cookie-parser";
import Url from "./models/Url.js";
import Click from "./models/Click.js";

dotenv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/url", urlRoutes);
app.use("/users", userRoutes);

// Redirect code -> original URL
app.get("/:code", async (req, res) => {
    try {
        console.log("here");
        const url = await Url.findOne({ code: req.params.code });

        if (!url) return res.status(404).send("Not found");

        // Increment clicks
        const updated = await Url.findByIdAndUpdate(url._id,
            { $inc: { clicks: 1 } }
        );

        // Retrieve user cookie
        let visitorId = req.cookies.visitorId;

        // Create one if it doesn't exist
        if (!visitorId) {
            visitorId = uuidv4();

            res.cookie("visitorId", visitorId, {
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
                httpOnly: true,
            });
        }

        // Create click instance
        const click = await Click.create({
            urlId: url._id,
            visitor: visitorId
        })

        // Redirect to original URL
        return res.redirect(url.originalUrl);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: "Server error" });
    }
}
)
app.listen(5000, () => console.log("Server running on port 5000"));