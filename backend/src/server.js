import express from "express";
import morgan from "morgan";
import "dotenv/config";
import connectDB from "./lib/db.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true //allow frontend to send cookies
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});