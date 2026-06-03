import User from "../models/User";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @desc Registers a new user
// @router /register
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existing = await User.findOne({ username });

        if (existing) {
            return res.status(400).json({ error: "Username is taken" });
        }

        const cryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: cryptedPassword
        })

        if (newUser) {
            return res.sendStatus(200);
        }
        return res.status(400).json({ error: "Failed to create new user" });

    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
}


// @ desc Logs in an existing user
// @router /login
const login = async (req, res) => {

}

export {
    register,
    login
}