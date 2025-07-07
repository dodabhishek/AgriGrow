import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Search, Filter } from 'lucide-react';
import OrganicProducts from "../../assets/Images/OrganicProducts.jpg";
import healthyFood from "../../assets/Images/healthy-food.jpg";
import farmer1 from '../../assets/Images/Blog/1.jpg';
import farmer2 from '../../assets/Images/Blog/2.jpeg'
import Basket from "../../assets/Images/Blog/3.jpg";
import blogBackground from '../../assets/Images/shopBackground.jpg'; // Use the same or a similar image as Shop
import blogHeroImg from '../../assets/Images/blog.jpg'; // Use a suitable blog hero image

const blogPosts = [
  {
    id: 1,
    title: "The Benefits of Organic Farming: Why It Matters for Your Health",
    excerpt: "Discover how organic farming practices not only benefit the environment but also provide superior nutritional value for your family's health.",
    image: healthyFood,
    category: "Health & Nutrition",
    author: "Dr. Priya Patel",
    date: "June 10, 2024",
    readTime: 4
  },
  {
    id: 2,
    title: "Seasonal Eating: What's Fresh This Month",
    excerpt: "Learn about the seasonal vegetables and fruits that are at their peak freshness and nutritional value this month.",
    image: farmer2,
    category: "Seasonal Eating",
    author: "Chef Michael",
    date: "June 8, 2024",
    readTime: 3
  },
  {
    id: 3,
    title: "Sustainable Agriculture: How Our Farmers Protect the Environment",
    excerpt: "Explore the innovative sustainable farming techniques our partner farmers use to protect the environment while producing high-quality organic food.",
    image: farmer1,
    category: "Sustainability",
    author: "Marcus Rodriguez",
    date: "June 5, 2024",
    readTime: 5
  },
  {
    id: 4,
    title: "Organic vs. Conventional: What's the Real Difference?",
    excerpt: "A deep dive into the differences between organic and conventional farming, and what it means for your health and the planet.",
    image: OrganicProducts,
    category: "Organic Farming",
    author: "Dr. Sarah Chen",
    date: "June 2, 2024",
    readTime: 6
  },
  {
    id: 5,
    title: "Farm-to-Table: The Journey of Your Food",
    excerpt: "Follow the journey of fresh produce from our partner farms to your table, and learn why local sourcing matters.",
    image: Basket,
    category: "Farm-to-Table",
    author: "Priya Patel",
    date: "May 30, 2024",
    readTime: 4
  },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filtered posts
  const filteredPosts = blogPosts.filter(post =>
    (selectedCategory === 'all' || post.category === selectedCategory) &&
    (searchQuery === '' || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
                Our Blog
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Insights & Stories from <span className="text-green-600">Our Community</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the latest in organic farming, healthy eating, and sustainable agriculture from our experts and community.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src={blogHeroImg} alt="Blog Hero" className="w-full h-96 object-cover rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <div className="container mx-auto px-4 mb-10">
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white/70 backdrop-blur-lg rounded-2xl shadow p-4">
          <div className="flex items-center flex-grow w-full">
            <Search className="text-green-500 mr-2" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 font-medium
                ${selectedCategory === 'all' ? 'bg-green-600 text-white border-green-600 shadow' : 'bg-white text-green-700 border-green-200 hover:bg-green-50'}`}
              onClick={() => setSelectedCategory('all')}
            >
              <Filter className="w-4 h-4" /> All Posts
            </button>
            {/* Add more category buttons if needed */}
          </div>
        </div>
      </div>

      {/* Blog Card Grid */}
      <div id="blog-articles" className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <img src={post.image} alt={post.title} className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-6 flex flex-col flex-grow">
                <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {post.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors duration-200">{post.title}</h2>
                <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime} min read</span>
                </div>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-block mt-auto px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:scale-105 transition-transform"
                >
                  Read More <ArrowRight className="inline-block w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <div className="text-center text-gray-500 py-16 text-lg">No blog posts found.</div>
        )}
      </div>
    </div>
  );
}
