import express from "express";
import {
  getUser,
  login,
  logout,
  register,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/get-user", getUser);

export default router;
