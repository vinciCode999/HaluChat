import express from "express";
import morgan from "morgan";
import "dotenv/config";
import authRouter from "./routes/auth.route.js";
import connectDB from "./lib/db.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});