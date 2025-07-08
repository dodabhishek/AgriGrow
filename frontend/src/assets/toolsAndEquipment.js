import { smartSoilSensorImages } from './equipmentImages';

const toolsAndEquipment = [
  {
    _id: 'tool1',
    name: 'Smart Soil Sensor',
    price: 999,
    imageUrl: smartSoilSensorImages[0],
    images: smartSoilSensorImages,
    description: 'Real-time soil moisture, pH, and temperature sensor with mobile connectivity.',
    type: 'tool',
    rating: 4.3,
    reviews: 24,
    duration: '1 Year',
    features: [
      'Bluetooth 5.0',
      'Rechargeable Battery',
      'Waterproof',
      'Mobile app access',
      'Data analytics'
    ]
  },
  ...Array.from({ length: 9 }, (_, i) => ({
    _id: `tool${i+2}`,
    name: `AI Crop Monitoring Tool #${i+2}`,
    price: 999 + ((i+1) % 4) * 100,
    imageUrl: "/src/assets/Images/app.jpg",
    description: `Access our AI-powered crop monitoring tool #${i+2} for a year. Detect diseases, predict yields, and optimize your farm.`,
    type: 'tool',
    rating: 4.1 + ((i+1) % 4) * 0.2,
    reviews: 12 + ((i+1) * 2) % 30,
    duration: '1 Year',
    features: [
      'Disease detection',
      'Yield prediction',
      'Mobile app access',
      'Data analytics'
    ]
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    _id: `kit${i+1}`,
    name: `Soil Analysis Kit #${i+1}`,
    price: 299 + (i % 3) * 50,
    imageUrl: "/src/assets/Images/soil_kit.jpg",
    description: `Test your soil at home with our easy-to-use kit #${i+1}. Includes pH, nutrient, and moisture tests.`,
    type: 'kit',
    rating: 4.0 + (i % 5) * 0.2,
    reviews: 7 + (i * 2) % 20,
    kitContents: [
      'pH test strips',
      'Nutrient test solution',
      'Moisture meter',
      'Instruction manual'
    ],
    features: [
      'Easy to use',
      'Accurate results',
      'Reusable kit',
      'Quick analysis'
    ]
  })),
];

export default toolsAndEquipment; 