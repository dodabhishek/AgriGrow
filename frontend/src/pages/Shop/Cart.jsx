import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import axiosInstance from "../services/axiosInstance";
import CartItem from "../components/CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/cart");
        setCartItems(response.data.items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="size-10 animate-spin" />
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart; 