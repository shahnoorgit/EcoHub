import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import connectDB from "./database/connectDB.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.listen("8000", async () => {
  await connectDB();
  console.log("Server is running on port 8000");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World its EcoHub!");
});
