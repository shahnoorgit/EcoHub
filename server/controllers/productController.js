import mongoose from "mongoose";
import Product from "../models/product.model.js";
import Seller from "../models/seller.model.js";

export const createProduct = async (req, res) => {
  const {
    name,
    price,
    quantity,
    description,
    category,
    image,
    sustainabilityCertification,
    sellerId,
  } = req.body;
  console.log(
    name,
    price,
    quantity,
    description,
    category,
    image,
    sustainabilityCertification,
    sellerId
  );

  try {
    if (price <= 0 || quantity < 0) {
      return res.status(400).json({
        error:
          "Price must be a positive number and quantity cannot be negative",
      });
    }

    const updateSeller = await Seller.findOne({ sellerId });
    if (!updateSeller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    const product = await Product.create({
      name,
      price,
      quantity,
      description,
      category,
      image: req.file.path,
      sustainabilityCertification,
      createdBy: sellerId,
      createdAt: Date.now(),
    });

    updateSeller.products.push(product._id);
    await updateSeller.save();

    res.status(201).json({
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { name, price, quantity, description, category, sellerId } = req.body;
  const { id } = req.params;

  try {
    if (price && (isNaN(price) || price <= 0)) {
      return res.status(400).json({
        error: "Price must be a positive number",
      });
    }
    if (quantity && (isNaN(quantity) || quantity < 0)) {
      return res.status(400).json({
        error: "Quantity cannot be negative",
      });
    }

    const updateSeller = await Seller.findOne({ sellerId });
    if (!updateSeller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (product.createdBy.toString() !== sellerId) {
      return res.status(403).json({ error: "You are Unauthorized" });
    }

    const updates = {};
    if (name) updates.name = name;
    if (price) updates.price = price;
    if (quantity) updates.quantity = quantity;
    if (description) updates.description = description;
    if (category) updates.category = category;

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      error: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getProductbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { sellerId } = req.body;

  try {
    // Validate the provided ID and sellerId
    if (!id || !sellerId) {
      return res
        .status(400)
        .json({ error: "Product ID and seller ID are required" });
    }

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Product ID" });
    }

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const seller = await Seller.findOne({ sellerId: sellerId });
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    // Check if the provided sellerId matches the creator of the product
    if (product.createdBy.toString() !== sellerId) {
      return res.status(403).json({ error: "Not Authorized" });
    }

    // Remove the product ID from the seller's products list
    seller.products = seller.products.filter(
      (productId) => !productId.equals(id)
    );
    await seller.save();

    // Delete the product
    await Product.findByIdAndDelete(id);

    res.status(200).json({ error: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.error); // Log the error error
    res.status(500).json({ error: "Server Error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getSellerProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await Seller.findOne({ sellerId: id });
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    // Fetch products for the seller
    const products = await Product.find({ createdBy: id });
    if (!products) {
      return res
        .status(404)
        .json({ error: "No products found for this seller" });
    }
    res.status(200).json({ products });
  } catch (error) {
    console.log(error); // Log the error
    res.status(500).json({ error: "Server Error" });
  }
};
