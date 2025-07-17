import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './lib/db.js';
import { app, server } from './lib/socket.js';
import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/productRoute.js';
import cartRoutes from './routes/cartRoute.js';
import messageRoutes from './routes/message.route.js';
import {rateLimit} from 'express-rate-limit';
import compression from 'compression';

dotenv.config();

// __dirname workaround for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  message: "You have reached the request limit",
  handler: (req, res, next) => {
    console.log(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: "Too many requests. Please try again after a minute."
    });
  }
});


app.use(limiter);

// Middlewares
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(compression());

// Set Cache-Control for static assets
app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js') || path.endsWith('.css') || path.endsWith('.jpg') || path.endsWith('.png') || path.endsWith('.svg')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
    }
  }
}));

// Example: Set Cache-Control for API responses (customize as needed)
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes
  }
  next();
});

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Serve frontend
// ...existing code...
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../../frontend/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
    });
}
// ...existing code...

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});
