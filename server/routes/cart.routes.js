import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/addcart", addToCart);
router.delete("/removecart", removeFromCart);
router.put("/update", updateCartQuantity);

export default router;
