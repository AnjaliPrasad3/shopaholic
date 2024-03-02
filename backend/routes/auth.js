import express from "express";
import { loginUser, logout, registerUser } from "../controllers/authControllers.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout  );

export default router;