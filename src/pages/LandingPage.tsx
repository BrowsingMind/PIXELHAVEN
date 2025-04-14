
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
                I Woof It
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
              <img 
                src="/lovable-uploads/ab842d39-96fd-4057-9417-68d54b75f5fe.png" 
                alt="Dog collar" 
                className="w-full col-span-2 object-contain h-48 animate-float"
              />
              {featuredArtworks.slice(0, 3).map((artwork, index) => (
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

      {/* Contact Section - styled like the yellow section in the reference image */}
      <section className="fun-section bg-fun-yellow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="fun-subheading text-pixel-dark">Contact</h2>
            <p className="text-xl text-pixel-dark/70 max-w-2xl mx-auto">
              Have questions? Get in touch with our friendly support team
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/90 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Write Us</h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="fun-input"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="fun-input"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message" 
                    rows={5} 
                    className="fun-input"
                  ></textarea>
                </div>
                <Button className="bg-fun-purple hover:bg-fun-purple/90 text-white w-full">
                  Send Message
                </Button>
              </form>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Reach Us</h3>
                  <p className="text-pixel-dark/80">123 Pixel Street</p>
                  <p className="text-pixel-dark/80">Artville, Digital World</p>
                </div>
                
                <div>
                  <p className="font-medium">Phone:</p>
                  <p className="text-pixel-dark/80">+1 (234) 567-8901</p>
                </div>
                
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="text-pixel-dark/80">contact@pixelhaven.com</p>
                </div>
                
                <div className="flex space-x-4 text-pixel-dark">
                  <a href="#" className="hover:text-fun-purple transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                    </svg>
                  </a>
                  <a href="#" className="hover:text-fun-purple transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </a>
                  <a href="#" className="hover:text-fun-purple transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
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
            <Link to="/auth">
              <Button size="lg" className="bg-white text-pixel-primary hover:bg-white/90 w-full sm:w-auto">
                Sign In to Get Started
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 w-full sm:w-auto">
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
