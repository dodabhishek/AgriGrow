import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Search, Filter, BookOpen, Sparkles } from 'lucide-react';
import OrganicProducts from "../../assets/Images/OrganicProducts.jpg";
import healthyFood from "../../assets/Images/healthy-food.jpg";
import farmer1 from "../../assets/Images/farmer1.jpg";
import farmer2 from "../../assets/Images/farmer2.jpg";
import Basket from "../../assets/Images/Basket.jpg";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Benefits of Organic Farming: Why It Matters for Your Health",
      excerpt: "Discover how organic farming practices not only benefit the environment but also provide superior nutritional value for your family's health.",
      content: `Organic farming has been gaining popularity for good reasons. Unlike conventional farming, organic methods avoid synthetic pesticides and fertilizers, which can leave harmful residues on your food. Studies have shown that organic produce often contains higher levels of antioxidants and essential nutrients.

When you choose organic, you're not just making a choice for your health—you're supporting farming practices that protect soil health, reduce water pollution, and promote biodiversity. Our farmers use natural methods like crop rotation, composting, and beneficial insects to maintain healthy, productive fields.

The difference is noticeable in taste too. Many customers report that organic vegetables have more vibrant flavors and better texture. This is because organic plants develop stronger root systems and natural defenses, leading to more robust and flavorful produce.`,
      author: "Dr. Sarah Green",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "health",
      image: OrganicProducts,
      tags: ["organic", "health", "nutrition"]
    },
    {
      id: 2,
      title: "Seasonal Eating: What's Fresh This Month",
      excerpt: "Learn about the seasonal vegetables and fruits that are at their peak freshness and nutritional value this month.",
      content: `Eating seasonally is one of the best ways to ensure you're getting the freshest, most nutritious produce available. When fruits and vegetables are in season, they're typically harvested at peak ripeness, which means maximum flavor and nutritional content.

This month, we're excited to offer a variety of seasonal delights. From crisp winter greens like spinach and kale to root vegetables like carrots and sweet potatoes, there's no shortage of delicious options. Seasonal eating also supports local farmers and reduces the environmental impact of long-distance food transportation.

Our farmers carefully plan their crop rotations to ensure a steady supply of fresh produce throughout the year. By choosing seasonal items, you're not only getting better quality food but also helping to maintain sustainable farming practices in your community.`,
      author: "Chef Michael Chen",
      date: "2024-01-12",
      readTime: "4 min read",
      category: "seasonal",
      image: healthyFood,
      tags: ["seasonal", "fresh", "local"]
    },
    {
      id: 3,
      title: "Sustainable Agriculture: How Our Farmers Protect the Environment",
      excerpt: "Explore the innovative sustainable farming techniques our partner farmers use to protect the environment while producing high-quality organic food.",
      content: `Sustainability is at the heart of everything we do. Our partner farmers implement cutting-edge sustainable agriculture practices that go beyond just avoiding synthetic chemicals. They use techniques like cover cropping, which helps prevent soil erosion and improves soil fertility naturally.

Water conservation is another critical aspect of our sustainable approach. Our farmers use drip irrigation systems and rainwater harvesting to minimize water waste. They also practice crop diversity, which helps maintain healthy soil ecosystems and reduces the risk of pest outbreaks.

By supporting sustainable agriculture, you're helping to preserve our planet for future generations. These practices not only produce healthier food but also help combat climate change by sequestering carbon in the soil and reducing greenhouse gas emissions from conventional farming methods.`,
      author: "Environmental Scientist Dr. Lisa Patel",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "sustainability",
      image: farmer1,
      tags: ["sustainability", "environment", "farming"]
    },
    {
      id: 4,
      title: "From Farm to Table: The Journey of Your Fresh Produce",
      excerpt: "Follow the fascinating journey of how your vegetables travel from our carefully tended fields directly to your dinner table.",
      content: `Ever wondered how your fresh vegetables make it from the farm to your table? The journey is carefully orchestrated to ensure maximum freshness and quality. Our farmers harvest produce early in the morning when temperatures are cool, which helps preserve flavor and nutritional content.

After harvesting, vegetables are quickly cooled and carefully packaged to maintain their freshness. Our efficient logistics system ensures that produce reaches our distribution centers within hours of being picked. From there, it's delivered to your local market or directly to your doorstep.

This rapid farm-to-table process means you're getting vegetables that are not only fresh but also packed with maximum nutritional value. Unlike produce that travels long distances and sits in storage, our locally sourced vegetables retain their natural flavors and health benefits.`,
      author: "Supply Chain Expert Maria Rodriguez",
      date: "2024-01-08",
      readTime: "4 min read",
      category: "supply-chain",
      image: Basket,
      tags: ["fresh", "local", "quality"]
    },
    {
      id: 5,
      title: "Healthy Recipes: Quick and Easy Organic Meal Ideas",
      excerpt: "Discover delicious, nutritious recipes that make the most of your fresh organic produce and can be prepared in under 30 minutes.",
      content: `Cooking with fresh, organic ingredients doesn't have to be complicated or time-consuming. We've gathered some of our favorite quick and healthy recipes that showcase the natural flavors of organic produce. From vibrant salads to hearty soups, these recipes are designed to be both nutritious and delicious.

One of our most popular recipes is the Rainbow Vegetable Stir-Fry, which combines seasonal vegetables with aromatic herbs and spices. It's not only colorful and appealing but also packed with essential vitamins and minerals. Another favorite is the Organic Greens Smoothie, perfect for a quick breakfast or post-workout refreshment.

These recipes are designed to be flexible, allowing you to substitute ingredients based on what's available seasonally. This approach not only reduces food waste but also ensures you're always cooking with the freshest ingredients available.`,
      author: "Nutritionist Emma Thompson",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "recipes",
      image: healthyFood,
      tags: ["recipes", "healthy", "quick-meals"]
    },
    {
      id: 6,
      title: "The Future of Farming: Technology Meets Tradition",
      excerpt: "Learn how modern technology is being integrated with traditional farming wisdom to create more efficient and sustainable agricultural practices.",
      content: `The future of farming is here, and it's a beautiful blend of cutting-edge technology and time-tested traditional wisdom. Our farmers are embracing innovative solutions like precision agriculture, which uses sensors and data analytics to optimize water and fertilizer usage.

Smart irrigation systems monitor soil moisture levels and automatically adjust watering schedules, ensuring plants get exactly what they need without waste. Drones are used for crop monitoring, helping farmers identify potential issues before they become problems.

But technology doesn't replace the human touch. Our farmers still rely on generations of accumulated knowledge about soil health, crop rotation, and natural pest management. This combination of old and new creates farming practices that are both efficient and environmentally responsible.

The result is higher yields, better quality produce, and reduced environmental impact—all while maintaining the personal care and attention that makes organic farming special.`,
      author: "Agricultural Technology Specialist James Wilson",
      date: "2024-01-03",
      readTime: "5 min read",
      category: "technology",
      image: farmer2,
      tags: ["technology", "innovation", "farming"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', icon: BookOpen },
    { id: 'health', name: 'Health & Nutrition', icon: Sparkles },
    { id: 'seasonal', name: 'Seasonal Eating', icon: Calendar },
    { id: 'sustainability', name: 'Sustainability', icon: Sparkles },
    { id: 'supply-chain', name: 'Farm to Table', icon: ArrowRight },
    { id: 'recipes', name: 'Recipes', icon: BookOpen },
    { id: 'technology', name: 'Technology', icon: Sparkles }
  ];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 bg-gradient-to-r from-green-600/90 via-emerald-600/90 to-green-600/90 backdrop-blur-sm overflow-hidden">
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        
        <div className="relative container mx-auto px-5 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Our Blog
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto drop-shadow-md">
              Discover insights about organic farming, healthy eating, and sustainable agriculture
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-5 py-8 relative z-10">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/30 shadow-green-500/10">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 py-4 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 appearance-none cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-5 pb-16 relative z-10">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 border border-white/30 shadow-xl">
              <div className="text-gray-500 text-lg mb-4">No articles found</div>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article key={post.id} className="group">
                <div className="relative">
                  {/* Glassmorphism Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 h-full flex flex-col group-hover:scale-[1.02] group-hover:-translate-y-2">
                    {/* Post Image */}
                    <div className="relative overflow-hidden" style={{ height: '220px' }}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-green-700 text-sm rounded-full font-medium shadow-lg border border-white/30">
                          {categories.find(cat => cat.id === post.category)?.name}
                        </span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Post Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>

                      {/* Post Meta */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <User className="size-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <Calendar className="size-3" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                            <Clock className="size-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-green-100/80 backdrop-blur-sm text-green-700 text-xs rounded-full border border-green-200/50 shadow-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More Button */}
                      <button className="flex items-center gap-3 text-green-600 hover:text-green-700 font-medium text-sm transition-all duration-300 group/btn bg-white/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/30 hover:bg-white/70 hover:shadow-lg self-start">
                        <span>Read Full Article</span>
                        <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="relative bg-gradient-to-r from-green-600/90 via-emerald-600/90 to-green-600/90 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        
        <div className="container mx-auto px-5 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
              <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
                Stay Updated with Our Latest Articles
              </h2>
              <p className="text-xl text-green-100 mb-10 drop-shadow-md">
                Get notified when we publish new articles about organic farming, healthy recipes, and sustainable living.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1 relative group">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="relative w-full px-6 py-4 bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-500"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <button className="relative px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-medium rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/30 hover:shadow-lg">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 