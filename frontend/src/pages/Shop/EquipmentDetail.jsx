import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toolsAndEquipment from '../../assets/toolsAndEquipment';
import { smartSoilSensorImages } from '../../assets/equipmentImages';

const [side1, side2, side3, side4, side5, Avtar, Main1, Main2, Main3, Main4] = smartSoilSensorImages;
const galleryImages = [side1, side2, side3, side4, side5, Avtar, Main1, Main2, Main3, Main4];
const tabList = ["Details", "Tech Specs", "What's In The Box", "FAQs"];

const EquipmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const equipment = toolsAndEquipment.find(eq => eq._id === id);
  const [mainImage, setMainImage] = useState(galleryImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState(tabList[0]);
  const [zoomOpen, setZoomOpen] = useState(false);

  if (!equipment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Equipment Not Found</h2>
          <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full font-medium">Go Back</button>
        </div>
      </div>
    );
  }

  // Responsive: vertical on desktop, horizontal on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-28 pb-10 px-2 md:px-8 flex flex-col items-center">
      {/* Hero Card */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full flex flex-col md:flex-row overflow-hidden mb-10 relative">
        {/* Gallery */}
        <div className={`flex ${isMobile ? 'flex-row overflow-x-auto gap-2 py-2 px-1' : 'flex-col gap-3 p-6'} items-center md:items-start bg-white md:w-1/5 w-full md:min-w-[100px]`}>
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              className={`transition-all duration-200 w-14 h-14 rounded-xl border-2 ${mainImage === img ? 'border-blue-600 scale-105 shadow-lg' : 'border-gray-200 hover:border-blue-400 hover:scale-105'} overflow-hidden bg-white flex-shrink-0`}
              onClick={() => setMainImage(img)}
              aria-label={`Show image ${idx + 1}`}
            >
              <img src={img} alt={`Gallery ${idx + 1}`} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>
        {/* Main Image with Zoom */}
        <div className="flex-1 flex items-center justify-center bg-white p-4 relative">
          <img
            src={mainImage}
            alt={equipment.name}
            className="object-contain w-full max-w-lg h-80 md:h-[28rem] rounded-2xl shadow-xl cursor-zoom-in transition-transform duration-200 hover:scale-105"
            onClick={() => setZoomOpen(true)}
          />
          {/* Zoom Modal */}
          {zoomOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fadeIn" onClick={() => setZoomOpen(false)}>
              <img src={mainImage} alt="Zoomed" className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl border-4 border-white animate-zoomIn" />
              <button className="absolute top-8 right-8 text-white text-3xl font-bold bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition" onClick={() => setZoomOpen(false)}>&times;</button>
            </div>
          )}
        </div>
        {/* Info Panel (sticky on desktop) */}
        <div className="md:w-2/5 w-full flex flex-col gap-6 p-6 md:p-8 border-l border-gray-100 md:sticky md:top-32 bg-white z-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-1 leading-tight">{equipment.name}</h1>
          <div className="text-3xl font-bold text-blue-700 mb-1">$19.99</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500 text-2xl">★</span>
            <span className="font-semibold text-xl">{equipment.rating}</span>
            <span className="text-gray-400 text-base">(24 reviews)</span>
          </div>
          <p className="text-gray-700 mb-3 text-lg leading-relaxed">THIRDREALITY Smart Soil Moisture Sensor, Zigbee hub Required, Accurate Measurement, Capacitive Probe, Moisture/Temperature Meter for Garden Planting, Compatible with SmartThings, Home Assistant</p>
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mb-2">
            <span className="font-medium text-gray-700">Qty:</span>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 hover:bg-green-50">-</button>
            <span className="w-10 text-center font-semibold text-xl">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 hover:bg-green-50">+</button>
          </div>
          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 mb-2">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all">
              <span className="material-icons text-2xl">shopping_cart</span> Add To Cart
            </button>
            <div className="flex gap-2">
              <button className="flex-1 bg-white border border-blue-200 text-blue-700 py-3 rounded-2xl font-semibold text-base shadow hover:bg-blue-50 transition-all">Add To Wishlist</button>
              <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 rounded-2xl font-semibold text-base shadow">Compare</button>
            </div>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow transition-all">
              <span className="material-icons text-2xl">account_balance_wallet</span> PayPal
            </button>
          </div>
          {/* Categories/Tags as pill badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">Sensor</span>
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">Zigbee</span>
          </div>
        </div>
        {/* Floating Add to Cart on mobile */}
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/90 backdrop-blur border-t border-gray-200 px-4 py-3 flex gap-3 shadow-2xl">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white py-3 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all">
            <span className="material-icons text-2xl">shopping_cart</span> Add To Cart
          </button>
        </div>
      </div>
      {/* Tabs below the card */}
      <div className="w-full max-w-5xl mt-2">
        <div className="flex justify-center gap-8 md:gap-16 border-b border-gray-200 mb-8">
          {tabList.map(tab => (
            <button
              key={tab}
              className={`relative pb-3 px-6 text-xl font-semibold transition-all focus:outline-none ${selectedTab === tab ? 'text-blue-700' : 'text-gray-400'}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
              {selectedTab === tab && (
                <span className="absolute left-0 right-0 -bottom-1 h-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 animate-slideIn"></span>
              )}
            </button>
          ))}
        </div>
        <div className="w-full flex flex-col md:flex-row gap-8 items-start px-2 md:px-8 animate-fadeIn">
          {/* Tab Content */}
          {selectedTab === "Details" && (
            <div className="flex flex-col md:flex-row gap-8 w-full">
              <img src={Main1} alt="Details" className="rounded-xl shadow w-full max-w-xs mb-4 md:mb-0" />
              <div className="flex-1">
                <p className="text-gray-700 text-base mb-2">{equipment.description}</p>
                <ul className="list-disc ml-6 text-gray-600 text-base">
                  <li>1-year warranty on all equipment</li>
                  <li>Free installation support</li>
                  <li>24/7 customer care</li>
                </ul>
              </div>
            </div>
          )}
          {selectedTab === "Tech Specs" && (
            <div className="flex flex-col md:flex-row gap-8 w-full">
              <img src={Main2} alt="Tech Specs" className="rounded-xl shadow w-full max-w-xs mb-4 md:mb-0" />
              <div className="flex-1">
                <ul className="list-disc ml-6 text-gray-600 text-base">
                  {equipment.features && equipment.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                  {equipment.kitContents && equipment.kitContents.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {selectedTab === "What's In The Box" && (
            <div className="flex flex-col md:flex-row gap-8 w-full">
              <img src={Main3} alt="What's In The Box" className="rounded-xl shadow w-full max-w-xs mb-4 md:mb-0" />
              <div className="flex-1">
                <ul className="list-disc ml-6 text-gray-600 text-base">
                  {equipment.kitContents ? equipment.kitContents.map((c, i) => (
                    <li key={i}>{c}</li>
                  )) : <li>See product details for included items.</li>}
                </ul>
              </div>
            </div>
          )}
          {selectedTab === "FAQs" && (
            <div className="flex flex-col md:flex-row gap-8 w-full">
              <img src={Main4} alt="FAQs" className="rounded-xl shadow w-full max-w-xs mb-4 md:mb-0" />
              <div className="flex-1">
                <ul className="list-disc ml-6 text-gray-600 text-base">
                  <li>Q: Is installation included? <br/>A: Yes, free installation support is provided.</li>
                  <li>Q: What is the warranty period? <br/>A: 1 year.</li>
                  <li>Q: Can I return the product? <br/>A: Yes, within 30 days of purchase.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail; 