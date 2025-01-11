import jwt from "jsonwebtoken";
import { getAuth } from "firebase/auth";
import { auth } from "../config/firebase.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Get the token from the Authorization header (Bearer Token) or cookies
    const token = req.cookies.jwt || req.headers.authorization?.splitt(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // Verify the JWT token using the server's JWT_SECRET_KEY
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Extract the userId from the decoded JWT token
    const userId = decodedToken.uid;

    // Verify the user's existence in Firebase authentication using userId
    const user = await getAuth(auth).getUser(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach the user data to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};
