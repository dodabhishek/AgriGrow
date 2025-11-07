import React, { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";
import {
  Loader, Trash2, Plus, Minus, ShoppingCart, Truck, Receipt,
  ArrowRight, Lock, CheckCircle, XCircle, CreditCard
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Basket from "../../assets/Images/Basket.jpg";
import cartBackground from "../../assets/Images/cartBackground.jpg";
import CartItem from "./CartItem"; // ✅ Import the new component

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  // ✅ Fetch user cart (only on initial load)
  const fetchCart = async () => {
    if (!authUser?._id) return;
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/cart", {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      console.log("Raw cart data from API:", data);
      
      const normalized = (data?.cart || []).map((item) => {
        let cartQuantity = 1;
        if (item.quantity !== undefined && item.quantity !== null) {
          cartQuantity = Number(item.quantity);
          if (isNaN(cartQuantity) || cartQuantity < 1) {
            cartQuantity = 1;
          }
        }
        return {
          ...item,
          quantity: cartQuantity,
        };
      });
      console.log("Normalized cart items:", normalized);
      setCartItems(normalized);
    } catch (err) {
      console.error("Fetch cart error:", err);
      toast.error("Failed to load cart");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [authUser?._id]);

  // ✅ Wrapped in useCallback
  const removeFromCart = useCallback(async (productId) => {
    if (!productId) {
      console.error("removeFromCart: productId is missing");
      toast.error("Invalid product ID");
      return;
    }
    
    setRemovingId(productId);
    try {
      console.log("Removing product from cart:", productId);
      await axiosInstance.delete("/cart/item", { data: { productId } });
      
      // ✅ PERFORMANCE FIX: Update state locally
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.productId._id !== productId)
      );
      
      toast.success("Item removed from cart");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Remove item error:", err);
      console.error("Error response:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to remove item");
      // On error, re-fetch to be safe
      await fetchCart();
    } finally {
      setRemovingId(null);
    }
  }, []); // ✅ Empty dependency array

  // ✅ Wrapped in useCallback
  const updateQuantity = useCallback(async (productId, newQty) => {
    if (!productId) {
      console.error("updateQuantity: productId is missing");
      toast.error("Invalid product ID");
      return;
    }
    
    const quantity = Number(newQty);
    
    // If quantity is 0 or less, remove the item
    if (isNaN(quantity) || quantity < 1) {
      await removeFromCart(productId);
      return;
    }

    setUpdatingId(productId);
    try {
      console.log("Sending update request:", { productId, quantity });
      await axiosInstance.put("/cart/update", { productId, quantity });
      
      // ✅ PERFORMANCE FIX: Update state locally
      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: quantity } // Create new item object
            : item // Return same item object
        )
      );
      
      toast.success("Quantity updated");
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Update quantity error:", err);
      console.error("Error response:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to update quantity");
      // On error, re-fetch to be safe
      await fetchCart();
    } finally {
      setUpdatingId(null);
    }
  }, [removeFromCart]); // ✅ Add removeFromCart as dependency

  // ✅ Calculate total
  const calculateTotal = () =>
    cartItems.reduce((sum, item) => {
      const price = item?.productId?.price || 0;
      const qty = Number(item.quantity) || 1;
      return sum + price * qty;
    }, 0);

  const formatPrice = (val) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(val);

  // ✅ Checkout handler
  const handleCheckoutClick = () => {
    if (cartItems.length > 0) setIsCheckoutOpen(true);
  };

  // ✅ Payment simulation
  const handlePayment = async () => {
    setProcessing(true);
    try {
      await new Promise((r) => setTimeout(r, 2000));
      await axiosInstance.delete("/cart"); // clear cart
      toast.success("Payment successful! Order placed.");
      setIsPaymentSuccess(true);
      await fetchCart(); // Re-fetch to confirm cart is empty
      window.dispatchEvent(new Event("cartUpdated"));
      setTimeout(() => {
        setIsCheckoutOpen(false);
        setIsPaymentSuccess(false);
        navigate("/shop");
      }, 2500);
    } catch (err) {
      toast.error("Payment failed. Try again.");
    } finally {
      setProcessing(false);
    }
  };
  
  // 🛑 renderItem function is no longer needed here

  const subtotal = calculateTotal();
  const tax = subtotal * 0.1;
  const grandTotal = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20">
      {/* Hero */}
      <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${cartBackground})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="relative max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Almost There! <br /> Ready to Enjoy Fresh Goodness?
            </h1>
            <p className="text-lg text-gray-200 max-w-xl">
              Your cart is filled with farm-fresh produce, ready for delivery. Complete your order now.
            </p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="size-10 animate-spin text-green-600" />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="relative overflow-hidden rounded-3xl text-center bg-white/70 p-12 backdrop-blur-lg border border-emerald-100 shadow-lg">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ✅ Cart Items - Updated to use CartItem component */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.productId._id} // Use stable product ID
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                  isUpdating={updatingId === item.productId._id}
                  isRemoving={removingId === item.productId._id}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white/95 backdrop-blur-lg border-2 border-emerald-100/50 shadow-lg rounded-3xl overflow-hidden">
                <div className="p-6 border-b-2 border-emerald-100/50">
                  <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.reduce((t, i) => t + i.quantity, 0)} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (10%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="h-px bg-emerald-100"></div>
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-green-600 text-2xl">{formatPrice(grandTotal)}</span>
                  </div>
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/25 group border-2 border-emerald-500/20"
                  >
                    <span className="font-medium">Proceed to Checkout</span>
                    <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Lock className="size-4" />
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-11/12 max-w-2xl">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Receipt className="size-5" />
                  <h3 className="text-lg font-semibold">Order Receipt</h3>
                </div>
                <button onClick={() => setIsCheckoutOpen(false)} className="text-white/80 hover:text-white transition-colors">
                  <XCircle className="size-5" />
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {isPaymentSuccess ? (
                  <div className="text-center py-8">
                    <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="size-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Successful!</h3>
                    <p className="text-gray-600">Your order has been placed successfully.</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.productId._id} className="flex items-center gap-4 py-3 border-b border-gray-100">
                          <img src={item.productId.imageUrl || Basket} alt={item.productId.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{item.productId.name}</h4>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-800">{formatPrice(item.productId.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                      <div className="flex justify-between text-gray-600"><span>Shipping</span><span>Free</span></div>
                      <div className="flex justify-between text-gray-600"><span>Tax (10%)</span><span>{formatPrice(tax)}</span></div>
                      <div className="h-px bg-gray-200"></div>
                      <div className="flex justify-between text-lg font-semibold text-gray-800"><span>Total</span><span>{formatPrice(grandTotal)}</span></div>
                    </div>
                    <button
                      onClick={handlePayment}
                      disabled={processing}
                      className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/25 disabled:opacity-70"
                    >
                      {processing ? (
                        <>
                          <Loader className="size-5 animate-spin" /> Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="size-5" /> Pay Now
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;