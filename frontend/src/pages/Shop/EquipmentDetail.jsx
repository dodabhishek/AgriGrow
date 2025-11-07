import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { productsService } from '../../lib/productsService';
import { FaShoppingCart, FaRegHeart, FaExchangeAlt, FaPaypal, FaInfoCircle, FaStar } from "react-icons/fa";

const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

const EquipmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromSection = location.state?.fromSection || "all";
  const [equipment, setEquipment] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  useEffect(() => {
    if (!equipment) {
      setLoading(true);
      productsService.getProductById(id).then(product => {
        setEquipment(product);
        setLoading(false);
      });
    }
  }, [id, equipment]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Equipment Not Found</h2>
          <button onClick={() => navigate('/shop', { state: { selectedType: fromSection } })} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full font-medium">Go Back</button>
        </div>
      </div>
    );
  }

  // Add to Cart handler
  const handleAddToCart = async () => {
    if (!equipment || !equipment._id) {
      alert('Invalid product information. Please try again.');
      return;
    }

    setAddToCartLoading(true);
    try {
      console.log('Adding product to cart:', equipment._id);
      const result = await productsService.addToCart(equipment._id);
      // Dispatch event to update Header cart count
      window.dispatchEvent(new Event('cartUpdated'));
      alert('Product added to cart successfully!');
      console.log('Add to cart success:', result);
      
      // Navigate back to shop page with Tools & Equipment section selected
      navigate('/shop', { state: { selectedType: 'tools' } });
    } catch (error) {
      console.error('Error adding to cart:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.message === 'You must be logged in to add items to your cart.') {
        alert('Please log in to add items to your cart.');
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to add to cart. Please try again.');
      }
    } finally {
      setAddToCartLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-28 pb-10 px-2 md:px-8 flex flex-col items-center">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full flex flex-col overflow-hidden mb-10 relative p-6 md:p-10">
        {/* Product Name Header */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight w-full text-left mb-2 md:mb-4 whitespace-normal break-words px-2 md:px-4 pt-2">
          {equipment.name}
        </h1>
        <div className="w-full border-b border-gray-200 mb-4"></div>
        {/* Flex Row: Image + Info/Buttons */}
        <div className="flex flex-col md:flex-row w-full gap-8">
          {/* Left: Product Image */}
          <div className="flex flex-col items-center justify-start md:w-1/2">
            <div className="rounded-2xl border-4 border-green-100 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 bg-white mb-6 md:mb-0">
              <img
                src={equipment.imageUrl}
                alt={equipment.name}
                className="object-contain w-full max-w-xs h-64 md:h-80 bg-white transition-transform duration-300 hover:scale-110"
                onClick={() => setZoomOpen(true)}
                style={{ cursor: 'zoom-in' }}
                loading="lazy"
              />
            </div>
            {/* Zoom Modal */}
            {zoomOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fadeIn" onClick={() => setZoomOpen(false)}>
                <img src={equipment.imageUrl} alt="Zoomed" className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl border-4 border-white animate-zoomIn" />
                <button className="absolute top-8 right-8 text-white text-3xl font-bold bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition" onClick={() => setZoomOpen(false)}>&times;</button>
              </div>
            )}
            {/* Back Button */}
            <button onClick={() => navigate('/shop', { state: { selectedType: fromSection } })} className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full font-medium shadow hover:bg-green-700 transition-all w-full md:w-auto">Back to {fromSection === 'tools' ? 'Tools & Equipment' : fromSection.charAt(0).toUpperCase() + fromSection.slice(1)}</button>
          </div>
          {/* Right: Info and Buttons */}
          <div className="flex flex-col gap-4 md:w-1/2 md:pl-2 justify-start">
            {/* Qty and Price Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-4 w-full">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Qty:</span>
                <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 shadow-inner">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 hover:bg-green-100 transition">-</button>
                  <span className="w-10 text-center font-semibold text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 hover:bg-green-100 transition">+</button>
                </div>
              </div>
              {/* Price Badge */}
              <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-400 text-white text-xl font-bold px-7 py-3 rounded-2xl shadow-lg text-center min-w-[120px] mt-2 sm:mt-0">
                {formatINR(equipment.price)}
              </span>
            </div>
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2 justify-start">
              <span className="bg-yellow-100 text-yellow-500 rounded-full px-3 py-1 flex items-center gap-1 font-semibold text-lg shadow-sm">
                <FaStar className="inline-block" /> {equipment.rating || 4.0}
              </span>
            </div>
            {/* Description */}
            <div className="flex items-start gap-2 bg-green-50 rounded-xl p-4 shadow-inner mb-2">
              <FaInfoCircle className="text-green-500 text-xl mt-1" />
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {equipment.description}
              </p>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <button
                className="w-full bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl transition-all transform hover:scale-[1.03] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={addToCartLoading}
              >
                <FaShoppingCart className="text-2xl mr-2" />
                {addToCartLoading ? 'Adding...' : 'Add To Cart'}
              </button>
              <div className="flex gap-2">
                <button className="flex-1 bg-white border border-blue-200 text-blue-700 py-3 rounded-2xl font-semibold text-base shadow hover:bg-blue-50 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
                  <FaRegHeart className="text-xl mr-2" />
                  Wishlist
                </button>
                <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 rounded-2xl font-semibold text-base shadow flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
                  <FaExchangeAlt className="text-xl mr-2" />
                  Compare
                </button>
              </div>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl transition-all transform hover:scale-[1.03] active:scale-95">
                <FaPaypal className="text-2xl mr-2" />
                Pay with PayPal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail; 