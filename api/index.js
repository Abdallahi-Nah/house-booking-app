import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// routes
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

// api routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);