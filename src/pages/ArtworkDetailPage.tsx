
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainWebsiteNavbar from '@/components/MainWebsiteNavbar';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Share2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { mockArtworks } from '@/lib/mockData';
import { Artwork } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton";

const ArtworkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Simulate API call
    setTimeout(() => {
      const found = mockArtworks.find(art => art.id === id);
      setArtwork(found || null);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const inWishlist = artwork ? isInWishlist(artwork.id) : false;

  const handleAddToCart = () => {
    if (artwork) {
      addItem(artwork);
    }
  };

  const handleWishlistToggle = () => {
    if (!artwork) return;
    
    if (inWishlist) {
      removeFromWishlist(artwork.id);
    } else {
      addToWishlist(artwork);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artwork?.title,
        text: `Check out this amazing pixel art: ${artwork?.title} by ${artwork?.artist}`,
        url: window.location.href,
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <>
        <MainWebsiteNavbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <Skeleton className="w-full aspect-square rounded-lg" />
            </div>
            <div className="md:w-1/2 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <div className="space-y-2 py-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex gap-3 py-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!artwork) {
    return (
      <>
        <MainWebsiteNavbar />
        <div className="container mx-auto px-4 pt-24 pb-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Artwork Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The artwork you are looking for does not exist or has been removed.
          </p>
          <Link to="/explore">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Explore
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <MainWebsiteNavbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/explore" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Explore
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Artwork Image */}
          <div className="md:w-1/2">
            <div className="bg-muted rounded-lg overflow-hidden">
              <img 
                src={artwork.imageUrl} 
                alt={artwork.title} 
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="mt-4 flex space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="flex-1"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleWishlistToggle}
                className={`flex-1 ${inWishlist ? 'bg-accent/10 text-accent border-accent' : ''}`}
              >
                <Heart 
                  className={`mr-2 h-4 w-4 ${inWishlist ? 'fill-accent' : ''}`} 
                />
                {inWishlist ? 'Saved' : 'Save to Wishlist'}
              </Button>
            </div>
          </div>

          {/* Artwork Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
            <p className="text-xl mb-2">by <span className="font-medium">{artwork.artist}</span></p>
            <div className="flex items-center mb-6">
              <p className="text-2xl font-bold text-pixel-primary">
                {formatPrice(artwork.price)}
              </p>
              <Badge variant="outline" className="ml-4">
                {artwork.dimensions}
              </Badge>
            </div>

            <div className="prose dark:prose-invert mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p>{artwork.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {artwork.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Dimensions</p>
                  <p className="font-medium">{artwork.dimensions}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Category</p>
                  <p className="font-medium">{artwork.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium">{new Date(artwork.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart} 
                size="lg" 
                className="w-full"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Link to="/cart" className="block w-full">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="w-full"
                >
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtworkDetailPage;
