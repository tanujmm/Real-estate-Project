import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";
import cors from "cors";
const app = express();

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((err) => {
    console.log("Something went wrong" + err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(8007, () => console.log("Server started at 8007"));

// mittalji1020
// EdBwZ5j4JxodvUx5
// mongodb+srv://mittalji1020:EdBwZ5j4JxodvUx5@real-estate.ychmaol.mongodb.net/?retryWrites=true&w=majority&appName=real-estate
