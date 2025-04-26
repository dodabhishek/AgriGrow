import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import ProductCard from "./AdminPage/Card/productCard"; // Import the ProductCard component

export default function Shop() {
  const products = [
    { name: "Apples", price: 50, image: "/src/Images/Apple.jpg", category: "Fresh Vegetables" },
    { name: "Bananas", price: 20, image: "/src/Images/bananas.jpg", category: "Fruits" },
    { name: "Carrot", price: 50, image: "/src/Images/carrot.jpg", category: "Fresh Vegetables" },
    { name: "Garlic", price: 20, image: "/src/Images/garlic.jpg", category: "Organic Food" },
    { name: "Grapes", price: 100, image: "/src/Images/grapes.jpg", category: "Fruits" },
    { name: "Lettuce", price: 50, image: "/src/Images/lettuce.jpg", category: "Fresh Vegetables" },
    { name: "Tomatoes", price: 40, image: "/src/Images/tomatoes.jpg", category: "Fresh Vegetables" },
    { name: "Cucumber", price: 30, image: "/src/Images/cucumber.jpg", category: "Fresh Vegetables" },
    { name: "Pumpkin", price: 60, image: "/src/Images/pumpkin.jpg", category: "Fresh Vegetables" },
    { name: "Broccoli", price: 80, image: "/src/Images/broccoli.jpg", category: "Fresh Vegetables" },
    { name: "Bell Pepper", price: 70, image: "/src/Images/bell_pepper.jpg", category: "Fresh Vegetables" },
    { name: "Spinach", price: 40, image: "/src/Images/spinach.jpg", category: "Fresh Vegetables" },
    { name: "Mushrooms", price: 90, image: "/src/Images/mushrooms.jpg", category: "Organic Food" },
    { name: "Sweet Corn", price: 50, image: "/src/Images/sweet_corn.jpg", category: "Organic Food" },
    { name: "Radish", price: 25, image: "/src/Images/radish.jpg", category: "Fresh Vegetables" },
    { name: "Peas", price: 35, image: "/src/Images/peas.jpg", category: "Fresh Vegetables" },
    { name: "Cabbage", price: 45, image: "/src/Images/cabbage.jpg", category: "Fresh Vegetables" },
    { name: "Eggplant", price: 55, image: "/src/Images/eggplant.jpg", category: "Fresh Vegetables" }
  ];

  const categories = ["All", "Agriculture", "Farming", "Fresh Vegetables", "Harvest", "Organic Food"];

  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [appliedPriceRange, setAppliedPriceRange] = useState([0, 100]);
  const [quantities, setQuantities] = useState({}); // Track quantities for each product

  const itemsPerPage = 9;

  const authUser = { role: "user" }; // Simulate the authUser role

  const filteredProducts = products
    .filter(product => product.price >= appliedPriceRange[0] && product.price <= appliedPriceRange[1])
    .filter(product => selectedCategory === "All" || product.category === selectedCategory);

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const applyPriceFilter = () => {
    setAppliedPriceRange(priceRange);
  };

  const handleIncrease = (productName, productPrice) => {
    setQuantities((prev) => ({
      ...prev,
      [productName]: {
        quantity: (prev[productName]?.quantity || 0) + 1,
        totalPrice: (prev[productName]?.totalPrice || 0) + productPrice,
      },
    }));
  };

  const handleDecrease = (productName, productPrice) => {
    setQuantities((prev) => {
      const currentQuantity = prev[productName]?.quantity || 0;
      if (currentQuantity > 0) {
        return {
          ...prev,
          [productName]: {
            quantity: currentQuantity - 1,
            totalPrice: prev[productName]?.totalPrice - productPrice,
          },
        };
      }
      return prev;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-0 p-6">
      <div className="text-center py-10">
        <img src="/images/ShopHeader.jpg" alt="Shop Header" className="w-full mx-auto" />
      </div>

      <div className="grid grid-cols-4 gap-6">
        <aside className="col-span-1 border p-4 rounded-lg">
          <aside className="col-span-1 border p-4 rounded-lg mb-6">
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
          </aside>

          <h3 className="font-bold mb-2">Categories</h3>
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                className={`cursor-pointer p-2 border-b last:border-none ${
                  selectedCategory === category ? 'font-bold text-green-600' : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        <main className="col-span-3">
          <div className="grid grid-cols-3 gap-6">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductCard
                  key={product.name}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  quantity={quantities[product.name]?.quantity || 0}
                  totalPrice={quantities[product.name]?.totalPrice || 0}
                  onIncrease={() => handleIncrease(product.name, product.price)}
                  onDecrease={() => handleDecrease(product.name, product.price)}
                  showControls={authUser.role === "user"} // Show + and - buttons only for users
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">No products found.</p>
            )}
          </div>

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