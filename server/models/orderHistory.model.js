import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ordered: [
    {
      orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
    },
  ],
});

const Order_list = model("Order_list", orderSchema);

export default Order_list;
