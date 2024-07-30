import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";

export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const isuser = await User.findById(userId);
    if (!isuser) {
      return res.status(404).json({ error: "User not found" });
    }
    const addedCart = await Cart.findOneAndUpdate(
      { userId },
      { $push: { products: { productId, quantity } } },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: "product added to cart!", addedCart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateCartQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Validate input
  if (!userId || !productId || quantity === undefined || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "User ID, Product ID, and valid quantity are required" });
  }

  try {
    const isuser = await User.findById(userId);
    if (!isuser) {
      return res.status(404).json({ error: "User not found" });
    }
    // Perform the update in a single atomic operation
    const result = await Cart.updateOne(
      { userId, "products.productId": productId },
      { $set: { "products.$.quantity": quantity } }
    );

    // Check if the update was successful
    if (result.nModified === 0) {
      return res.status(404).json({ error: "Cart or product not found" });
    }

    res.status(200).json({ message: "Product quantity updated successfully!" });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  // Validate input
  if (!userId || !productId) {
    return res
      .status(400)
      .json({ error: "User ID and Product ID are required" });
  }

  try {
    const isuser = await User.findById(userId);
    if (!isuser) {
      return res.status(404).json({ error: "User not found" });
    }
    // Perform the deletion in a single atomic operation
    const result = await Cart.updateOne(
      { userId },
      { $pull: { products: { productId } } }
    );

    // Check if any document was modified
    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ error: "Product not found in cart or cart does not exist" });
    }

    res
      .status(200)
      .json({ message: "Product removed from cart successfully!" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ error: "Server error" });
  }
};
