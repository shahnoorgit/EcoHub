import { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        addedAt: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

const Cart = model("Cart", cartSchema);

export default Cart;
