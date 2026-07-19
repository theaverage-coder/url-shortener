import request from "supertest";
import app from "../app.js";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("POST /url/shortenUrl", () => {
    let token;

    beforeEach(async () => {
        // Reset test database
        await prisma.user.deleteMany();
        await prisma.url.deleteMany();

        const hashedPassword = await bcrypt.hash("password123", 10);
        const user = await prisma.user.create({
            data: {
                username: "test123",
                password: hashedPassword
            }
        });

        token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET
        );
    })


    it("creates a custom code for a URL", async () => {
        const res = await request(app)
            .post("/url/shortenUrl")
            .set("Authorization", `Bearer ${token}`)
            .send({
                originalUrl: "https://www.google.com",
                customUrl: "goo"
            });

        expect(res.statusCode).toBe(201);
    });

    it("creates a new code for a URL", async () => {
        const res = await request(app)
            .post("/url/shortenUrl")
            .set("Authorization", `Bearer ${token}`)
            .send({
                originalUrl: "https://www.reddit.com",
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("code");
        expect(typeof res.body.code).toBe("string");
    });

    it("rejects requests without a token", async () => {
        const res = await request(app)
            .post("/url/shortenUrl")
            .send({
                originalUrl: "https://www.reddit.com",
            });

        expect(res.statusCode).toBe(401);
    });

    it("rejects a request with an invalid token", async () => {
        const res = await request(app)
            .post("/url/shortenUrl")
            .set("Authorization", `Bearer invalidtoken`)
            .send({
                originalUrl: "https://www.reddit.com"
            });

        expect(res.statusCode).toBe(401);
    });

});

describe("GET /url/my-urls", () => {
    let token;

    beforeEach(async () => {
        // Create test user
        const hashedPassword = await bcrypt.hash("password123", 10);
        const user = await prisma.user.create({
            data: {
                username: "test123",
                password: hashedPassword
            }
        });

        token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET
        );

        // Create a few URLs for that user
        await prisma.url.createMany({
            data: [
                {
                    originalUrl: "https://www.google.com",
                    code: "goo",
                    userId: user.id
                },
                {
                    originalUrl: "https://www.reddit.com",
                    code: "red",
                    userId: user.id
                },
                {
                    originalUrl: "https://www.github.com",
                    code: "git",
                    userId: user.id
                }
            ]
        })
    });

    it("returns all URLs for the authenticated user", async () => {
        const res = await request(app)
            .set("Authorization", `Bearer ${token}`)
            .get("/url/my-urls");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(3);
    })
});