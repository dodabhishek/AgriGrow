import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaComments,
  FaBars,
  FaTimes,
  FaCheck,
  FaCreditCard,
  FaReceipt,
  FaTimesCircle,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (authUser) {
          const response = await fetch(`/api/cart/${authUser._id}`);
          if (response.ok) {
            const data = await response.json();
            setCartItems(data.items || []);
          }
        } else {
          // For non-logged in users, check localStorage
          const localCart = JSON.parse(localStorage.getItem('cart')) || [];
          setCartItems(localCart);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [authUser]);

  const handleUserClick = () => {
    if (authUser) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleChatClick = () => {
    navigate("/chat");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Calculate total items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

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
    if (cartItemCount > 0) {
      setIsCheckoutOpen(true);
    }
  };

  // Handle payment
  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      try {
        if (authUser) {
          // Clear cart in database
          await fetch(`/api/cart/${authUser._id}`, {
            method: 'DELETE',
          });
        } else {
          // Clear cart in localStorage
          localStorage.removeItem('cart');
        }
        
        // Update cart state
        setCartItems([]);
        
        // Show success message
        setIsPaymentSuccess(true);
        
        // Close checkout popup after 3 seconds
        setTimeout(() => {
          setIsCheckoutOpen(false);
          setIsPaymentSuccess(false);
        }, 3000);
      } catch (error) {
        console.error("Error processing payment:", error);
      } finally {
        setIsProcessing(false);
      }
    }, 2000);
  };

  // Close checkout popup
  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setIsPaymentSuccess(false);
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      {/* Main Header */}
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src="/src/Images/logo.png" alt="Logo" className="h-12 transition-transform group-hover:scale-105" />
            <span className="text-xl font-bold text-green-600 group-hover:text-green-700 transition-colors">AgriGrow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-medium">
            <Link 
              to="/" 
              className={`py-2 border-b-2 transition-all ${
                isActive("/") 
                  ? "border-green-600 text-green-600" 
                  : "border-transparent text-gray-700 hover:text-green-600 hover:border-green-600"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`py-2 border-b-2 transition-all ${
                isActive("/about") 
                  ? "border-green-600 text-green-600" 
                  : "border-transparent text-gray-700 hover:text-green-600 hover:border-green-600"
              }`}
            >
              About
            </Link>
            <Link 
              to="/service" 
              className={`py-2 border-b-2 transition-all ${
                isActive("/service") 
                  ? "border-green-600 text-green-600" 
                  : "border-transparent text-gray-700 hover:text-green-600 hover:border-green-600"
              }`}
            >
              Services
            </Link>
     
            {authUser?.role === "admin" ? (
              <Link 
                to="/products" 
                className={`py-2 border-b-2 transition-all ${
                  isActive("/products") 
                    ? "border-green-600 text-green-600" 
                    : "border-transparent text-gray-700 hover:text-green-600 hover:border-green-600"
                }`}
              >
                Products
              </Link>
            ) : (
              <Link 
                to="/shop" 
                className={`py-2 border-b-2 transition-all ${
                  isActive("/shop") 
                    ? "border-green-600 text-green-600" 
                    : "border-transparent text-gray-700 hover:text-green-600 hover:border-green-600"
                }`}
              >
                Shop
              </Link>
            )}
            <Link 
              to="/contact" 
              className={`py-2 border-b-2 transition-all ${
                isActive("/contact") 
                  ? "border-green-600 text-green-600" 
                  : "border-transparent text-gray-700 hover:text-green-600 hover:border-green-600"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5">
    

            {/* Cart Button */}
            {authUser?.role !== "admin" && (
              <div className="flex items-center space-x-2">
                <button
                  className="text-gray-700 hover:text-green-600 transition-colors relative group"
                  onClick={handleCartClick}
                >
                  <FaShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                
                {/* Checkout Button */}
                {cartItemCount > 0 && (
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-1"
                    onClick={handleCheckoutClick}
                  >
                    <FaReceipt size={16} />
                    <span>Checkout</span>
                  </button>
                )}
              </div>
            )}

            {/* Chat Button */}
            {authUser && (
              <button
                className="text-gray-700 hover:text-green-600 transition-colors group"
                onClick={handleChatClick}
              >
                <FaComments size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            )}

            {/* User Profile Button */}
            <button
              className="text-gray-700 hover:text-green-600 transition-colors group"
              onClick={handleUserClick}
            >
              <FaUser size={20} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 hover:text-green-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="bg-gray-100 py-3 animate-fadeIn">
          <div className="container mx-auto px-5">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-600 text-white p-2 rounded-r-lg hover:bg-green-700 transition-colors"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slideDown">
          <div className="container mx-auto px-5 py-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`py-2 px-3 rounded-md transition-colors ${
                  isActive("/") 
                    ? "bg-green-100 text-green-600" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`py-2 px-3 rounded-md transition-colors ${
                  isActive("/about") 
                    ? "bg-green-100 text-green-600" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/service" 
                className={`py-2 px-3 rounded-md transition-colors ${
                  isActive("/service") 
                    ? "bg-green-100 text-green-600" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/projects" 
                className={`py-2 px-3 rounded-md transition-colors ${
                  isActive("/projects") 
                    ? "bg-green-100 text-green-600" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              {authUser?.role === "admin" ? (
                <Link 
                  to="/products" 
                  className={`py-2 px-3 rounded-md transition-colors ${
                    isActive("/products") 
                      ? "bg-green-100 text-green-600" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
              ) : (
                <Link 
                  to="/shop" 
                  className={`py-2 px-3 rounded-md transition-colors ${
                    isActive("/shop") 
                      ? "bg-green-100 text-green-600" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
              )}
              <Link 
                to="/contact" 
                className={`py-2 px-3 rounded-md transition-colors ${
                  isActive("/contact") 
                    ? "bg-green-100 text-green-600" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Checkout Receipt Popup */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden animate-slideUp">
            {/* Receipt Header */}
            <div className="bg-green-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <FaReceipt size={20} />
                <h3 className="text-lg font-semibold">Order Receipt</h3>
              </div>
              <button 
                onClick={closeCheckout}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <FaTimesCircle size={20} />
              </button>
            </div>
            
            {/* Receipt Content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {isPaymentSuccess ? (
                <div className="text-center py-8 animate-fadeIn">
                  <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheck size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600">Your order has been placed successfully.</p>
                  <p className="text-gray-600 mt-2">Thank you for shopping with us!</p>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={item.image || "/src/Images/placeholder.jpg"} 
                            alt={item.name} 
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-800">{formatPrice(item.price * (item.quantity || 1))}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Summary */}
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">{formatPrice(totalPrice * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2 mt-2">
                      <span>Total</span>
                      <span className="text-green-600">{formatPrice(totalPrice * 1.1)}</span>
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
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FaCreditCard size={16} />
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
    </header>
  );
};

export default Header;