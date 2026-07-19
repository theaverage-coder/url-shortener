import request from "supertest";
import app from "../app.js";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

describe("Auth", () => {
    beforeEach(async () => {
        //Reset test database
        await prisma.user.deleteMany();

        const hashedPassword = await bcrypt.hash("password123", 10);

        await prisma.user.create({
            data: {
                username: "test123",
                password: hashedPassword
            }
        });
    });

    it("should register a new user", async () => {
        const res = await request(app)
            .post("/users/register")
            .send({
                username: "janedoe",
                password: "password123"
            });

        expect(res.statusCode).toBe(201);
    });

    it("should log in an existing user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({
                username: "test123",
                password: "password123"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(typeof res.body.token).toBe("string");
    });

    it("should reject an invalid password", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({
                username: "test123",
                password: "wrongpassword"
            });

        expect(res.statusCode).toBe(401);
    });

    it("should reject a nonexistent user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({
                username: "johnsmith",
                password: "helloworld"
            });

        expect(res.statusCode).toBe(401);
    })
});

