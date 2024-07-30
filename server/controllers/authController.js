import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import generateTokenandsetCookie from "../services/jwt.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validation
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    // Check if username or email already exists
    const [user, mail] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email }),
    ]);

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (mail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      await bcrypt.genSalt(10)
    );

    // Create new user and cart
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isSeller: false,
      wishlist: [],
    });

    await Cart.create({
      userId: newUser._id,
      products: [],
    });

    // Generate token and set cookie
    generateTokenandsetCookie(newUser._id, res);

    // Respond with new user ID
    res.status(201).json({ _id: newUser._id });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Server error" });
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
