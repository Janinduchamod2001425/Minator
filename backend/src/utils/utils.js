import jwt from "jsonwebtoken";

// Generate Json Web Token
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d", // Token expires in 7 days
  });

  // Set the token in cookies (optional: can be returned directly as well)
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS (1 week)
    httpOnly: true, // Prevent XSS attacks
    sameSite: "strict", // CSRF protection
    secure: process.env.NODE_ENV !== "development", // Use HTTPS only in production
  });

  return token;
};
