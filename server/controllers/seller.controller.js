import Seller from "../models/seller.model.js";
import User from "../models/user.model.js";

export const become_seller = async (req, res) => {
  const { id } = req.params;
  try {
    const existingSeller = await Seller.findOne({ sellerId: id });
    if (existingSeller) {
      return res.status(400).json({ error: "User is already a seller" });
    }

    // Find and update the user to set them as a seller
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isSeller = true;
    await user.save();

    // Create a new seller
    const newSeller = await Seller.create({
      sellerId: id,
      username: user.username,
      email: user.email,
      products: [],
    });

    res.status(201).json({ message: "Seller created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
