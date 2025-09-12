import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import Card from "./Card/productCard";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader, ChevronLeft, ChevronRight, Plus, Package, Search, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
// Make sure to have a background image at this path
import shopBackground from '../../assets/Images/shopBackground.jpg'; 

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        if (!authUser?._id) {
          toast.error("Please login to view products");
          return;
        }
        const res = await axiosInstance.get(`/products/${authUser._id}`);
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          toast.error("Unexpected API response format");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [authUser]);

  const filteredProducts = products.filter((product) =>
    searchTerm === "" ||
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setNewProduct({ ...newProduct, image: reader.result });
  };

  const openAddProductModal = () => {
    setNewProduct({ name: "", description: "", price: "", image: null, user: "" });
    setShowAddProductModal(true);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price) {
      return toast.error("All fields are required");
    }
    try {
      setIsAddingProduct(true);
      const res = await axiosInstance.post("/products/", { ...newProduct, user: authUser._id });
      setProducts([res.data.product, ...products]);
      toast.success("Product added successfully");
      setShowAddProductModal(false);
    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setIsAddingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axiosInstance.delete(`/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };
  
  const handleProductUpdate = (updatedProduct) => {
    setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
  };

  const SkeletonCard = () => (
    <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-4 animate-pulse h-80">
      <div className="w-full h-3/5 bg-gray-200 rounded-xl mb-4"></div>
      <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded-xl w-full"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
                <Loader className="size-10 animate-spin" />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative h-[450px] mb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={shopBackground} 
            alt="Product Management Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-emerald-800/60 to-transparent"></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-center md:text-left">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Manage Your <span className="text-green-300">Products</span>
            </h1>
            <p className="text-xl text-green-50 leading-relaxed">
              Organize, track, and showcase your farm's finest products with our comprehensive management system.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-700 placeholder-gray-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            <button
              onClick={openAddProductModal}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
              disabled={isAddingProduct}
            >
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          </div>

          <div>
            {paginatedProducts.length === 0 && !isLoading ? (
              <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-teal-100/50 rounded-full -m-3"></div>
                  <div className="relative bg-white/50 p-6 rounded-full border border-white">
                    <Package className="size-12 text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {searchTerm ? "No Products Found" : "Your inventory is empty"}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  {searchTerm ? "Try adjusting your search." : "Get started by adding your first product."}
                </p>
                {!searchTerm && (
                    <button
                        onClick={openAddProductModal}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-xl hover:shadow-lg transition-all transform hover:scale-105 mx-auto"
                    >
                        <Plus size={20} />
                        <span>Add Your First Product</span>
                    </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading 
                  ? Array.from({ length: itemsPerPage }).map((_, index) => (
                      <SkeletonCard key={index} />
                    ))
                  : paginatedProducts.map((product) => (
                    <div key={product._id} className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <Card
                        {...product}
                        onProductUpdate={handleProductUpdate}
                        onProductDelete={handleDeleteProduct}
                        onClick={() => navigate(`/shop/product/${product._id}`, { state: { product } })}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <nav className="flex justify-center items-center space-x-2">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="p-3 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md border border-white/50 transition"
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  className={`w-10 h-10 rounded-xl transition-all ${
                    currentPage === num
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg"
                      : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md border border-white/50"
                  }`}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="p-3 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md border border-white/50 transition"
              >
                <ChevronRight size={20} />
              </button>
            </nav>
          )}
        </div>
      </main>

      {showAddProductModal && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
              <button onClick={() => setShowAddProductModal(false)} className="p-2 text-gray-400 hover:text-gray-600" disabled={isAddingProduct}>
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
                {['name', 'description', 'price'].map((field) => (
                    <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field === 'price' ? 'Price (₹)' : field}</label>
                        {field === 'description' ? (
                            <textarea
                                placeholder={`Enter product ${field}`}
                                value={newProduct[field]}
                                onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
                                rows={3}
                                className="w-full p-3 border border-gray-300 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                                disabled={isAddingProduct}
                            />
                        ) : (
                            <input
                                type={field === 'price' ? 'number' : 'text'}
                                placeholder={`Enter product ${field}`}
                                value={newProduct[field]}
                                onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-500"
                                disabled={isAddingProduct}
                            />
                        )}
                    </div>
                ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                  disabled={isAddingProduct}
                />
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setShowAddProductModal(false)} className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium" disabled={isAddingProduct}>
                Cancel
              </button>
              <button onClick={handleAddProduct} className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg font-medium flex items-center justify-center gap-2" disabled={isAddingProduct}>
                {isAddingProduct ? <><Loader className="size-5 animate-spin" /> Adding...</> : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;