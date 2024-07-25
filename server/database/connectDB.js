import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("MongoDB connected...");
  } catch (error) {
    console.log("error while connecting db", error.message);
  }
};

export default connectDB;
