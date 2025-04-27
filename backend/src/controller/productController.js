import Product from "../models/product.model.js";
import productCloudinary from "../lib/productCloudinary.js"; // Import Cloudinary configuration

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  console.log("Create product route hit");
  console.log("Request body:", req.body);

  try {
    const { name, description, price, brand, image } = req.body;

    // Check if all required fields are provided
    if (!name || !description || !price || !brand) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = null;

    // Upload image to Cloudinary if the image is provided
    if (image) {
      const uploadResponse = await productCloudinary.uploader.upload(image, {
        folder: "products", // Specify the folder in Cloudinary
      });
      console.log("Upload response:", uploadResponse);
      imageUrl = uploadResponse.secure_url; // Use the secure URL from Cloudinary
    }

    // Create the product in the database
    const product = await Product.create({
      name,
      description,
      price,
      imageUrl, // Only set imageUrl if the image was uploaded
      brand,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

