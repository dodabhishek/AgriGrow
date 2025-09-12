# 🌱 AgriGrow - Smart Farming Community Platform

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5+-green.svg)](https://www.mongodb.com/)

A comprehensive smart farming community platform that connects farmers with modern agricultural technology, educational resources, and a supportive community. Built with React, Node.js, and MongoDB.

## 🚀 Live Demo

- **Frontend**: [AgriGrow App](https://agrigrow-app.onrender.com)
- **Backend API**: [AgriGrow API](https://agrigrow-api.onrender.com)

## ✨ Features

### 🏠 Core Functionality
- **Smart Farming Solutions**: AI-powered crop monitoring, disease detection, and yield optimization
- **Educational Resources**: Tutorials, workshops, and expert guidance on modern farming techniques
- **Farmer Community**: Connect with fellow farmers, share experiences, and learn from success stories
- **E-commerce Platform**: Shop for farming tools, equipment, and agricultural products
- **Real-time Communication**: Chat system with video/voice call capabilities
- **User Management**: Role-based access (User/Admin) with authentication

### 🛒 E-commerce Features
- Product catalog with detailed descriptions and images
- Shopping cart functionality with quantity management
- Secure checkout process
- User profile management
- Admin panel for product management
- Real-time inventory updates

### 💬 Communication Features
- Real-time chat system using Socket.IO
- Video and voice call capabilities
- Message history and notifications
- User-to-user messaging
- File sharing capabilities

### 👥 User Management
- User registration and authentication
- Role-based access control (User/Admin)
- Profile management with avatar support
- Secure password handling with bcrypt
- JWT-based session management

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library
- **Framer Motion** - Animation library
- **Zustand** - State management
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication
- **React Hot Toast** - Notification system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing
- **Cloudinary** - Cloud image storage
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

### Clone the Repository
```bash
git clone https://github.com/dodabhishek/Project_AgriGrow.git
cd Project_AgriGrow
```

### Install Dependencies

#### Root Level (Optional)
```bash
npm install
```

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd frontend
npm install
```

### Environment Configuration

#### Backend Environment Variables
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Frontend Environment Variables
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## 🚀 Running the Application

### Development Mode

#### Start Backend Server
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend application will start on `http://localhost:5173`

### Production Build

#### Build Frontend
```bash
cd frontend
npm run build
```

#### Start Production Server
```bash
cd backend
npm start
```

## 📁 Project Structure

```
Project/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── lib/            # Utility libraries
│   │   └── index.js        # Server entry point
│   └── package.json
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   │   ├── Admin/     # Admin pages
│   │   │   ├── Auth/      # Authentication pages
│   │   │   ├── Chat/      # Chat functionality
│   │   │   ├── Common/    # Public pages
│   │   │   └── Shop/      # E-commerce pages
│   │   ├── store/         # Zustand state management
│   │   ├── lib/           # Utility libraries
│   │   ├── assets/        # Static assets
│   │   └── constants/     # Application constants
│   └── package.json
└── package.json           # Root package.json
```

## 🔧 Available Scripts

### Root Level
- `npm run build` - Install dependencies and build frontend
- `npm start` - Start backend server

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample products

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **CORS Protection** - Cross-origin request security
- **Rate Limiting** - API protection against abuse
- **Helmet Security** - HTTP header security
- **Input Validation** - Server-side data validation
- **Role-based Access** - Admin/User permission system

## 🌐 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Products
- `GET /products` - Get all products
- `POST /products` - Create new product (Admin only)
- `PUT /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)

### Cart
- `GET /cart` - Get user cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/update` - Update cart item quantity

### Messages
- `GET /messages` - Get user messages
- `POST /messages` - Send message

## 🚀 Deployment

### Render Deployment
The application is configured for deployment on Render:

1. Connect your GitHub repository to Render
2. Set up environment variables in Render dashboard
3. Deploy both frontend and backend services

### Environment Variables for Production
Make sure to set all required environment variables in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abhishek Dod**
- GitHub: [@dodabhishek](https://github.com/dodabhishek)
- Project: [AgriGrow](https://github.com/dodabhishek/Project_AgriGrow)

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the database
- Socket.IO team for real-time communication
- All contributors and supporters

## 📞 Support

If you have any questions or need support, please open an issue on GitHub or contact the maintainers.

---

**AgriGrow** - Empowering farmers with modern technology and community support 🌾
