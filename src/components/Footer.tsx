
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pixel-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">
              Pixel<span className="text-pixel-accent">Haven</span>
            </h3>
            <p className="text-white/70 max-w-sm">
              The premier marketplace for unique pixel art from talented digital creators around the world.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-pixel-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-pixel-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-pixel-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-pixel-accent transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/explore" className="hover:text-white transition-colors">All Artworks</Link></li>
                <li><Link to="/explore?category=landscape" className="hover:text-white transition-colors">Landscapes</Link></li>
                <li><Link to="/explore?category=fantasy" className="hover:text-white transition-colors">Fantasy</Link></li>
                <li><Link to="/explore?category=sci-fi" className="hover:text-white transition-colors">Sci-Fi</Link></li>
                <li><Link to="/explore?category=gaming" className="hover:text-white transition-colors">Gaming</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/profile" className="hover:text-white transition-colors">My Profile</Link></li>
                <li><Link to="/cart" className="hover:text-white transition-colors">My Cart</Link></li>
                <li><Link to="/profile#wishlist" className="hover:text-white transition-colors">My Wishlist</Link></li>
                <li><Link to="/settings" className="hover:text-white transition-colors">Settings</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Copyright Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/50">
          <p>© {currentYear} Pixel Haven Market. All rights reserved.</p>
          <p className="mt-2 text-sm">Created with ♥ for pixel art enthusiasts everywhere.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
