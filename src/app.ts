import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import botRoutes from "./routes/botRoutes";

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use("/", botRoutes);

export default app;