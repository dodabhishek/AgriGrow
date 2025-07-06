import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { axiosInstance } from "../../../lib/axios";
import { toast } from "react-hot-toast";
import { Loader, ShoppingCart, Edit, Trash2, Info, Eye } from "lucide-react";
import { FaTimes } from "react-icons/fa";
import Basket from "../../../assets/Images/Basket.jpg";

// Helper function to truncate text
const truncateText = (text, maxLength = 30) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// Format price for display
const formatPrice = (price) => {
  // Convert price to number and ensure it's valid
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) {
    console.error('Invalid price value:', price);
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericPrice);
};

const Card = ({ name, description, price, imageUrl, productId, onProductUpdate, onProductDelete, onImageClick }) => {
  const { authUser } = useAuthStore(); // Get the logged-in user
  const fallbackImage = Basket; // Default image if product image is not available
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ name, description, price, imageUrl });


  // Handle image click
  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick();
    }
  };

  // Handle Add to Cart
  const handleAddToCart = async () => {
    if (!authUser) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      setIsAddingToCart(true);
      
      // First check if the product is already in the cart
      const cartResponse = await axiosInstance.get("/cart", {
        params: { userId: authUser._id }
      });
      
      const cartItems = cartResponse.data.cart || [];
      const productAlreadyInCart = cartItems.some(item => 
        item.productId._id === productId
      );
      
      if (productAlreadyInCart) {
        toast.error("This product is already in your cart");
        return;
      }
      
      // If not in cart, add it
      const response = await axiosInstance.post("/cart", {
        userId: authUser._id,
        productId,
      });
      
      toast.success("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      toast.error(error.response?.data?.message || "Failed to add product to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Handle Edit Product
  const handleEditProduct = () => {
    if (!productId) {
      console.error("Product ID is missing");
      return;
    }
    setShowEditModal(true); // Open the edit modal
  };

  // Handle Save Changes after editing product details
  const handleSaveChanges = async () => {
    if (!productId) {
      console.error("Product ID is missing");
      return;
    }

    try {
      setIsEditing(true);
      const response = await axiosInstance.put(`/products/${productId}`, editedProduct);
      console.log(response.data.message); // Log success message
      onProductUpdate(response.data.product); // Update the product in the parent component
      setShowEditModal(false); // Close the modal after saving
    } catch (error) {
      console.error("Error updating product:", error.message);
    } finally {
      setIsEditing(false);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async () => {
    if (!productId) {
      console.error("Product ID is missing");
      return;
    }

    try {
      setIsDeleting(true);
      await axiosInstance.delete(`/products/${productId}`);
      console.log("Product deleted successfully");
      onProductDelete(productId); // Call the parent component's delete handler to remove it from the list
    } catch (error) {
      console.error("Error deleting product:", error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Set edited product whenever the original data changes
  useEffect(() => {
    setEditedProduct({ name, description, price, imageUrl });
  }, [name, description, price, imageUrl]);

  return (
    <div className="group">
      {/* Main Card Container */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col max-w-[280px]">
        {/* Product Image Container */}
        <div className="relative overflow-hidden w-full" style={{ height: '200px' }}>
          <img
            src={imageUrl || fallbackImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onClick={handleImageClick}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow bg-white/50 backdrop-blur-sm">
          <h3 className="text-base font-medium text-gray-800 mb-1" title={name}>
            {truncateText(name, 35)}
          </h3>
          <p className="text-gray-600 text-xs mb-3 line-clamp-2 flex-grow">
            {description}
          </p>
          
          {/* Price and Actions Container */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-semibold text-green-600">
              {formatPrice(price)}
            </span>

            <div className="flex gap-1">
              {authUser?.role === "admin" ? (
                <>
                  <button
                    onClick={handleEditProduct}
                    className="p-1.5 text-gray-600 hover:text-green-600 transition-colors"
                    disabled={isEditing || isDeleting}
                  >
                    {isEditing ? (
                      <Loader className="size-4 animate-spin" />
                    ) : (
                      <Edit className="size-4" />
                    )}
                  </button>
                  <button
                    onClick={handleDeleteProduct}
                    className="p-1.5 text-gray-600 hover:text-red-600 transition-colors"
                    disabled={isEditing || isDeleting}
                  >
                    {isDeleting ? (
                      <Loader className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleImageClick}
                    className="p-1.5 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <Info className="size-4" />
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-500/90 backdrop-blur-sm text-white text-sm rounded-full hover:bg-green-600/90 transition-colors disabled:opacity-50"
                    disabled={isAddingToCart}
                  >
                    {isAddingToCart ? (
                      <>
                        <Loader className="size-3 animate-spin" />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="size-3" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl w-80 max-w-[90%] border border-white/30">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Product
            </h2>

            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={editedProduct.name || ""}
                  onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  disabled={isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Product Description"
                  value={editedProduct.description || ""}
                  onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  disabled={isEditing}
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  value={editedProduct.price || ""}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                  className="w-full px-3 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  disabled={isEditing}
                />
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-1.5 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isEditing}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-3 py-1.5 bg-green-500/90 backdrop-blur-sm text-white text-sm rounded-full hover:bg-green-600/90 transition-colors flex items-center gap-1 disabled:opacity-50"
                disabled={isEditing}
              >
                {isEditing ? (
                  <>
                    <Loader className="size-3 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
