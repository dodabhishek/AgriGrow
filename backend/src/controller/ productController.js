import Product from "../models/product.model.js";

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
  try {
    const { name, description, price, imageUrl, brand } = req.body;

    if (!name || !description || !price  || !brand) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      imageUrl,
      brand,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};