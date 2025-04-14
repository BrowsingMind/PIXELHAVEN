
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LandingPageNavbar from '@/components/LandingPageNavbar';
import Footer from '@/components/Footer';
import { mockArtworks } from '@/lib/mockData';
import ArtworkCard from '@/components/ArtworkCard';
import { ArrowRight, CheckCircle } from 'lucide-react';

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

      {/* Hero Section - styled like the coral section in the reference image */}
      <section className="min-h-screen bg-fun-coral flex items-center pt-16 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-16 left-10 w-40 h-40 rounded-full bg-white/10 animate-float"></div>
          <div className="absolute bottom-16 right-10 w-64 h-64 rounded-full bg-white/10" style={{animationDelay: "0.5s", animation: "float 4s ease-in-out infinite"}}></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-white/10" style={{animationDelay: "0.2s", animation: "float 3s ease-in-out infinite"}}></div>
        </div>

        <div className="container mx-auto px-4 py-20 z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-12 md:mb-0 animate-fade-in">
              <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-sm text-sm font-medium mb-6">
                Welcome to Pixel Haven
              </span>
              <h1 className="fun-heading">
                Pixel Perfect Creations
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-lg">
                The premier marketplace for buying and selling unique pixel art creations from talented artists worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-white text-fun-coral hover:bg-white/90 fun-button w-full sm:w-auto shadow-lg">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 w-full sm:w-auto">
                    Browse Artworks
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4 max-w-md mx-auto animate-fade-in">
              {featuredArtworks.slice(0, 4).map((artwork, index) => (
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

      {/* About Section - styled like the purple section in the reference image */}
      <section className="fun-section bg-fun-purple">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            <div className="md:w-1/2 order-2 md:order-1">
              <img 
                src={featuredArtworks[0].imageUrl}
                alt="Featured Artwork"
                className="rounded-lg shadow-2xl max-w-md mx-auto animate-float"
              />
            </div>
            <div className="md:w-1/2 text-white order-1 md:order-2">
              <h2 className="fun-subheading mb-6">About</h2>
              <p className="text-lg mb-8 max-w-lg">
                Pixel Haven is a vibrant marketplace dedicated to pixel art enthusiasts. 
                We connect talented pixel artists with fans and collectors, providing a platform 
                where creativity thrives and unique digital art finds appreciative homes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-fun-yellow shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Unique Digital Assets</h4>
                    <p className="text-white/80 text-sm">
                      Each artwork is unique and owned exclusively by the buyer after purchase.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-fun-yellow shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Creator Community</h4>
                    <p className="text-white/80 text-sm">
                      Join a growing community of pixel art enthusiasts sharing techniques and inspiration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - styled like the mint green section in the reference image */}
      <section className="fun-section bg-fun-mint">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="fun-subheading text-pixel-dark">Products</h2>
            <p className="text-xl text-pixel-dark/70 max-w-2xl mx-auto">
              Discover handcrafted pixel art from talented creators around the world
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredArtworks.map((artwork, index) => (
              <div 
                key={artwork.id}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <ArtworkCard artwork={artwork} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/explore">
              <Button size="lg" className="bg-pixel-dark hover:bg-pixel-dark/90 text-white shadow-md">
                View All Artworks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
      <section className="py-20 bg-fun-yellow text-pixel-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of pixel art enthusiasts and discover unique digital creations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="bg-fun-purple text-white hover:bg-fun-purple/90 w-full sm:w-auto shadow-lg">
                Sign In to Get Started
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="outline" className="border-fun-purple text-fun-purple hover:bg-fun-purple/10 w-full sm:w-auto">
                Browse as Guest
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
