
import { useEffect } from "react";
import LandingPage from "./LandingPage";

const Index = () => {
  useEffect(() => {
    // Set document title
    document.title = "Pixel Haven | Digital Art Marketplace";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return <LandingPage />;
};

export default Index;
