import express from "express";
import { createProduct, getProducts} from "../controller/ productController.js";
import { protectRoute, adminProtect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route to get all products
router.get("/", getProducts);

// Admin-only route to create a product
router.post("/create-product", protectRoute, adminProtect, createProduct);

export default router;