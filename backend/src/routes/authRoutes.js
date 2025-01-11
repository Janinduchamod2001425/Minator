import express from "express";

import { signUpUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// signUp route
router.post("/signup", signUpUser);

// login route
router.post("/login", loginUser);

export default router;
