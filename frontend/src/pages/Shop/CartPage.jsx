import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader, Trash2, Plus, Minus, ShoppingCart, Truck, Receipt, ArrowRight, Lock, CheckCircle, XCircle, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Basket from "../../assets/Images/Basket.jpg";
import cartBackground from "../../assets/Images/cartBackground.jpg";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [removingItemId, setRemovingItemId] = useState(null);
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!authUser?._id) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/cart", { params: { userId: authUser._id } });
      setCartItems(response.data.cart);
    } catch (error) {
      toast.error("Failed to load cart items");
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, [authUser?._id]);

  // Update quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdatingItemId(productId);
    try {
      await axiosInstance.put("/cart/update", {
        userId: authUser._id,
        productId,
        quantity: newQuantity,
      });
      await fetchCart();
    } catch (error) {
      toast.error("Failed to update quantity");
    } finally {
      setUpdatingItemId(null);
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    setRemovingItemId(productId);
    try {
      await axiosInstance.put("/cart/update", {
        userId: authUser._id,
        productId,
        quantity: 0,
      });
      await fetchCart();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
    } finally {
      setRemovingItemId(null);
    }
  };

  // Add to cart (for completeness, if needed)
  const addToCart = async (product) => {
    if (!product || !product._id) return toast.error("Invalid product");
    try {
      await axiosInstance.post("/cart/add", {
        userId: authUser._id,
        productId: product._id,
        quantity: 1,
      });
      await fetchCart();
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  // Calculate total
  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.productId && typeof item.productId === 'object' && item.productId.price) {
        return total + item.quantity * item.productId.price;
      }
      return total;
    }, 0);
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

  // Checkout
  const handleCheckoutClick = () => {
    if (cartItems.length > 0) setIsCheckoutOpen(true);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsPaymentSuccess(true);
      // Remove all items from cart
      for (const item of cartItems) {
        await axiosInstance.put("/cart/update", {
          userId: authUser._id,
          productId: item.productId._id,
          quantity: 0,
        });
      }
      await fetchCart();
      toast.success("Payment successful! Your order has been placed.");
      setTimeout(() => {
        setIsCheckoutOpen(false);
        setIsPaymentSuccess(false);
        navigate("/shop");
      }, 3000);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Render cart item
  const renderCartItem = (item) => {
    if (!item.productId || typeof item.productId !== 'object') return null;
    const { _id, name, price, imageUrl } = item.productId;
    if (!_id || !name || !price) return null;
    return (
      <div key={_id} className="group/card relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 blur-sm transition-all duration-500 group-hover/card:blur-md"></div>
        <div className="relative bg-white/95 backdrop-blur-lg border-2 border-emerald-100/50 shadow-lg transition-all duration-500 hover:bg-white/100 p-6">
          <div className="flex gap-6">
            <div className="relative overflow-hidden rounded-xl border-2 border-emerald-100/50">
              <img
                src={imageUrl || Basket}
                alt={name}
                className="w-32 h-32 object-cover"
                onError={e => { e.target.src = Basket; }}
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                <button
                  onClick={() => removeFromCart(_id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  disabled={removingItemId === _id}
                >
                  {removingItemId === _id ? <Loader className="size-5 animate-spin" /> : <Trash2 className="size-5" />}
                </button>
              </div>
              <p className="text-gray-600 mt-2">₹{price} per unit</p>
              <div className="flex items-center space-x-4 mt-4">
                <button
                  onClick={() => updateQuantity(_id, item.quantity - 1)}
                  className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors border-2 border-red-200"
                  disabled={updatingItemId === _id}
                >
                  {updatingItemId === _id ? <Loader className="size-4 animate-spin" /> : <Minus className="size-4" />}
                </button>
                <span className="text-lg font-medium text-gray-800 w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(_id, item.quantity + 1)}
                  className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors border-2 border-green-200"
                  disabled={updatingItemId === _id}
                >
                  {updatingItemId === _id ? <Loader className="size-4 animate-spin" /> : <Plus className="size-4" />}
                </button>
              </div>
              <p className="text-lg font-semibold text-gray-800 mt-4">Total: ₹{price * item.quantity}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${cartBackground})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="relative max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">Almost There!<br />Ready to Enjoy Fresh Goodness?</h1>
            <p className="text-lg text-gray-200 max-w-xl">Your cart is filled with farm-fresh produce, carefully selected and ready to be delivered straight to your doorstep. Complete your order and experience the taste of nature's best.</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="size-10 animate-spin text-green-600" />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 blur-xl"></div>
            <div className="relative bg-white/60 backdrop-blur-lg p-12 text-center border border-white/50 shadow-lg">
              <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
              <Link to="/shop" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25">Continue Shopping</Link>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items - Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => renderCartItem(item)).filter(Boolean)}
              </div>
              {/* Order Summary - Right Column */}
              <div className="lg:col-span-1">
                <div className="lg:block">
                  <div className="sticky top-24">
                    <div className="relative overflow-hidden rounded-3xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 blur-xl"></div>
                      <div className="relative bg-white/95 backdrop-blur-lg border-2 border-emerald-100/50 shadow-lg">
                        {/* Header */}
                        <div className="p-6 border-b-2 border-emerald-100/50">
                          <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
                        </div>
                        {/* Summary Content */}
                        <div className="p-6 space-y-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-gray-600">
                              <span className="flex items-center gap-2"><ShoppingCart className="size-4" /><span>Subtotal ({cartItems.length} items)</span></span>
                              <span className="font-medium">₹{formatPrice(calculateCartTotal())}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600">
                              <span className="flex items-center gap-2"><Truck className="size-4" /><span>Shipping</span></span>
                              <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600">
                              <span className="flex items-center gap-2"><Receipt className="size-4" /><span>Tax (10%)</span></span>
                              <span className="font-medium">₹{formatPrice(calculateCartTotal() * 0.1)}</span>
                            </div>
                          </div>
                          <div className="h-px bg-gradient-to-r from-emerald-100 via-emerald-100/50 to-transparent"></div>
                          <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                            <span>Total Amount</span>
                            <div className="text-right">
                              <span className="text-2xl text-green-600">₹{formatPrice(calculateCartTotal() * 1.1)}</span>
                              <p className="text-sm font-normal text-gray-500 mt-1">Including all taxes</p>
                            </div>
                          </div>
                          <div className="pt-4">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="relative w-11/12 max-w-2xl animate-slideUp">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Receipt className="size-5" />
                  <h3 className="text-lg font-semibold">Order Receipt</h3>
                </div>
                <button onClick={() => setIsCheckoutOpen(false)} className="text-white/80 hover:text-white transition-colors"><XCircle className="size-5" /></button>
              </div>
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {isPaymentSuccess ? (
                  <div className="text-center py-8 animate-fadeIn">
                    <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="size-8" /></div>
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
                      <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPrice(calculateCartTotal())}</span></div>
                      <div className="flex justify-between text-gray-600"><span>Shipping</span><span>Free</span></div>
                      <div className="flex justify-between text-gray-600"><span>Tax (10%)</span><span>{formatPrice(calculateCartTotal() * 0.1)}</span></div>
                      <div className="h-px bg-gray-200"></div>
                      <div className="flex justify-between text-lg font-semibold text-gray-800"><span>Total</span><span>{formatPrice(calculateCartTotal() * 1.1)}</span></div>
                    </div>
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/25 disabled:opacity-70"
                    >
                      {isProcessing ? (<><Loader className="size-5 animate-spin" />Processing Payment...</>) : (<><CreditCard className="size-5" />Pay Now</>)}
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
