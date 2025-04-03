import express from "express";
import { USER_REGISTER } from "../config/endpoints";
import { UserController } from "../controllers/userController";
import { EmailService } from "../services/EmailService";

const userRoutes = express.Router();
const emailService = new EmailService();
const userController = new UserController(emailService);
// simulates a user registration
userRoutes.post(USER_REGISTER, (req, res) => userController.registerUser(req, res));

// use this to test the server after deployment
userRoutes.get("/", (req, res) => {
    res.send("It works!");
});

export default userRoutes;