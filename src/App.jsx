import { useEffect, useState } from 'react';
import './style.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { AnimatePresence } from 'framer-motion';
import Preloader from './Components/Pages/Preloader';
import PageTransition from './Components/Elements/PageTransition';
import Home from './Components/Pages/Home';
import Demo from './Components/Pages/Demo';
import OurGallery from './Components/Pages/OurGallery';
import CarPage from './Components/Pages/CarPage';
import Header from './Components/Elements/Header';
import Footer from './Components/Elements/Footer';
import Aeryth from './Components/Pages/Aeryth';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis();
    
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const hasShownPreloader = localStorage.getItem('hasShownPreloader') === 'true';

    if (!hasLoaded && location.pathname === "/") {
      if (!hasShownPreloader) {
        const timeoutId = setTimeout(() => {
          setIsLoading(false);
          setHasLoaded(true);
          localStorage.setItem('hasLoaded', 'true');
          localStorage.setItem('hasShownPreloader', 'true');
        }, 10e3);

        return () => {
          clearTimeout(timeoutId);
        };
      } else {
        setIsLoading(false);
      }
    } else if (localStorage.getItem('hasLoaded') === 'true') {
      setIsLoading(false);
    }
  }, [hasLoaded, location.pathname]);

  return (
    <>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          {isLoading && location.pathname === "/" ? (
            <Route path="/" element={<Preloader />} />
          ) : (
            <>
              <Route index path="/" element={<PageTransition>
                  <Header />
                  <Home />
                  <Footer />
                </PageTransition>} />
              <Route path="/demo" element={<PageTransition>
                  <Header />
                  <Demo />
                  <Footer />
                </PageTransition>} />
              <Route path="/gallery" element={<PageTransition>
                  <Header />
                  <OurGallery />
                  <Footer />
                </PageTransition>} />
              <Route path="/model" element={<PageTransition>
                  <Header />
                  <CarPage />
                  <Footer />
                </PageTransition>} />
              <Route path="/aeryth" element={<PageTransition>
                  <Header />
                  <Aeryth />
                  <Footer />
                </PageTransition>} />
            </>
          )}
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
