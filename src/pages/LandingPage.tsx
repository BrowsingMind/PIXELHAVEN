
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LandingPageNavbar from '@/components/LandingPageNavbar';
import Footer from '@/components/Footer';
import { mockArtworks } from '@/lib/mockData';
import ArtworkCard from '@/components/ArtworkCard';
import { ArrowRight, Palette, ShoppingBag, Zap, CheckCircle, Users, Shield } from 'lucide-react';

const LandingPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Featured artworks (first 4)
  const featuredArtworks = mockArtworks.slice(0, 4);
  
  // New arrivals (latest 4)
  const newArrivals = [...mockArtworks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <>
      <LandingPageNavbar />

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-pixel-primary to-pixel-accent flex items-center pt-16 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-16 left-10 w-40 h-40 rounded-full bg-white/10"></div>
          <div className="absolute bottom-16 right-10 w-64 h-64 rounded-full bg-white/10"></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-white/10"></div>
        </div>

        <div className="container mx-auto px-4 py-20 z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-12 md:mb-0 animate-fade-in">
              <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-sm text-sm font-medium mb-6">
                Welcome to Pixel Haven
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
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
            <div className="md:w-1/2 grid grid-cols-2 gap-4 max-w-md mx-auto animate-fade-in">
              {featuredArtworks.map((artwork, index) => (
                <div 
                  key={artwork.id} 
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-lg transform hover:scale-105 transition-transform"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
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
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Pixel Haven?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The perfect platform for pixel art enthusiasts and creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 text-center rounded-lg hover:bg-muted/50 transition-colors">
              <div className="bg-pixel-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-pixel-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Curated Collection</h3>
              <p className="text-muted-foreground">
                Discover handpicked pixel art creations from the world's most talented digital artists.
              </p>
            </div>

            <div className="p-6 text-center rounded-lg hover:bg-muted/50 transition-colors">
              <div className="bg-pixel-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-pixel-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Shopping</h3>
              <p className="text-muted-foreground">
                Easy browsing, secure checkout, and instant downloads for all your pixel art purchases.
              </p>
            </div>

            <div className="p-6 text-center rounded-lg hover:bg-muted/50 transition-colors">
              <div className="bg-pixel-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-pixel-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Artist Support</h3>
              <p className="text-muted-foreground">
                Fair compensation and powerful tools to help artists showcase and sell their work.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-pixel-primary shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Unique Digital Assets</h4>
                <p className="text-muted-foreground text-sm">
                  Each artwork is unique and owned exclusively by the buyer after purchase.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="h-6 w-6 text-pixel-primary shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Creator Community</h4>
                <p className="text-muted-foreground text-sm">
                  Join a growing community of pixel art enthusiasts sharing techniques and inspiration.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-pixel-primary shrink-0" />
              <div>
                <h4 className="font-medium mb-2">Secure Transactions</h4>
                <p className="text-muted-foreground text-sm">
                  All purchases are protected with secure payment processing and delivery.
                </p>
              </div>
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

      {/* New Arrivals Section */}
      <section className="py-20 bg-white dark:bg-pixel-dark">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link to="/explore?sort=newest" className="text-pixel-primary hover:underline flex items-center">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((artwork) => (
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
      <Footer />
    </>
  );
};

export default LandingPage;
