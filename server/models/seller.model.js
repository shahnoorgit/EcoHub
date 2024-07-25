import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  sellerId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
