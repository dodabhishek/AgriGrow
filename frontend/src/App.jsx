import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from './pages/Home.jsx';
import Service from './pages/Service.jsx';
import Contact from "./pages/Contact.jsx";
import Projects from "./pages/Projects.jsx";
import About from './pages/About.jsx'
import Shop from "./pages/Shop.jsx";

 // Import your Service page

const App = () => {
  return (
    <Router>
      <Header />
      
      <Routes>

        <Route path="/" element={<Home />} /> {/* Home Route */}
        <Route path="/about" element={<About />} /> {/* Home Route */}
        <Route path="/service" element={<Service />} /> {/* Service Route */}
        <Route path="/projects" element={<Projects />} /> {/* Project Route */}
        <Route path="/shop" element={<Shop />} /> {/* Project Route */}
        
        <Route path="/contact" element={<Contact />} /> {/* Contact Route */}


        

      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
