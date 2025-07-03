import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/productRoute.js';
import cartRoutes from './routes/cartRoute.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { app, server } from './lib/socket.js';
import path from 'path';


dotenv.config();

// Get the directory path for ES modules
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: true,
    credentials: true,
}));

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Serve static files from the React app in production

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('/(.*)', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
  }



// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});