import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from "cookie-parser";
import { v4 as uuid } from "uuid";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/url", urlRoutes);
app.use("/users", userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));