import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductbyId,
  getSellerProducts,
  updateProduct,
} from "../controllers/productController.js";
import { upload } from "../services/uploader.js";

const router = express.Router();

router.post("/", upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductbyId);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/seller/:id", getSellerProducts);

export default router;
