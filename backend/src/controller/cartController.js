import User from "../models/user.model.js";
import mongoose from "mongoose";

// Add product to cart
export const addToCart = async (req, res) => {
  console.log("addToCart called", req.body);
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    // Validate productId is provided
    if (!productId) {
      console.error("productId is missing in request body");
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Validate productId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.error("Invalid productId format:", productId);
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert productId to ObjectId for consistent comparison
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const existingProduct = user.cart.find((item) => 
      item.productId && item.productId.toString() === productObjectId.toString()
    );

    if (existingProduct) {
      return res.status(400).json({ message: "Product already in cart" });
    } else {
      user.cart.push({ productId: productObjectId, quantity: 1 });
      console.log("Adding product to cart. Cart size before save:", user.cart.length);
    }

    await user.save();
    
    // Fetch the user again with populated cart to return complete data
    const savedUser = await User.findById(userId).populate({
      path: "cart.productId",
      model: "Product"
    });
    
    console.log("Cart size after save:", savedUser.cart.length);
    console.log("Cart items:", savedUser.cart.map(item => ({
      productId: item.productId?._id?.toString() || item.productId?.toString(),
      productName: item.productId?.name,
      quantity: item.quantity
    })));

    res.status(200).json({ message: "Product added to cart", cart: savedUser.cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ 
      message: "Failed to add product to cart",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    console.log("getCart called for userId:", userId);
    
    // First, get user without populate to see raw data
    const userRaw = await User.findById(userId);
    console.log("Raw cart data from DB:", JSON.stringify(userRaw.cart.map(item => ({
      productId: item.productId?.toString(),
      quantity: item.quantity,
      quantityType: typeof item.quantity
    })), null, 2));
    
    // Now populate
    const user = await User.findById(userId).populate({
      path: "cart.productId",
      model: "Product"
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out any cart items with null/invalid productId (deleted products)
    const validCartItems = user.cart.filter(item => item.productId !== null && item.productId !== undefined);
    
    console.log("Cart items count:", user.cart.length, "Valid items:", validCartItems.length);
    
    // Log detailed cart items with quantities
    console.log("Cart items with quantities:");
    validCartItems.forEach((item, index) => {
      console.log(`  Item ${index}:`, {
        productId: item.productId?._id?.toString() || item.productId?.toString(),
        productName: item.productId?.name,
        quantity: item.quantity,
        quantityType: typeof item.quantity,
        _id: item._id?.toString()
      });
    });
    
    // Ensure quantities are preserved as numbers and properly serialize mongoose documents
    const cartWithQuantities = validCartItems.map(item => {
      // Convert mongoose subdocument to plain object
      const itemObj = item.toObject ? item.toObject() : item;
      const qty = (itemObj.quantity !== undefined && itemObj.quantity !== null) 
        ? Number(itemObj.quantity) 
        : Number(item.quantity);
      return {
        ...itemObj,
        quantity: (!isNaN(qty) && qty > 0) ? qty : 1,
        productId: itemObj.productId || item.productId
      };
    });
    
    console.log("Cart items after quantity normalization:");
    cartWithQuantities.forEach((item, index) => {
      console.log(`  Item ${index}:`, {
        productId: item.productId?._id?.toString() || item.productId?.toString(),
        productName: item.productId?.name,
        quantity: item.quantity,
        quantityType: typeof item.quantity,
        _id: item._id?.toString()
      });
    });
    
    // If there are invalid items, update the user's cart to remove them
    if (validCartItems.length !== user.cart.length) {
      user.cart = validCartItems;
      await user.save();
      console.log("Removed invalid cart items");
    }

    // Use JSON.parse(JSON.stringify()) to ensure proper serialization
    const serializedCart = JSON.parse(JSON.stringify(cartWithQuantities));
    
    console.log("Final serialized cart being sent:");
    serializedCart.forEach((item, index) => {
      console.log(`  Item ${index}:`, {
        productId: item.productId?._id || item.productId,
        quantity: item.quantity,
        quantityType: typeof item.quantity
      });
    });

    res.status(200).json({ cart: serializedCart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ 
      message: "Failed to fetch cart",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const updateCartProduct = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;
  
  try {
    // Validate productId is provided
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Validate productId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    console.log('updateCartProduct called:', { userId, productId, quantity });
    
    const user = await User.findById(userId);

    if (!user) {
      console.error('User not found:', userId);
      return res.status(404).json({ message: "User not found" });
    }

    // Convert productId to ObjectId for consistent comparison
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const productInCart = user.cart.find((item) => 
      item.productId && item.productId.toString() === productObjectId.toString()
    );

    if (!productInCart) {
      // If product is not in cart, return current cart
      const populatedUser = await User.findById(userId).populate({
        path: "cart.productId",
        model: "Product"
      });
      return res.status(404).json({ 
        message: "Product not found in cart", 
        cart: populatedUser.cart.filter(item => item.productId !== null && item.productId !== undefined)
      });
    }

    // Update the quantity if provided
    if (quantity !== undefined && quantity !== null) {
      // Ensure quantity is a valid number
      const numericQuantity = Number(quantity);
      
      if (isNaN(numericQuantity) || numericQuantity <= 0) {
        // Remove the product if quantity is 0 or less or invalid
        user.cart = user.cart.filter(
          (item) => item.productId && item.productId.toString() !== productObjectId.toString()
        );
        console.log("Removed product from cart due to invalid quantity or quantity <= 0");
      } else {
        // Update the quantity in database (ensure it's stored as a number)
        productInCart.quantity = numericQuantity;
        console.log(`Updated quantity for product ${productId} to ${numericQuantity} (type: ${typeof numericQuantity}) in database`);
      }
    }

    // Save to database - this persists the changes
    await user.save();
    console.log("Cart saved to database successfully");

    // Fetch fresh data from database with populated product information
    const updatedUser = await User.findById(userId).populate({
      path: "cart.productId",
      model: "Product"
    });

    // Filter out any null productIds (deleted products)
    const validCart = updatedUser.cart.filter(item => 
      item.productId !== null && item.productId !== undefined
    );

    // Serialize cart items properly, ensuring quantities are preserved
    const serializedCart = validCart.map(item => {
      const itemObj = item.toObject ? item.toObject() : item;
      const qty = (itemObj.quantity !== undefined && itemObj.quantity !== null) 
        ? Number(itemObj.quantity) 
        : Number(item.quantity);
      return {
        ...itemObj,
        quantity: (!isNaN(qty) && qty > 0) ? qty : 1,
        productId: itemObj.productId || item.productId
      };
    });

    // Use JSON.parse(JSON.stringify()) to ensure proper serialization
    const finalCart = JSON.parse(JSON.stringify(serializedCart));

    console.log(`Returning updated cart with ${finalCart.length} items from database`);

    res.status(200).json({ 
      message: "Cart updated successfully", 
      cart: finalCart,
      updatedProductId: productId,
      newQuantity: quantity
    });
  } catch (error) {
    console.error("Error updating cart product:", error, { userId, productId, quantity });
    res.status(500).json({ 
      message: "Failed to update cart product", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Remove single item from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    // Validate productId is provided
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Validate productId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    console.log('removeFromCart called:', { userId, productId });
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert productId to ObjectId for consistent comparison
    const productObjectId = new mongoose.Types.ObjectId(productId);
    
    // Remove the product from cart
    const initialLength = user.cart.length;
    user.cart = user.cart.filter(
      (item) => item.productId && item.productId.toString() !== productObjectId.toString()
    );

    if (user.cart.length === initialLength) {
      // Product was not in cart
      const populatedUser = await User.findById(userId).populate({
        path: "cart.productId",
        model: "Product"
      });
      return res.status(404).json({ 
        message: "Product not found in cart",
        cart: populatedUser.cart.filter(item => item.productId !== null && item.productId !== undefined)
      });
    }

    await user.save();

    // Populate the cart before returning
    const updatedUser = await User.findById(userId).populate({
      path: "cart.productId",
      model: "Product"
    });

    // Filter out any null productIds
    const validCart = updatedUser.cart.filter(item => 
      item.productId !== null && item.productId !== undefined
    );

    // Serialize cart items properly, ensuring quantities are preserved
    const serializedCart = validCart.map(item => {
      const itemObj = item.toObject ? item.toObject() : item;
      const qty = (itemObj.quantity !== undefined && itemObj.quantity !== null) 
        ? Number(itemObj.quantity) 
        : Number(item.quantity);
      return {
        ...itemObj,
        quantity: (!isNaN(qty) && qty > 0) ? qty : 1,
        productId: itemObj.productId || item.productId
      };
    });

    // Use JSON.parse(JSON.stringify()) to ensure proper serialization
    const finalCart = JSON.parse(JSON.stringify(serializedCart));

    res.status(200).json({ message: "Product removed from cart", cart: finalCart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ 
      message: "Failed to remove product from cart",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Clear user's cart
export const clearCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = [];
    await user.save();

    res.status(200).json({ message: "Cart cleared successfully", cart: user.cart });
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};