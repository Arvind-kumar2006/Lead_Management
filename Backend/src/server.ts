import express from "express";

import cors from "cors";

import helmet from "helmet";
import authRoutes from "./routes/auth.route";
import leadRoutes from "./routes/lead.route";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);


app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});