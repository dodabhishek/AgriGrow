import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import ProductCard from "./AdminPage/Card/productCard"; // Import the ProductCard component
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore"; // Import auth store to get the logged-in user

export default function Shop() {
  const [products, setProducts] = useState([]); // State to store products
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [appliedPriceRange, setAppliedPriceRange] = useState([0, 100]);
  const [quantities, setQuantities] = useState({}); // Track quantities for each product

  const itemsPerPage = 9;
  const { authUser } = useAuthStore(); // Get the logged-in user

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  // Dynamically generate categories from products
  const categories = ["All", ...new Set(products.map((product) => product.category || "Uncategorized"))];

  // Filter products based on price range and selected category
  const filteredProducts = products
    .filter((product) => product.price >= appliedPriceRange[0] && product.price <= appliedPriceRange[1])
    .filter((product) => selectedCategory === "All" || product.category === selectedCategory);

  // Paginate the filtered products
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Apply the price filter
  const applyPriceFilter = () => {
    setAppliedPriceRange(priceRange);
  };

  // Handle adding a product to the cart
  const handleAddToCart = async (productId) => {
    try {
      const response = await axiosInstance.post("/add-to-cart", {
        userId: authUser._id, // Pass the logged-in user's ID
        productId, // Pass the product ID
      });
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-0 p-6">
      {/* Shop Header */}
      <div className="text-center py-10">
        <img src="/images/ShopHeader.jpg" alt="Shop Header" className="w-full mx-auto" />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar for Filters */}
        <aside className="col-span-1 border p-4 rounded-lg">
          {/* Price Filter */}
          <div className="border p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-2">Price</h3>
            <div className="flex justify-between text-sm">
              <span>Min: ${priceRange[0]}</span>
              <span>Max: ${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full mt-2"
            />
            <input
              type="range"
              min={priceRange[0]}
              max="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full mt-2"
            />
            <button className="mt-2 w-full bg-green-500 text-white p-2 rounded" onClick={applyPriceFilter}>
              Apply
            </button>
          </div>

          {/* Category Filter */}
          <h3 className="font-bold mb-2">Categories</h3>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer p-2 border-b last:border-none ${
                  selectedCategory === category ? "font-bold text-green-600" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="col-span-3">
          {/* Product Grid */}
          <div className="grid grid-cols-3 gap-6">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  productId={product._id} // Pass the product ID
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl} // Use imageUrl from the backend
                  onAddToCart={() => handleAddToCart(product._id)} // Handle Add to Cart
                  showControls={true} // Show + and - buttons
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">No products found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-4 mt-6">
            {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`p-2 ${currentPage === num ? "bg-green-500 text-white" : "bg-gray-200"}`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}