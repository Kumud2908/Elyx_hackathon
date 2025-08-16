import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { connectDB } from "./config/db.js";
import whyRoutes from "./routes/why.js";
import EventRoutes from "./routes/Events.js"
import memberRoutes from "./routes/member.js"

dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/why", whyRoutes);
app.use("/api/events", EventRoutes);
app.use("/api/persona", memberRoutes);

export default app;
