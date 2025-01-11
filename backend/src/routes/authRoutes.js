import express from "express";

import { SignUpUser, LoginUser } from "../controllers/authController.js";

const router = express.Router();

// signUp route
router.post("/signup", SignUpUser);

// login route
router.post("/login", LoginUser);

export default router;
