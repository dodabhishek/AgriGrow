import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { authUser } = useAuthStore(); // Correctly destructure authUser

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get("/cart", {
          params: { userId: authUser._id }, // Ensure userId is passed correctly
        });
        setCartItems(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error.message);
      }
    };

    if (authUser?._id) {
      fetchCart();
    }
  }, [authUser]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div key={item.productId._id} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-bold">{item.productId.name}</h3>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;