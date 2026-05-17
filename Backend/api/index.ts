import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.route";
import leadRoutes from "../src/routes/lead.route";
import connectDB from "../src/config/db";

dotenv.config();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [
      "http://localhost:5173",
      "https://lead-management-u6hp.vercel.app",
    ];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(helmet());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "SmartLeads API is running." });
});

export default app;
