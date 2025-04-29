import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import { Loader, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [removingItemId, setRemovingItemId] = useState(null);
  const { authUser } = useAuthStore();

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen mt-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
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
                <img
                  src={item.productId.imageUrl}
                  alt={item.productId.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.productId.name}
                  </h3>

                  <p className="text-gray-600">
                    Unit Price:{" "}
                    <span className="font-medium text-gray-800">
                      ${item.productId.price.toFixed(2)}
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
                      Total: ${(
                        item.productId.price * item.quantity
                      ).toFixed(2)}
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

          <div className="mt-10 text-right">
            <h2 className="text-2xl font-bold text-gray-800">
              Cart Total: ${calculateCartTotal().toFixed(2)}
            </h2>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
