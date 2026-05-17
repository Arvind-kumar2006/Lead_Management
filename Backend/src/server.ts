import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.route";
import leadRoutes from "./routes/lead.route";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:5173"];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(helmet());
app.use(express.json());

const PORT = process.env.PORT || 5555;

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "SmartLeads API is running." });
});

app.listen(PORT);