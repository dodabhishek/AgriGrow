import React, { useState, useEffect, useMemo } from "react";
import { expertData, chatExperts, fieldVisitExperts } from '../../assets/dummyStoreData';
import { productsService } from '../../lib/productsService';
import ExpertCard from '../../components/ExpertCard';
import { useNavigate, useLocation } from 'react-router-dom';

const ITEMS_PER_PAGE = 12;

export default function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const [toolsAndEquipment, setToolsAndEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  // Set selectedType from navigation state if available
  const [selectedType, setSelectedType] = useState(location.state?.selectedType || 'all');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await productsService.getAllProducts();
        setToolsAndEquipment(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setToolsAndEquipment([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  let mainGridData = [];
  if (selectedType === 'experts') mainGridData = expertData;
  else if (selectedType === 'chat') mainGridData = chatExperts;
  else if (selectedType === 'field_visit') mainGridData = fieldVisitExperts;
  else if (selectedType === 'tools') mainGridData = toolsAndEquipment;
  else mainGridData = [
    ...expertData,
    ...chatExperts,
    ...fieldVisitExperts,
    ...toolsAndEquipment
  ];

  // Pagination logic
  const totalPages = Math.ceil(mainGridData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => mainGridData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE), [mainGridData, currentPage]);

  // Helper to check if item is a tool/equipment
  const isEquipment = (item) => toolsAndEquipment.includes(item);

  // Reset to page 1 when selectedType changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType]);

  if (selectedType === 'tools' && loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20">
      <section className="relative py-16 px-4 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Expert Services & <span className="text-green-600">Smart Farming</span> Solutions</h1>
          <p className="text-lg text-gray-600">Connect with agricultural experts, get personalized consultations, field visits, and access modern tools to maximize your harvest potential.</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="container mx-auto px-4 pt-6">
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {[
            { label: 'All', value: 'all' },
            { label: 'Meet Our Experts', value: 'experts' },
            { label: 'Chat Experts', value: 'chat' },
            { label: 'Field Visits by Experts', value: 'field_visit' },
            { label: 'Tools & Equipment', value: 'tools' },
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
      </div>

      {/* Main Grid for Selected Data */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-stretch">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, idx) => {
              // If this is a toolsAndEquipment card, make it clickable
              if (isEquipment(item)) {
                return (
                  <div
                    key={item._id}
                    className="cursor-pointer h-full transition-all duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => navigate(`/shop/equipment/${item._id}`, { state: { product: item, fromSection: selectedType } })}
                  >
                    <ExpertCard
                      image={item.profileImage || item.imageUrl}
                      name={item.name}
                      expertise={item.expertise || item.type || 'Product'}
                      description={item.description}
                      rating={item.rating || 4.0}
                    />
                  </div>
                );
              }
              // Otherwise, render as usual
              return (
                <div
                  key={item.expertId || item._id || idx}
                  className="transition-all duration-300 ease-in-out transform hover:scale-105 h-full"
                >
                  <ExpertCard
                    image={item.profileImage || item.imageUrl}
                    name={item.name}
                    expertise={item.expertise || item.type}
                    description={item.description}
                    rating={item.rating}
                  />
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500">No data found for this category.</div>
          )}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              className="rounded-xl px-4 py-2 mx-1 text-lg font-semibold bg-gray-200 text-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`rounded-xl px-4 py-2 mx-1 text-lg font-semibold transition-all duration-150 ${
                  currentPage === i + 1
                    ? 'bg-green-600 text-white shadow font-bold scale-105'
                    : 'bg-white text-gray-700 hover:bg-green-100'
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="rounded-xl px-4 py-2 mx-1 text-lg font-semibold bg-gray-200 text-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
