import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { axiosInstance } from "../../../lib/axios";
import React from "react";
import { Loader, ShoppingCart, Edit, Trash2, Info } from "lucide-react";
import toast from "react-hot-toast";

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
  const fallbackImage = "/images/Basket.jpg"; // Default image if product image is not available
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ name, description, price, imageUrl });

  console.log("ProductCard rendering with:", { name, description, price, imageUrl, productId, onImageClick });

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
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 h-full flex flex-col">
      {/* Product Image Container */}
      <div className="relative group overflow-hidden h-64">
        <img
          src={imageUrl || fallbackImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
          onClick={handleImageClick}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2" title={name}>{truncateText(name)}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{description}</p>
        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl font-bold text-green-600">{formatPrice(price)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3 mt-auto">
          {authUser?.role === "admin" ? (
            <>
              <button
                onClick={handleEditProduct}
                className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                disabled={isEditing || isDeleting}
              >
                {isEditing ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    Editing...
                  </>
                ) : (
                  <>
                    <Edit className="size-4" />
                    Edit
                  </>
                )}
              </button>
              <button
                onClick={handleDeleteProduct}
                className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                disabled={isEditing || isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    Delete
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleImageClick}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <Info className="size-4" />
                Details
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="size-4" />
                    Add to Cart
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-96 max-w-[90%]">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h2>

            {/* Name input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                placeholder="Product Name"
                value={editedProduct.name || ""}
                onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isEditing}
              />
            </div>

            {/* Description input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Product Description"
                value={editedProduct.description || ""}
                onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isEditing}
                rows="3"
              />
            </div>

            {/* Price input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={editedProduct.price || ""}
                onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isEditing}
              />
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={isEditing}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                disabled={isEditing}
              >
                {isEditing ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    Saving...
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
