import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { axiosInstance } from "../../../lib/axios";
import React from "react";

const Card = ({ name, description, price, imageUrl, productId, onProductUpdate }) => {
  const { authUser } = useAuthStore(); // Get the logged-in user
  const fallbackImage = "/images/Basket.jpg";
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ name, description, price, imageUrl });

  const handleAddToCart = async () => {
    try {
      const response = await axiosInstance.post("/cart", {
        userId: authUser._id, // Pass the logged-in user's ID
        productId, // Pass the product ID
      });
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  const handleEditProduct = () => {
    setShowEditModal(true); // Open the edit modal
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axiosInstance.put(`/products/${productId}`, editedProduct);
      console.log(response.data.message); // Log success message
      onProductUpdate(response.data.product); // Update the product in the parent component
      setShowEditModal(false); // Close the modal
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
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
          <button
            onClick={handleEditProduct}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
              className="border rounded w-full px-4 py-2 mb-2"
            />
            <textarea
              placeholder="Product Description"
              value={editedProduct.description}
              onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
              className="border rounded w-full px-4 py-2 mb-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
              className="border rounded w-full px-4 py-2 mb-2"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={editedProduct.imageUrl}
              onChange={(e) => setEditedProduct({ ...editedProduct, imageUrl: e.target.value })}
              className="border rounded w-full px-4 py-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;