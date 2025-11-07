import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    if (!fullName || !email || !password ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();
    
    console.log("Signup attempt for email:", normalizedEmail);

    // Check if user exists (case-insensitive)
    const user = await User.findOne({ email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') } });

    if (user) {
      console.log("Email already exists:", normalizedEmail);
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email: normalizedEmail, // Store normalized email
      password: hashedPassword,
      role: role || "user", // Default to "user" if not provided
    });

    if (newUser) {
      // Generate JWT token
      generateToken(newUser._id, res);
      await newUser.save();

      console.log("User created successfully:", normalizedEmail);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ message: "Internal Server Error", error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Normalize email to lowercase for case-insensitive comparison
    const normalizedEmail = email?.toLowerCase().trim();
    
    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log("Login attempt for email:", normalizedEmail);
    
    // Find user with case-insensitive email
    const user = await User.findOne({ email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') } });

    if (!user) {
      console.log("User not found for email:", normalizedEmail);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("User found:", user.email, "Role:", user.role);

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
    if (!isPasswordCorrect) {
      console.log("Password incorrect for user:", user.email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Password verified. Generating token for user:", user.email);

    // Generate JWT token
    generateToken(user._id, res);

    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      createdAt: user.createdAt
    };

    console.log("Login successful for user:", user.email);

    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Error in login controller:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ message: "Internal Server Error", error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};

export const logout = (req, res) => {
  try {
    console.log("Logout called, clearing JWT cookie");
    
    // Clear the JWT cookie by setting it to empty with maxAge 0
    res.cookie("jwt", "", { 
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    
    console.log("JWT cookie cleared");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select('-password'); // Exclude password from the response

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      role: updatedUser.role,
      profilePic: updatedUser.profilePic,
      createdAt: updatedUser.createdAt
    });
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    if (!req.user) {
      console.log("checkAuth: No user in request");
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    console.log("checkAuth: User authenticated:", req.user.email, "ID:", req.user._id);
    
    res.status(200).json({
      _id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role,
      profilePic: req.user.profilePic,
      createdAt: req.user.createdAt
    });
  } catch (error) {
    console.error("Error in checkAuth controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

