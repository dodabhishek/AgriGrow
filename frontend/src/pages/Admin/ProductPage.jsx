import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import Card from "./Card/productCard";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader, ChevronLeft, ChevronRight, Plus, Package, Search, X } from "lucide-react";
import { FaSearch, FaTimes } from "react-icons/fa";
import shopBackground from "../../assets/Images/shopBackground.jpg";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();
  const fromSection = location.state?.fromSection || "all";
  const handleBack = () => navigate(`/shop`, { state: { selectedType: fromSection } });
  const [selectedType, setSelectedType] = useState(location.state?.selectedType || "all");

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-100/50 to-teal-100/50 backdrop-blur-xl rounded-full -m-4"></div>
            <div className="relative bg-white/20 p-8 rounded-full border border-white/50 shadow-lg">
              <Loader className="size-12 animate-spin text-green-600" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading your products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20">
      {/* Hero Section - Match Shop Page */}
      <div className="relative h-[500px] mb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={shopBackground} 
            alt="Product Management Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-emerald-800/60 to-transparent"></div>
        </div>
        <div className="relative h-full max-w-6xl ml-4 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Manage Your <span className="text-green-300">Products</span>
            </h1>
            <p className="text-xl text-green-50 leading-relaxed">
              Organize, track, and showcase your farm's finest products with our comprehensive management system. Empower your business with AgriGrow.
            </p>
            <div className="pt-4">
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-3 group">
                <span className="text-lg font-medium">Add New Product</span>
                <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Search and Add Product Section */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* Search Bar */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-2xl"></div>
                  <div className="relative bg-white/20 p-4 rounded-2xl border border-white/50 shadow-lg">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products by name or description..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full p-4 pl-12 pr-12 border-2 border-white/50 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-500"
                      />
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Product Button */}
              {authUser?.role === "admin" && (
                <div className="flex justify-center lg:justify-end">
                  <button
                    onClick={openAddProductModal}
                    className="group relative overflow-hidden"
                    disabled={isAddingProduct}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl -z-10"></div>
                    <div className="px-8 py-4 text-white relative z-10 rounded-2xl flex items-center gap-3 text-lg font-medium group-hover:bg-white/10 transition-all shadow-lg hover:shadow-xl">
                      <Plus className="group-hover:rotate-90 transition-transform" size={24} />
                      {isAddingProduct ? (
                        <div className="flex items-center gap-2">
                          <Loader className="size-5 animate-spin" />
                          Adding...
                        </div>
                      ) : (
                        "Add Product"
                      )}
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-12">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-100/50 to-teal-100/50 backdrop-blur-xl rounded-full -m-4"></div>
                  <div className="relative bg-white/20 p-8 rounded-full border border-white/50 shadow-lg">
                    <Package className="size-16 text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Products Found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {searchTerm ? "No products match your search criteria." : "Start by adding your first agricultural product to showcase your farm's offerings."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      onClick={() => navigate(`/shop/product/${product._id}`, { state: { product: product, fromSection: selectedType } })}
                    />
                  ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-3">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  currentPage === 1 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-white/80 backdrop-blur-sm text-green-600 hover:bg-white shadow-lg hover:shadow-xl border border-white/50"
                }`}
              >
                <ChevronLeft size={24} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  className={`w-12 h-12 rounded-xl transition-all duration-300 ${
                    currentPage === num 
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg" 
                      : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-lg hover:shadow-xl border border-white/50"
                  }`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  currentPage === totalPages 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-white/80 backdrop-blur-sm text-green-600 hover:bg-white shadow-lg hover:shadow-xl border border-white/50"
                }`}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-3xl -m-2"></div>
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isAddingProduct}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full p-4 border-2 border-white/50 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-500"
                    disabled={isAddingProduct}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Enter product description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    rows={3}
                    className="w-full p-4 border-2 border-white/50 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-500 resize-none"
                    disabled={isAddingProduct}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full p-4 border-2 border-white/50 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700 placeholder-gray-500"
                    disabled={isAddingProduct}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-4 border-2 border-white/50 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:bg-green-700"
                    disabled={isAddingProduct}
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="flex-1 p-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  disabled={isAddingProduct}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="flex-1 p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                  disabled={isAddingProduct}
                >
                  {isAddingProduct ? (
                    <>
                      <Loader className="size-5 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
