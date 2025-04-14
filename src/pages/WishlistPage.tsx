
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainWebsiteNavbar from '@/components/MainWebsiteNavbar';
import ArtworkGrid from '@/components/ArtworkGrid';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Artwork } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

const WishlistPage: React.FC = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Convert wishlist items to artworks array for ArtworkGrid
  const wishlistArtworks = items.map(item => item.artwork);
  
  // Generate background blobs for decorative effect
  const blobs = Array(3).fill(0).map((_, i) => {
    const colors = ['bg-fun-coral/30', 'bg-fun-purple/30', 'bg-fun-mint/30'];
    const sizes = ['w-96 h-96', 'w-80 h-80', 'w-72 h-72'];
    const positions = [
      'top-20 -right-32', 
      'bottom-40 -left-32', 
      '-bottom-20 right-48'
    ];
    
    return (
      <div 
        key={i}
        className={`fun-blob ${colors[i]} ${sizes[i]} ${positions[i]}`}
        style={{ 
          transform: `rotate(${i * 45}deg)`,
          animation: `float ${3 + i}s ease-in-out infinite`
        }}
      />
    );
  });
  
  const WishlistItem = ({ artwork }: { artwork: Artwork }) => (
    <Card className="overflow-hidden group hover:shadow-lg transition-all">
      <Link to={`/artwork/${artwork.id}`} className="block">
        <div className="aspect-square overflow-hidden relative">
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
            <p className="text-white font-medium truncate">{artwork.title}</p>
            <Button 
              variant="destructive" 
              size="icon" 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeItem(artwork.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">
          <Link 
            to={`/artwork/${artwork.id}`} 
            className="hover:text-pixel-primary transition-colors"
          >
            {artwork.title}
          </Link>
        </CardTitle>
        <CardDescription>by {artwork.artist}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <span className="font-medium">
          {formatPrice(artwork.price)}
        </span>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-destructive"
          onClick={() => removeItem(artwork.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
  
  const EmptyWishlist = () => (
    <div className="text-center py-16">
      <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
        <Heart className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-medium mb-2">Your wishlist is empty</h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Explore our collection and heart the artworks you love to save them to your wishlist.
      </p>
      <Link to="/explore">
        <Button size="lg" className="px-8">
          Explore Artworks
        </Button>
      </Link>
    </div>
  );
  
  return (
    <div className="min-h-screen relative">
      {/* Decorative background elements */}
      {blobs}
      
      <MainWebsiteNavbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 animate-fade-in">
              My Wishlist
            </h1>
            <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {items.length} {items.length === 1 ? 'artwork' : 'artworks'} saved
            </p>
          </div>
          
          {items.length > 0 && (
            <div className="flex gap-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/explore">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
              <Button 
                variant="destructive" 
                onClick={clearWishlist}
              >
                Clear Wishlist
              </Button>
            </div>
          )}
        </div>
        
        {items.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {wishlistArtworks.map(artwork => (
              <WishlistItem key={artwork.id} artwork={artwork} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
