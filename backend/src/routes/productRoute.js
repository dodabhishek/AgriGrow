import express from "express";
import { createProduct, getProducts} from "../controller/ productController.js";
import { addToCart } from "../controller/cartController.js";
import { protectRoute, adminProtect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route to get all products
console.log("Product route loaded");
router.get("/", getProducts);
router.post("/", protectRoute, adminProtect, createProduct);

export default router;