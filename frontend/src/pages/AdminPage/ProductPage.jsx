import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios.js"; // Import axiosInstance
import toast from "react-hot-toast";
import Card from "./Card/productCard.jsx"; // Import Card component
import { useAuthStore } from "../../store/useAuthStore.js"; // Import auth store

const ProductPage = () => {
  const [products, setProducts] = useState([]); // Ensure initial state is an array
  const [showAddProductModal, setShowAddProductModal] = useState(false); // State for modal visibility
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", brand: "", image: null }); // Added brand to state
  const { authUser } = useAuthStore(); // Get the logged-in user

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products"); // Use axiosInstance for the API call
        console.log("API Response:", res.data.products); // Debugging
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products); // Set products if response contains an array
        } else {
          toast.error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setNewProduct({ ...newProduct, image: base64Image }); // Save base64 image in state
    };
  };

  // Handle adding a new product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.brand) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axiosInstance.post("/products/", newProduct); // Send product data to backend
      setProducts([...products, res.data.product]); // Add the new product to the list
      toast.success("Product added successfully");
      setShowAddProductModal(false); // Close the modal
      setNewProduct({ name: "", description: "", price: "", brand: "", image: null }); // Reset the form
    } catch (error) {
      console.error("Error adding product:", error.message);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen" style={{ paddingTop: "80px" }}>
      {/* Add paddingTop to account for the navbar height */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Products</h1>

      {/* Add Product Button for Admin */}
      {authUser?.role === "admin" && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAddProductModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add Product
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(products) &&
          products.map((product) => (
            <Card
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl} // Pass imageUrl to the Card component
            />
          ))}
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border rounded w-full px-4 py-2 mb-2"
            />
            <textarea
              placeholder="Product Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border rounded w-full px-4 py-2 mb-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border rounded w-full px-4 py-2 mb-2"
            />
            <input
              type="text"
              placeholder="Brand" // New input field for brand
              value={newProduct.brand}
              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
              className="border rounded w-full px-4 py-2 mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload} // Use handleImageUpload for image input
              className="border rounded w-full px-4 py-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddProductModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;