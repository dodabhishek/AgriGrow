import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import Card from "./Card/productCard";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader, ChevronLeft, ChevronRight } from "lucide-react";
import { FaSearch, FaTimes } from "react-icons/fa";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    user: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
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

  // Filter products based on search term
  const filteredProducts = products.filter((product) => 
    searchTerm === "" || 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Paginate the filtered products
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
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

      {/* Search Bar */}
      <div className="mb-12  p-4 rounded-xl ">
        <div className="relative w-full md:w-2/3 mx-auto">
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-4 pl-12 pr-4 border-2 border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

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
        {Array.isArray(paginatedProducts) &&
          paginatedProducts.map((product) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-3">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${
              currentPage === 1 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-green-600 hover:bg-green-50 shadow-sm hover:shadow-md"
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`w-10 h-10 rounded-full ${
                currentPage === num 
                  ? "bg-green-600 text-white shadow-md" 
                  : "bg-white text-gray-700 hover:bg-green-50 shadow-sm hover:shadow-md"
              }`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
          
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${
              currentPage === totalPages 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-white text-green-600 hover:bg-green-50 shadow-sm hover:shadow-md"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

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
