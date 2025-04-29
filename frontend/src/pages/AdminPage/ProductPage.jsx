import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios.js";
import toast from "react-hot-toast";
import Card from "./Card/productCard.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";
import { Loader } from "lucide-react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    user: "",
  });
  const { authUser } = useAuthStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        if (!authUser?._id) {
          toast.error("Please login to view products");
          return;
        }
        console.log("Fetching products for user:", authUser._id);
        const res = await axiosInstance.get(`/products/${authUser._id}`);
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Unexpected API response:", res.data);
          toast.error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [authUser]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setNewProduct({ ...newProduct, image: reader.result });
    };
  };

  const openAddProductModal = () => {
    setNewProduct({
      name: "",
      description: "",
      price: "",
      image: null,
      user: ""
    });
    setShowAddProductModal(true);
  };

  const handleAddProduct = async () => {
    const { name, description, price } = newProduct;
    if (!name || !description || !price) {
      toast.error("All fields are required");
      return;
    }
    
    try {
      setIsAddingProduct(true);
      console.log(authUser)
      const res = await axiosInstance.post("/products/", {
        ...newProduct,
        user: authUser?._id || "Unknown", 
      });
      setProducts([...products, res.data.product]);
      toast.success("Product added successfully");
      setShowAddProductModal(false);
      setNewProduct({ name: "", description: "", price: "", image: null, user: "" });
    } catch (error) {
      console.error("Error adding product:", error.message);
      toast.error("Failed to add product");
    } finally {
      setIsAddingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      console.log(productId)
      await axiosInstance.delete(`/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error.message);
      toast.error("Failed to delete product");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen" style={{ paddingTop: "80px" }}>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Products</h1>

      {authUser?.role === "admin" && (
        <div className="flex justify-end mb-4">
          <button
            onClick={openAddProductModal}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            disabled={isAddingProduct}
          >
            {isAddingProduct ? (
              <div className="flex items-center gap-2">
                <Loader className="size-4 animate-spin" />
                Adding Product...
              </div>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(products) &&
          products.map((product) => (
            <Card
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              productId={product._id}
              onProductUpdate={(updatedProduct) => {
                setProducts(products.map(p => 
                  p._id === updatedProduct._id ? updatedProduct : p
                ));
              }}
              onProductDelete={handleDeleteProduct}
            />
          ))}
      </div>

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
              disabled={isAddingProduct}
            />
            <textarea
              placeholder="Product Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border rounded w-full px-4 py-2 mb-2"
              disabled={isAddingProduct}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border rounded w-full px-4 py-2 mb-2"
              disabled={isAddingProduct}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border rounded w-full px-4 py-2 mb-4"
              disabled={isAddingProduct}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddProductModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                disabled={isAddingProduct}
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
                disabled={isAddingProduct}
              >
                {isAddingProduct ? (
                  <>
                    <Loader className="size-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
