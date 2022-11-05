import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use("/api/products", productRoutes);
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5002;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
