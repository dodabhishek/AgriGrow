import React, { useState, useEffect } from "react";
import { FaFilter, FaSearch, FaTimes } from "react-icons/fa";
import ProductCard from "../Admin/Card/productCard";
import { axiosInstance } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import shopBackground from "../../assets/Images/Shop.jpg";
import Basket from "../../assets/Images/Basket.jpg";
import videoConsultations from '../../assets/videoConsultations';
import chatSubscriptions from '../../assets/chatSubscriptions';
import fieldVisits from '../../assets/fieldVisits';
import toolsAndEquipment from '../../assets/toolsAndEquipment';

// Helper to get products for selected type (move this above useState)
const getProductsByType = (type) => {
  if (type === 'consultation') return videoConsultations;
  if (type === 'chat') return chatSubscriptions;
  if (type === 'field_visit') return fieldVisits;
  if (type === 'tool') return toolsAndEquipment;
  // 'all' returns all combined, shuffled
  const all = [
    ...videoConsultations,
    ...chatSubscriptions,
    ...fieldVisits,
    ...toolsAndEquipment
  ];
  // Shuffle the array
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
};

function getPageNumbers(current, total) {
  const delta = 2; // how many neighbors to show
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l > 2) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
}

export default function Shop() {
  const [products, setProducts] = useState(getProductsByType('all'));
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
  const [selectedType, setSelectedType] = useState('all'); // New state for type filter

  const itemsPerPage = 9;
  const { authUser } = useAuthStore(); // Get the logged-in user

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res ='';
        let fetchedProducts = Array.isArray(res.data.products) ? res.data.products : [];
        // Always use dummyStoreData for demo purposes
        if (fetchedProducts.length === 0) {
          setProducts(getProductsByType('all'));
        } else {
          setProducts(fetchedProducts);
        }
        // Set initial price range based on products
        const prices = (fetchedProducts.length === 0 ? getProductsByType('all') : fetchedProducts).map(p => p.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setMinPrice(min);
        setMaxPrice(max);
        setAppliedMinPrice(min);
        setAppliedMaxPrice(max);
      } catch (error) {
        // On error, fallback to dummyStoreData
        setProducts(getProductsByType('all'));
        const prices = getProductsByType('all').map(p => p.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setMinPrice(min);
        setMaxPrice(max);
        setAppliedMinPrice(min);
        setAppliedMaxPrice(max);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // When selectedType changes, update products and price range
  useEffect(() => {
    const newProducts = getProductsByType(selectedType);
    setProducts(newProducts);
    if (newProducts.length > 0) {
      const prices = newProducts.map(p => p.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);
      setAppliedMinPrice(min);
      setAppliedMaxPrice(max);
    }
  }, [selectedType]);

  // Filter products based on price range, search term, and type
  const filteredProducts = products
    .filter((product) => 
      product.price >= appliedMinPrice && 
      product.price <= appliedMaxPrice
    )
    .filter((product) => 
      searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((product) =>
      selectedType === 'all' ||
      (selectedType === 'consultation' && product.type === 'consultation') ||
      (selectedType === 'chat' && product.type === 'chat') ||
      (selectedType === 'field_visit' && product.type === 'field_visit') ||
      (selectedType === 'tool' && (product.type === 'tool' || product.type === 'kit'))
    );
  console.log({ filteredProducts, selectedType, appliedMinPrice, appliedMaxPrice });

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

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20">
      {/* Hero Section (Service-style) */}
      <section className="relative py-24 px-6 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-emerald-100/30 to-teal-100/30"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-green-600/20 backdrop-blur-xl rounded-full -m-2"></div>
              <p className="relative text-base uppercase tracking-wider bg-green-600 px-6 py-2 rounded-full font-medium text-white">
                Our Store
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Expert Services & <span className="text-green-600">Smart Farming</span> Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with agricultural experts, get personalized consultations, and access cutting-edge farming tools to maximize your harvest potential.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src={shopBackground} alt="Shop Hero" className="w-full h-96 object-cover rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader className="size-10 animate-spin text-green-600" />
          </div>
        ) : (
          <>
            {/* Type Toggle Filter */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: 'All', value: 'all' },
                { label: 'Video Consultations', value: 'consultation' },
                { label: 'Chat Subscription', value: 'chat' },
                { label: 'Field Visits by Experts', value: 'field_visit' },
                { label: 'Tools & Equipment', value: 'tool' },
              ].map(option => (
                <button
                  key={option.value}
                  className={`px-4 py-2 rounded-full font-medium border transition-all duration-200
                    ${selectedType === option.value
                      ? 'bg-green-600 text-white border-green-600 shadow-lg'
                      : 'bg-white text-green-700 border-green-200 hover:bg-green-50'}
                  `}
                  onClick={() => setSelectedType(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Search Bar with Glassmorphism */}
            <div className="mb-12">
              <div className="relative w-full md:w-2/3 mx-auto">
                <div className="absolute inset-0 bg-white/30 backdrop-blur-lg rounded-full"></div>
                <input
                  type="text"
                  placeholder="Search fresh produce..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full p-4 pl-12 pr-12 bg-white/60 backdrop-blur border border-white/50 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700 relative z-10"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 z-20" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-20"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Sidebar for Filters with Glassmorphism */}
              <aside className="col-span-1">
                <div className="stickey top-24">
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-3xl blur-xl"></div>
                    <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-white/50 shadow-lg">
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
                            <div className="text-center text-sm font-medium text-gray-700 mt-1">
                              {formatPrice(minPrice)}
                            </div>
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
                            <div className="text-center text-sm font-medium text-gray-700 mt-1">
                              {formatPrice(maxPrice)}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                          <button 
                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-green-500/25"
                            onClick={applyPriceFilter}
                          >
                            Apply Filter
                          </button>
                          <button 
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-gray-500/25"
                            onClick={resetFilters}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                      
                      {/* Results count */}
                      <div className="mt-8 pt-6 border-t border-white/20">
                        <p className="text-sm text-gray-600">
                          Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> of <span className="font-semibold text-gray-800">{products.length}</span> products
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="col-span-1 md:col-span-3">
                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                      <div 
                        key={product._id} 
                        className="group/card relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl blur-sm transition-all duration-500 group-hover/card:blur-md"></div>
                        <div className="relative bg-white/60 backdrop-blur-lg rounded-2xl border border-white/50 shadow-lg transition-all duration-500 hover:bg-white/70 h-full flex flex-col">
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
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full">
                      <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-3xl blur-xl"></div>
                        <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl p-12 text-center border border-white/50 shadow-lg">
                          <p className="text-xl text-gray-600 mb-4">No products found matching your criteria.</p>
                          <button 
                            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25 font-medium"
                            onClick={resetFilters}
                          >
                            Reset Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pagination with Glassmorphism */}
                {totalPages > 1 && (
                  <>
                    <div className="flex justify-center items-center mt-12 space-x-2">
                      <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200
                          ${currentPage === 1 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-white text-green-600 hover:bg-green-50 hover:text-green-700 shadow'
                          }`}
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      {/* Fixed size pagination: show 5 pages, moving window */}
                      {(() => {
                        const pageWindow = 5;
                        let start = Math.max(1, currentPage - Math.floor(pageWindow / 2));
                        let end = start + pageWindow - 1;
                        if (end > totalPages) {
                          end = totalPages;
                          start = Math.max(1, end - pageWindow + 1);
                        }
                        const pages = [];
                        for (let num = start; num <= end; num++) {
                          pages.push(num);
                        }
                        return pages.map((num) => (
                          <button
                            key={num}
                            className={`w-10 h-10 flex items-center justify-center rounded-xl font-semibold transition-all duration-200
                              ${currentPage === num 
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105' 
                                : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 shadow'
                              }`}
                            onClick={() => setCurrentPage(num)}
                            aria-current={currentPage === num ? 'page' : undefined}
                          >
                            {num}
                          </button>
                        ));
                      })()}
                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200
                          ${currentPage === totalPages 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-white text-green-600 hover:bg-green-50 hover:text-green-700 shadow'
                          }`}
                        aria-label="Next page"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                    <div className="text-center text-sm text-gray-500 mt-2">
                      Page {currentPage} of {totalPages}
                    </div>
                  </>
                )}
              </main>
            </div>
          </>
        )}
      </div>

      {/* Product Details Popup with Glassmorphism */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="relative w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-hidden animate-slideUp">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-y-auto">
              <div className="relative">
                {/* Close button */}
                <button 
                  onClick={closeProductPopup}
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300 z-10"
                >
                  <FaTimes className="text-gray-600" />
                </button>
                
                {/* Product Image */}
                <div className="h-64 md:h-80 w-full overflow-hidden">
                  <img 
                    src={selectedProduct.imageUrl || Basket} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                </div>
                
                {/* Product Details */}
                <div className="p-8">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3 animate-fadeIn">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-3xl font-bold text-green-600 mb-6 animate-fadeIn">
                    {formatPrice(selectedProduct.price)}
                  </p>

                  {/* Important Details */}
                  <div className="mb-4 space-y-2">
                    {selectedProduct.expertName && (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Expert:</span>
                        <span>{selectedProduct.expertName}</span>
                      </div>
                    )}
                    {selectedProduct.duration && (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Duration:</span>
                        <span>{selectedProduct.duration}</span>
                      </div>
                    )}
                    {selectedProduct.rating && (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Rating:</span>
                        <span>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} style={{ color: i < Math.round(selectedProduct.rating) ? '#fbbf24' : '#d1d5db' }}>★</span>
                          ))}
                          <span className="ml-1 text-gray-600">({selectedProduct.reviews || 0} reviews)</span>
                        </span>
                      </div>
                    )}
                    {selectedProduct.features && (
                      <div>
                        <span className="font-semibold">Features:</span>
                        <ul className="list-disc ml-6">
                          {selectedProduct.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedProduct.kitContents && (
                      <div>
                        <span className="font-semibold">Kit Contents:</span>
                        <ul className="list-disc ml-6">
                          {selectedProduct.kitContents.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {selectedProduct.description && (
                    <div className="mt-4">
                      <span className="block text-sm font-semibold text-gray-700 mb-1">Description:</span>
                      <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                    </div>
                  )}
                  
                  {/* Add to Cart Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => handleAddToCart(selectedProduct._id)}
                      disabled={isAddingToCart}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/25 font-medium"
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
        </div>
      )}
    </div>
  );
}