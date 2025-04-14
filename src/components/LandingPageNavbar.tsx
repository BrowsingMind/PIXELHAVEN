
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  return (
    <Link 
      to={to} 
      className="text-white hover:text-white/80 text-lg font-medium transition-colors relative 
        after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 
        after:left-0 after:bg-white after:origin-bottom-right after:transition-transform 
        after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
    >
      {label}
    </Link>
  );
};

const LandingPageNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-fun-coral/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-white font-bold text-2xl">
            Pixel<span className="text-fun-yellow">Haven</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" label="Home" />
            <NavLink to="/explore" label="Explore" />
            <Link to="/auth" className="text-white hover:text-white/80 text-lg font-medium">
              Login
            </Link>
            <Link to="/buyer">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-fun-coral">
                I am a Buyer
              </Button>
            </Link>
            <Link to="/artist">
              <Button className="bg-white text-fun-coral hover:bg-white/90">
                I am an Artist
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 flex flex-col space-y-4 items-center animate-fade-in">
            <Link 
              to="/" 
              className="text-white hover:text-white/80 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className="text-white hover:text-white/80 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/auth" 
              className="text-white hover:text-white/80 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link to="/buyer" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-fun-coral w-full">
                I am a Buyer
              </Button>
            </Link>
            <Link to="/artist" onClick={() => setIsMenuOpen(false)}>
              <Button className="bg-white text-fun-coral hover:bg-white/90 w-full">
                I am an Artist
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
