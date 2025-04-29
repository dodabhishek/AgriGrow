import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { axiosInstance } from "../../../lib/axios";
import React from "react";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const Card = ({ name, description, price, imageUrl, productId, onProductUpdate, onProductDelete }) => {
  const { authUser } = useAuthStore(); // Get the logged-in user
  const fallbackImage = "/images/Basket.jpg"; // Default image if product image is not available
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ name, description, price, imageUrl });

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
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Display Product Image */}
      <img
        src={imageUrl || fallbackImage}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h3 className="text-lg font-bold mt-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-800 font-semibold mt-2">${price}</p>

      <div className="flex justify-between mt-4">
        {authUser?.role === "admin" ? (
          <>
            <button
              onClick={handleEditProduct}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center gap-2"
              disabled={isEditing || isDeleting}
            >
              {isEditing ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  Editing...
                </>
              ) : (
                "Edit"
              )}
            </button>
            <button
              onClick={handleDeleteProduct}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center gap-2"
              disabled={isEditing || isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors flex items-center gap-2"
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <>
                <Loader className="size-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        )}
      </div>

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            {/* Name input */}
            <input
              type="text"
              placeholder="Product Name"
              value={editedProduct.name || ""}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
              className="border rounded w-full px-4 py-2 mb-2"
              disabled={isEditing}
            />

            {/* Description input */}
            <textarea
              placeholder="Product Description"
              value={editedProduct.description || ""}
              onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
              className="border rounded w-full px-4 py-2 mb-2"
              disabled={isEditing}
            />

            {/* Price input */}
            <input
              type="number"
              placeholder="Price"
              value={editedProduct.price || ""}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
              className="border rounded w-full px-4 py-2 mb-2"
              disabled={isEditing}
            />

            {/* Modal Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                disabled={isEditing}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
                disabled={isEditing}
              >
                {isEditing ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
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
