import { model, Schema, SchemaTypes } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  wishlist: [{ type: SchemaTypes.ObjectId, ref: "Product" }],
  isSeller: { type: SchemaTypes.Boolean, required: true, default: false },
});

const User = model("User", userSchema);

export default User;
