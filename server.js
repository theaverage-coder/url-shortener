import express from "express";
import mongoose from "mongoose";
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/", require("./routes/urlRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));