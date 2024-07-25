import User from "../models/user.model.js";
import generateTokenandsetCookie from "../services/jwt.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username });
    const mail = await User.findOne({ email });
    if (user || mail) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      createdAt: Date.now(),
      isSeller: false,
      wishlist: [],
    });

    generateTokenandsetCookie(newUser._id, res);

    res.status(201).json({ _id: newUser._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    generateTokenandsetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "user logged out succesfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
