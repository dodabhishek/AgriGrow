import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct, getAllProducts, getProductById } from "../controller/productController.js";
import { addToCart, updateCartProduct } from "../controller/cartController.js";
import { protectRoute, adminProtect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route to get all products
router.get("/", getAllProducts);
// Public route to get a single product by ID
router.get("/single/:id", getProductById);

// Protected routes
router.get("/:userId", protectRoute, getProducts);
router.post("/", protectRoute, adminProtect, createProduct);
router.delete("/:id", protectRoute, adminProtect, deleteProduct);
router.put("/:id", protectRoute, adminProtect, updateProduct);

export default router;