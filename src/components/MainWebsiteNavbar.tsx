
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ShoppingCart, User, Settings, LogOut, 
  Search, Menu, X, ChevronDown 
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import CartPreview from './CartPreview';

const MainWebsiteNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const cartPreviewRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLDivElement>(null);
  
  const { getCartCount } = useCart();
  const { user, logout } = useUser();
  const location = useLocation();
  const cartCount = getCartCount();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartPreviewRef.current && 
          cartButtonRef.current && 
          !cartPreviewRef.current.contains(event.target as Node) && 
          !cartButtonRef.current.contains(event.target as Node)) {
        setIsCartPreviewOpen(false);
      }
      
      if (profileMenuRef.current && 
          profileButtonRef.current && 
          !profileMenuRef.current.contains(event.target as Node) && 
          !profileButtonRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsCartPreviewOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md dark:bg-pixel-dark' : 'bg-white dark:bg-pixel-dark'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl">
            Pixel<span className="text-pixel-primary">Haven</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/explore" className="font-medium hover:text-pixel-primary transition-colors">
              Explore Artworks
            </Link>
            
            {/* Search */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search artworks..." 
                className="pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-pixel-primary"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          
            {/* Cart */}
            <div className="relative" ref={cartButtonRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setIsCartPreviewOpen(!isCartPreviewOpen)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-pixel-primary px-1.5 min-w-[1.5rem]"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
              
              {/* Cart Preview Dropdown */}
              {isCartPreviewOpen && (
                <div 
                  ref={cartPreviewRef} 
                  className="absolute right-0 mt-2 bg-white dark:bg-pixel-dark shadow-lg rounded-lg w-80 animate-fade-in z-50"
                >
                  <CartPreview />
                </div>
              )}
            </div>
            
            {/* Profile Menu */}
            <div className="relative" ref={profileButtonRef}>
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || ''} alt={user?.username || 'User'} />
                  <AvatarFallback>{user?.username?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <span className="hidden lg:inline">{user?.username || 'User'}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div 
                  ref={profileMenuRef} 
                  className="absolute right-0 mt-2 bg-white dark:bg-pixel-dark shadow-lg rounded-lg w-48 py-2 animate-fade-in z-50"
                >
                  <Link 
                    to="/profile" 
                    className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex items-center px-4 py-2 hover:bg-muted transition-colors"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                  <button 
                    className="flex items-center px-4 py-2 hover:bg-muted transition-colors w-full text-left text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 bg-pixel-primary px-1.5 min-w-[1.5rem]"
                >
                  {cartCount}
                </Badge>
              )}
            </Link>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 flex flex-col space-y-4 animate-fade-in">
            <div className="relative w-full mb-4">
              <input 
                type="text" 
                placeholder="Search artworks..." 
                className="pl-10 pr-4 py-2 rounded-full border w-full focus:outline-none focus:ring-2 focus:ring-pixel-primary"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            
            <Link 
              to="/explore" 
              className="px-2 py-3 hover:bg-muted rounded-md transition-colors"
            >
              Explore Artworks
            </Link>
            <Link 
              to="/profile" 
              className="px-2 py-3 hover:bg-muted rounded-md transition-colors flex items-center"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
            <Link 
              to="/settings" 
              className="px-2 py-3 hover:bg-muted rounded-md transition-colors flex items-center"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
            <button 
              className="px-2 py-3 hover:bg-muted rounded-md transition-colors w-full text-left text-destructive flex items-center"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainWebsiteNavbar;
