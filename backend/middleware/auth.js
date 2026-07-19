import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const authMiddleware = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({ error: "No token " });
        }

        const token = header.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });

        if (!user) {
            return res.status(401).json({ error: "User no longer exists" });
        }
        req.user = decoded.id;
        next();


    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

export default authMiddleware;