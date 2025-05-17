import React, { useState, useEffect } from "react";
import { FaFilter, FaSearch, FaTimes } from "react-icons/fa";
import ProductCard from "../Admin/Card/productCard";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

export default function Shop() {
  const [products, setProducts] = useState([]); // State to store products
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [appliedMinPrice, setAppliedMinPrice] = useState(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantities, setQuantities] = useState({}); // Track quantities for each product
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Add search term state
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for popup
  const [isAddingToCart, setIsAddingToCart] = useState(false); // Track if product is being added to cart

  const itemsPerPage = 9;
  const { authUser } = useAuthStore(); // Get the logged-in user

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/products");
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
          // Set initial price range based on products
          const prices = res.data.products.map(p => p.price);
          const min = Math.min(...prices);
          const max = Math.max(...prices);
          setMinPrice(min);
          setMaxPrice(max);
          setAppliedMinPrice(min);
          setAppliedMaxPrice(max);
        } else {
          console.error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on price range and search term
  const filteredProducts = products
    .filter((product) => 
      product.price >= appliedMinPrice && 
      product.price <= appliedMaxPrice
    )
    .filter((product) => 
      searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  // Paginate the filtered products
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Apply the price filter
  const applyPriceFilter = () => {
    console.log('Applying filter:', { minPrice, maxPrice });
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
    setCurrentPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    const prices = products.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    console.log('Resetting filters:', { min, max });
    setMinPrice(min);
    setMaxPrice(max);
    setAppliedMinPrice(min);
    setAppliedMaxPrice(max);
    setCurrentPage(1);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Handle price range change
  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    console.log('Min price changed:', { value, maxPrice });
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    console.log('Max price changed:', { value, minPrice });
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  // Handle adding a product to the cart
  const handleAddToCart = async (productId) => {
    try {
      setIsAddingToCart(true);
      const response = await axiosInstance.post("/add-to-cart", {
        userId: authUser._id, // Pass the logged-in user's ID
        productId, // Pass the product ID
      });
      console.log(response.data.message); // Log success message
      // Close the popup after adding to cart
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Handle product click to show details
  const handleProductClick = (product) => {
    console.log("Product clicked:", product);
    setSelectedProduct(product);
  };

  // Close product details popup
  const closeProductPopup = () => {
    setSelectedProduct(null);
  };

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

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      
      
      <div className="container mx-auto px-4 py-12 mt-10">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader className="size-10 animate-spin text-green-600" />
          </div>
        ) : (
          <>
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {/* Sidebar for Filters */}
              <aside className="col-span-1">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-4 border border-gray-100">
                  <h3 className="font-bold text-xl mb-6 flex items-center text-gray-800">
                    <FaFilter className="mr-2 text-green-600" />
                    Filters
                  </h3>
                  
                  {/* Price Filter */}
                  <div className="mb-8">
                    <h4 className="font-semibold mb-4 text-gray-700">Price Range</h4>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-600">Min: {formatPrice(minPrice)}</span>
                      <span className="text-gray-600">Max: {formatPrice(maxPrice)}</span>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Minimum Price</label>
                        <input
                          type="range"
                          min={0}
                          max={maxPrice}
                          value={minPrice}
                          onChange={handleMinPriceChange}
                          className="w-full accent-green-600"
                        />
                        <div className="text-center text-sm font-medium text-gray-700 mt-1">{formatPrice(minPrice)}</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Maximum Price</label>
                        <input
                          type="range"
                          min={minPrice}
                          max={Math.max(...products.map(p => p.price))}
                          value={maxPrice}
                          onChange={handleMaxPriceChange}
                          className="w-full accent-green-600"
                        />
                        <div className="text-center text-sm font-medium text-gray-700 mt-1">{formatPrice(maxPrice)}</div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button 
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                        onClick={applyPriceFilter}
                      >
                        Apply Filter
                      </button>
                      <button 
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                        onClick={resetFilters}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  
                  {/* Results count */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> of <span className="font-semibold text-gray-800">{products.length}</span> products
                    </p>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="col-span-1 md:col-span-3">
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                      <div 
                        key={product._id} 
                        className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full flex"
                      >
                        <ProductCard
                          productId={product._id}
                          name={product.name}
                          price={product.price}
                          imageUrl={product.imageUrl}
                          description={product.description}
                          onAddToCart={() => handleAddToCart(product._id)}
                          showControls={true}
                          onImageClick={() => handleProductClick(product)}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
                      <p className="text-xl text-gray-500 mb-4">No products found matching your criteria.</p>
                      <button 
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm hover:shadow-md font-medium"
                        onClick={resetFilters}
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
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
              </main>
            </div>
          </>
        )}
      </div>

      {/* Product Details Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="relative">
              {/* Close button */}
              <button 
                onClick={closeProductPopup}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors z-10"
              >
                <FaTimes className="text-gray-600" />
              </button>
              
              {/* Product Image */}
              <div className="h-64 md:h-80 w-full overflow-hidden rounded-t-xl">
                <img 
                  src={selectedProduct.imageUrl || "/images/Basket.jpg"} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Details */}
              <div className="p-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3 animate-fadeIn">
                  {selectedProduct.name}
                </h2>
                <p className="text-3xl font-bold text-emerald-600 mb-6 animate-fadeIn">
                  {formatPrice(selectedProduct.price)}
                </p>
                <div className="bg-gray-50 rounded-xl p-6 animate-fadeIn">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProduct.description || "No description available."}
                  </p>
                </div>
                
                {/* Add to Cart Button */}
                <div className="mt-6">
                  <button
                    onClick={() => handleAddToCart(selectedProduct._id)}
                    disabled={isAddingToCart}
                    className="w-full bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg font-medium"
                  >
                    {isAddingToCart ? (
                      <>
                        <Loader className="size-5 animate-spin" />
                        Adding to Cart...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="size-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}