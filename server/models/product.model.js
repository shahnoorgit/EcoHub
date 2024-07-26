import { model, Schema, SchemaTypes } from "mongoose";

const productschema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: {
    type: String,
    enum: [
      "Food and Beverage",
      "Furniture",
      "Green Technology",
      "Clothing and Equipment",
      "Home and Garden",
    ],
  },
  sustainabilityCertification: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: SchemaTypes.ObjectId, ref: "Seller" },
});

const Product = model("Product", productschema);

export default Product;
