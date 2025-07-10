import mongoose from 'mongoose';
import Product from './models/product.model.js';
import User from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleProducts = [
  {
    name: 'Smart Soil Sensor',
    description: 'Real-time soil moisture, pH, and temperature sensor with mobile connectivity. Perfect for precision farming and monitoring soil conditions.',
    price: 999,
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500',
    type: 'sensor'
  },
  {
    name: 'AI Crop Monitoring Tool',
    description: 'Advanced AI-powered crop monitoring system that detects diseases, predicts yields, and optimizes farming practices.',
    price: 1299,
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72f?w=500',
    type: 'monitoring'
  },
  {
    name: 'Soil Analysis Kit',
    description: 'Complete soil testing kit for pH, nutrient levels, and moisture content. Easy to use with accurate results.',
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500',
    type: 'kit'
  },
  {
    name: 'Automated Irrigation System',
    description: 'Smart irrigation system with weather integration and soil moisture sensors for optimal water management.',
    price: 2499,
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72f?w=500',
    type: 'irrigation'
  },
  {
    name: 'Drone for Crop Monitoring',
    description: 'High-resolution drone with multispectral camera for aerial crop monitoring and analysis.',
    price: 3999,
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500',
    type: 'drone'
  },
  {
    name: 'Greenhouse Climate Controller',
    description: 'Automated climate control system for greenhouses with temperature, humidity, and CO2 monitoring.',
    price: 1899,
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72f?w=500',
    type: 'controller'
  }
];

const seedProducts = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

    // Find or create an admin user
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('No admin user found. Please create an admin user first.');
      return;
    }

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Add sample products
    const productsWithUser = sampleProducts.map(product => ({
      ...product,
      user: adminUser._id
    }));

    const createdProducts = await Product.insertMany(productsWithUser);
    console.log(`Added ${createdProducts.length} sample products`);

    console.log('Sample products:');
    createdProducts.forEach(product => {
      console.log(`- ${product.name}: $${product.price}`);
    });

  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  }
};

// Run the seed function
seedProducts(); 