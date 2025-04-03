import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use("/", userRoutes);

export default app;