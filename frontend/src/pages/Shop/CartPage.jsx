import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader, Trash2, CreditCard, Receipt, CheckCircle, XCircle, Plus, Minus } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [removingItemId, setRemovingItemId] = useState(null);
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  
  // Checkout states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Product details popup state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Fetch cart items for the logged-in user
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/cart", {
          params: { userId: authUser._id },
        });
        setCartItems(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error.message);
        toast.error("Failed to load cart items");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser?._id) {
      fetchCart();
    }
  }, [authUser]);

  // Handle quantity update (+ / -)
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setUpdatingItemId(productId);
      
      const response = await axiosInstance.put("/cart/update", {
        userId: authUser._id,
        productId,
        quantity: newQuantity,
      });

      // Update local state for immediate UI feedback
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    } finally {
      setUpdatingItemId(null);
    }
  };

  // Handle remove item from cart
  const removeFromCart = async (productId) => {
    try {
      setRemovingItemId(productId);
      
      // Set quantity to 0 to remove the item
      await axiosInstance.put("/cart/update", {
        userId: authUser._id,
        productId,
        quantity: 0,
      });

      // Remove the item from local state
      setCartItems((prevItems) => 
        prevItems.filter((item) => item.productId._id !== productId)
      );
      
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
      toast.error("Failed to remove item from cart");
    } finally {
      setRemovingItemId(null);
    }
  };

  // Calculate overall cart total
  const calculateCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.productId.price,
      0
    );
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Handle checkout button click
  const handleCheckoutClick = () => {
    if (cartItems.length > 0) {
      setIsCheckoutOpen(true);
    }
  };

  // Handle payment
  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message first
      setIsPaymentSuccess(true);
      
      // Try to clear cart items one by one
      try {
        // Delete each item individually
        for (const item of cartItems) {
          try {
            await axiosInstance.put("/cart/update", {
              userId: authUser._id,
              productId: item.productId._id,
              quantity: 0, // Setting quantity to 0 removes the item
            });
          } catch (itemError) {
            console.error(`Error removing item ${item.productId._id}:`, itemError);
            // Continue with other items even if one fails
          }
        }
        
        // Update local state
        setCartItems([]);
        
        toast.success("Payment successful! Your order has been placed.");
      } catch (cartError) {
        console.error("Error clearing cart:", cartError);
        // Still show success for payment but warn about cart
        toast.warning("Payment successful, but there was an issue clearing your cart.");
      }
      
      // Close checkout popup and redirect to shop after 3 seconds
      setTimeout(() => {
        setIsCheckoutOpen(false);
        setIsPaymentSuccess(false);
        navigate("/shop");
      }, 3000);
    } catch (error) {
      console.error("Error processing payment:", error);
      
      // Provide more specific error message based on the error
      if (error.response && error.response.status === 500) {
        toast.error("Server error. Please try again later or contact support.");
      } else {
        toast.error("Payment failed. Please try again.");
      }
      
      setIsProcessing(false);
    }
  };

  // Close checkout popup
  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setIsPaymentSuccess(false);
  };
  
  // Handle product image click
  const handleProductClick = (product) => {
    console.log("Product clicked:", product);
    // Make sure we're working with the full product object
    if (product && product._id) {
      setSelectedProduct(product);
    } else {
      console.error("Invalid product data:", product);
      toast.error("Could not display product details");
    }
  };
  
  // Close product details popup
  const closeProductPopup = () => {
    console.log("Closing product popup");
    setSelectedProduct(null);
  };
  
  // Add product to cart
  const addToCart = async (product) => {
    if (!product || !product._id) {
      console.error("Invalid product data for adding to cart:", product);
      toast.error("Could not add product to cart");
      return;
    }
    
    try {
      console.log("Adding product to cart:", product);
      setIsAddingToCart(true);
      
      // Check if product is already in cart
      const existingItem = cartItems.find(
        (item) => item.productId._id === product._id
      );
      
      console.log("Existing item:", existingItem);
      
      if (existingItem) {
        // Update quantity if product already in cart
        await axiosInstance.put("/cart/update", {
          userId: authUser._id,
          productId: product._id,
          quantity: existingItem.quantity + 1,
        });
        
        // Update local state
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        // Add new product to cart
        await axiosInstance.post("/cart/add", {
          userId: authUser._id,
          productId: product._id,
          quantity: 1,
        });
        
        // Fetch updated cart
        const response = await axiosInstance.get("/cart", {
          params: { userId: authUser._id },
        });
        setCartItems(response.data.cart);
      }
      
      toast.success("Product added to cart");
      closeProductPopup();
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen mt-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 mt-10">
        🛒 Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cartItems.map((item) => (
              <div
                key={item.productId._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div 
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Image clicked for product:", item.productId);
                    handleProductClick(item.productId);
                  }}
                >
                  <img
                    src={item.productId.imageUrl}
                    alt={item.productId.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.productId.name}
                  </h3>

                  <p className="text-gray-600">
                    Unit Price:{" "}
                    <span className="font-medium text-gray-800">
                      {formatPrice(item.productId.price)}
                    </span>
                  </p>

                  <div className="flex items-center space-x-4 my-4">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId._id, item.quantity - 1)
                      }
                      className="w-10 h-10 bg-red-100 text-red-600 rounded-full text-xl font-bold hover:bg-red-200 shadow transition duration-200 flex items-center justify-center"
                      disabled={updatingItemId === item.productId._id}
                    >
                      {updatingItemId === item.productId._id ? (
                        <Loader className="size-4 animate-spin" />
                      ) : (
                        "−"
                      )}
                    </button>
                    <span className="text-lg font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId._id, item.quantity + 1)
                      }
                      className="w-10 h-10 bg-green-100 text-green-600 rounded-full text-xl font-bold hover:bg-green-200 shadow transition duration-200 flex items-center justify-center"
                      disabled={updatingItemId === item.productId._id}
                    >
                      {updatingItemId === item.productId._id ? (
                        <Loader className="size-4 animate-spin" />
                      ) : (
                        "+"
                      )}
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-700">
                      Total: {formatPrice(item.productId.price * item.quantity)}
                    </p>
                    
                    <button
                      onClick={() => removeFromCart(item.productId._id)}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                      disabled={removingItemId === item.productId._id}
                    >
                      {removingItemId === item.productId._id ? (
                        <Loader className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Cart Total: {formatPrice(calculateCartTotal())}
            </h2>
            
            <button
              onClick={handleCheckoutClick}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 shadow-md"
            >
              <Receipt className="size-5" />
              <span>Checkout</span>
            </button>
          </div>
        </>
      )}

      {/* Checkout Receipt Popup */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-slideUp">
            {/* Receipt Header */}
            <div className="bg-green-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Receipt className="size-5" />
                <h3 className="text-lg font-semibold">Order Receipt</h3>
              </div>
              <button 
                onClick={closeCheckout}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <XCircle className="size-5" />
              </button>
            </div>
            
            {/* Receipt Content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {isPaymentSuccess ? (
                <div className="text-center py-8 animate-fadeIn">
                  <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="size-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600">Your order has been placed successfully.</p>
                  <p className="text-gray-600 mt-2">Thank you for shopping with us!</p>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.productId._id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={item.productId.imageUrl} 
                            alt={item.productId.name} 
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium text-gray-800">{item.productId.name}</h4>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-800">
                          {formatPrice(item.productId.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Summary */}
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(calculateCartTotal())}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">{formatPrice(calculateCartTotal() * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2 mt-2">
                      <span>Total</span>
                      <span className="text-green-600">{formatPrice(calculateCartTotal() * 1.1)}</span>
                    </div>
                  </div>
                  
                  {/* Payment Button */}
                  <button
                    className="w-full bg-green-600 text-white py-3 rounded-md mt-6 flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="size-4 animate-spin mr-2" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="size-4 mr-2" />
                        <span>Pay Now</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Product Details Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-slideUp">
            {/* Product Header */}
            <div className="bg-green-600 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Product Details</h3>
              <button 
                onClick={closeProductPopup}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <XCircle className="size-5" />
              </button>
            </div>
            
            {/* Product Content */}
            <div className="p-4">
              <img 
                src={selectedProduct.imageUrl} 
                alt={selectedProduct.name} 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h2>
              
              <p className="text-green-600 text-xl font-semibold mb-4">
                {formatPrice(selectedProduct.price)}
              </p>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{selectedProduct.description || "No description available."}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Details</h3>
                <ul className="text-gray-600 space-y-1">
                  <li><span className="font-medium">Category:</span> {selectedProduct.category || "N/A"}</li>
                  <li><span className="font-medium">Stock:</span> {selectedProduct.stock || "N/A"}</li>
                  {selectedProduct.specifications && (
                    <li><span className="font-medium">Specifications:</span> {selectedProduct.specifications}</li>
                  )}
                </ul>
              </div>
              
              <button
                className="w-full bg-green-600 text-white py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Add to cart button clicked for product:", selectedProduct);
                  addToCart(selectedProduct);
                }}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <>
                    <Loader className="size-4 animate-spin mr-2" />
                    <span>Adding to Cart...</span>
                  </>
                ) : (
                  <>
                    <Plus className="size-4 mr-2" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
