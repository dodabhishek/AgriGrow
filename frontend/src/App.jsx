import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from './pages/Home.jsx';
import Service from './pages/Service.jsx';
import Contact from "./pages/Contact.jsx";
import Projects from "./pages/Projects.jsx";
import About from './pages/About.jsx'
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

 // Import your Service page

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  return (
    <Router>
      <Header />
      
      <Routes>

        <Route path="/" element={<Home />} /> {/* Home Route */}
        <Route path="/about" element={<About />} /> {/* Home Route */}
        <Route path="/service" element={<Service />} /> {/* Service Route */}
        <Route path="/projects" element={<Projects />} /> {/* Project Route */}
        <Route path="/shop" element={<Shop />} /> {/* Project Route */}
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        
        <Route path="/contact" element={<Contact />} /> {/* Contact Route */}


        

      </Routes>
      <Toaster />
      <Footer />
    </Router>
    
  );
};

export default App;
