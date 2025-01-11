import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true, // allow cookies to be sent back and forth between client and server
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/stats", statsRoutes);
app.use("/api", packageRoutes);
app.use("/api", clientRoutes);
app.use("/api", trainerRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Application is running");
});

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
