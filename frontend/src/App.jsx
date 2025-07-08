import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Common/Home.jsx";
import Service from "./pages/Common/Service.jsx";
import Contact from "./pages/Common/Contact.jsx";
import Projects from "./pages/Common/Projects.jsx";
import About from "./pages/Common/About.jsx";
import Blog from "./pages/Common/Blog.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import ProfilePage from "./pages/Common/ProfilePage.jsx";
import SignUpPage from "./pages/Auth/SignUpPage.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Product from "./pages/Admin/ProductPage.jsx";
import Cart from "./pages/Shop/CartPage.jsx";
import ChatPage from "./pages/Chat/ChatPage.jsx";
import EquipmentDetail from "./pages/Shop/EquipmentDetail.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, hasCheckedAuth, checkAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    const initializeAuth = async () => {
      if (!hasCheckedAuth) {
        await checkAuth();
      }
    };
    initializeAuth();
  }, []);

  return (
    <div data-theme={theme}>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/equipment/:id" element={<EquipmentDetail />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth Routes */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* Admin Routes */}
        <Route
          path="/products"
          element={authUser?.role === "admin" ? <Product /> : <Navigate to="/" />}
        />

        {/* Chat Route */}
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />

        {/* Cart Route */}
        <Route
          path="/cart"
          element={authUser ? <Cart /> : <Navigate to="/login" />}
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;