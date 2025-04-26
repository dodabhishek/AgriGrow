import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from './pages/Home.jsx';
import Service from './pages/Service.jsx';
import Contact from "./pages/Contact.jsx";
import Projects from "./pages/Projects.jsx";
import About from './pages/About.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/AdminPage/ProductPage.jsx";
import Cart from "./pages/CartPage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { authUser } = useAuthStore(); // Get authUser from the store
  const { theme } = useThemeStore(); // Get theme from the store

  return (
    <div data-theme={theme}>
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/shop" element={<Shop />} />
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
      </Router>
    </div>
  );
};

export default App;