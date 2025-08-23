import './index.css';  
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// import LocomotiveScroll from 'locomotive-scroll';
// import 'locomotive-scroll/dist/locomotive-scroll.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";

//components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Details from './components/Details';
import Works from './components/Works';
import AllWorks from "./components/AllWorks";
import Skills from "./components/Skills";
import About from "./components/About";
import Footer from "./components/Footer";

function AppContent() {
  const scrollRef = useRef(null);
  const aboutScrollRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // let scroll;
    // if (location.pathname === "/") {
    //   scroll = new LocomotiveScroll({
    //     el: scrollRef.current,
    //     smooth: true,
    //     lerp: 0.08,
    //   });
    // } else if (location.pathname === "/about") {
    //   scroll = new LocomotiveScroll({
    //     el: aboutScrollRef.current,
    //     smooth: true,
    //     lerp: 0.08,
    //   });
    // }
    // return () => {
    //   if (scroll) scroll.destroy();
    // };
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <motion.div
              ref={scrollRef}
              data-scroll-container
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="bg-[#0E0E0E] min-h-screen px-2 sm:px-6 lg:px-16"
            >
              <Hero />
              <Details />
              <Works />
              <Skills />
              <Footer />
            </motion.div>
          }
        />
        <Route path="/about" element={<About scrollRef={aboutScrollRef} />} />
        <Route path="/all-works" element={<AllWorks />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
