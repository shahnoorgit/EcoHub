import express from "express";
import { become_seller } from "../controllers/seller.controller.js";

const router = express.Router();

router.post("/be-seller/:id", become_seller);

export default router;
