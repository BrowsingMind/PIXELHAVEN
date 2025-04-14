
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LandingPageNavbar from '@/components/LandingPageNavbar';
import { mockArtworks } from '@/lib/mockData';
import ArtworkCard from '@/components/ArtworkCard';
import { ArrowRight, Palette, ShoppingBag, Zap } from 'lucide-react';

const LandingPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Featured artworks (first 4)
  const featuredArtworks = mockArtworks.slice(0, 4);

  return (
    <>
      <LandingPageNavbar />

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-pixel-primary to-pixel-accent flex items-center pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-12 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Discover and Collect Exceptional Pixel Art
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                The premier marketplace for buying and selling unique pixel art creations from talented artists worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/buyer">
                  <Button size="lg" className="bg-white text-pixel-primary hover:bg-white/90 w-full sm:w-auto">
                    Start Browsing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/artist">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 w-full sm:w-auto">
                    Sell Your Artwork
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4 max-w-md mx-auto">
              {featuredArtworks.map((artwork) => (
                <div key={artwork.id} className="p-2 bg-white/10 backdrop-blur-sm rounded-lg transform hover:scale-105 transition-transform">
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title} 
                    className="w-full aspect-square object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-pixel-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Pixel Haven?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The perfect platform for pixel art enthusiasts and creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 text-center">
              <div className="bg-pixel-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-pixel-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Curated Collection</h3>
              <p className="text-muted-foreground">
                Discover handpicked pixel art creations from the world's most talented digital artists.
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="bg-pixel-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-pixel-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Shopping</h3>
              <p className="text-muted-foreground">
                Easy browsing, secure checkout, and instant downloads for all your pixel art purchases.
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="bg-pixel-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-pixel-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Artist Support</h3>
              <p className="text-muted-foreground">
                Fair compensation and powerful tools to help artists showcase and sell their work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-20 bg-muted/50 dark:bg-pixel-dark/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Artworks</h2>
            <Link to="/explore" className="text-pixel-primary hover:underline flex items-center">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-pixel-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of pixel art enthusiasts and discover unique digital creations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/buyer">
              <Button size="lg" className="bg-white text-pixel-primary hover:bg-white/90 w-full sm:w-auto">
                I'm a Buyer
              </Button>
            </Link>
            <Link to="/artist">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 w-full sm:w-auto">
                I'm an Artist
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pixel-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Pixel<span className="text-pixel-accent">Haven</span></h3>
              <p className="text-white/70 max-w-sm">
                The premier marketplace for unique pixel art from talented digital creators around the world.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Explore</h4>
                <ul className="space-y-2 text-white/70">
                  <li><Link to="/explore" className="hover:text-white">All Artworks</Link></li>
                  <li><Link to="/explore?category=landscapes" className="hover:text-white">Landscapes</Link></li>
                  <li><Link to="/explore?category=characters" className="hover:text-white">Characters</Link></li>
                  <li><Link to="/explore?category=animations" className="hover:text-white">Animations</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Account</h4>
                <ul className="space-y-2 text-white/70">
                  <li><Link to="/profile" className="hover:text-white">My Profile</Link></li>
                  <li><Link to="/cart" className="hover:text-white">My Cart</Link></li>
                  <li><Link to="/profile#wishlist" className="hover:text-white">My Wishlist</Link></li>
                  <li><Link to="/settings" className="hover:text-white">Settings</Link></li>
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-white/70">
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Copyright Info</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/50">
            <p>© {new Date().getFullYear()} Pixel Haven Market. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
