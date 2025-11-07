import express from "express";
import { addToCart, getCart, updateCartProduct, clearCart, removeFromCart } from "../controller/cartController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
console.log("cartRoute called");
router.post("/", protectRoute, addToCart);
router.get("/", protectRoute, getCart);
router.put("/update", protectRoute, updateCartProduct);
router.delete("/item", protectRoute, removeFromCart); // Delete single item
router.delete("/", protectRoute, clearCart); // Clear entire cart

export default router;
