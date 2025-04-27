import express from "express";
import { createProduct, getProducts,} from "../controller/productController.js";
import { addToCart,updateCartProduct } from "../controller/cartController.js";
import { protectRoute, adminProtect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route to get all products
console.log("Product route loaded");
router.get("/", getProducts);
router.post("/", protectRoute, adminProtect, createProduct);
router.put("/",updateCartProduct);
export default router;