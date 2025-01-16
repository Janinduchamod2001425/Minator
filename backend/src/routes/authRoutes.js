import express from "express";

import { signUpUser, loginUser, logoutUser, getProfile } from "../controllers/authController.js";

const router = express.Router();

// signUp route
router.post("/signup", signUpUser);

// login route
router.post("/login", loginUser);

// logout route
router.post("/logout", logoutUser);

// Profile route
router.get("/profile/:uid", getProfile);

export default router;
