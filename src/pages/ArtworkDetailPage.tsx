
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainWebsiteNavbar from '@/components/MainWebsiteNavbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  ShoppingCart, 
  Share2, 
  ArrowLeft, 
  Calendar, 
  Ruler, 
  Tag as TagIcon,
  CheckCircle
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { mockArtworks } from '@/lib/mockData';
import { Artwork } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton";
import ArtworkGrid from '@/components/ArtworkGrid';

const ArtworkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Simulate API call
    setIsLoading(true);
    
    setTimeout(() => {
      const found = mockArtworks.find(art => art.id === id);
      setArtwork(found || null);
      
      if (found) {
        // Set page title
        document.title = `${found.title} by ${found.artist} | Pixel Haven`;
        
        // Find related artworks (same category or artist)
        const related = mockArtworks
          .filter(art => 
            art.id !== found.id && 
            (art.category === found.category || art.artist === found.artist)
          )
          .slice(0, 4);
        
        setRelatedArtworks(related);
      } else {
        document.title = "Artwork Not Found | Pixel Haven";
      }
      
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const inWishlist = artwork ? isInWishlist(artwork.id) : false;

  const handleAddToCart = () => {
    if (artwork) {
      addItem(artwork);
      toast({
        title: "Added to cart!",
        description: `${artwork.title} has been added to your cart.`,
      });
    }
  };

  const handleWishlistToggle = () => {
    if (!artwork) return;
    
    if (inWishlist) {
      removeFromWishlist(artwork.id);
      toast({
        title: "Removed from wishlist",
        description: `${artwork.title} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(artwork);
      toast({
        title: "Added to wishlist!",
        description: `${artwork.title} has been added to your wishlist.`,
      });
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
      toast({
        title: "Link copied!",
        description: "The artwork link has been copied to your clipboard.",
      });
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
        <Footer />
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
        <Footer />
      </>
    );
  }

  return (
    <>
      <MainWebsiteNavbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/explore" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Explore
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Artwork Image */}
          <div className="md:w-1/2">
            <div className="bg-muted rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
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
                className="flex-1 hover:bg-muted/70"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleWishlistToggle}
                className={`flex-1 ${
                  inWishlist 
                    ? 'bg-accent/10 text-accent border-accent hover:bg-accent/20'
                    : 'hover:bg-muted/70'
                }`}
              >
                <Heart 
                  className={`mr-2 h-4 w-4 transition-colors ${inWishlist ? 'fill-accent' : ''}`} 
                />
                {inWishlist ? 'Saved' : 'Save to Wishlist'}
              </Button>
            </div>
          </div>

          {/* Artwork Details */}
          <div className="md:w-1/2">
            <Badge variant="outline" className="mb-3 bg-primary/10 text-primary border-primary hover:bg-primary/20">
              {artwork.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
            <p className="text-xl mb-3">by <span className="font-medium text-primary">{artwork.artist}</span></p>
            
            <div className="flex items-center mb-6">
              <p className="text-2xl font-bold text-pixel-primary">
                {formatPrice(artwork.price)}
              </p>
              <Badge variant="outline" className="ml-4 bg-muted">
                {artwork.dimensions}
              </Badge>
            </div>

            <div className="prose dark:prose-invert mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p>{artwork.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <TagIcon className="h-4 w-4 mr-2" /> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {artwork.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/50 p-3 rounded-lg flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="font-medium">{new Date(artwork.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg flex items-center">
                <Ruler className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Dimensions</p>
                  <p className="font-medium">{artwork.dimensions}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg mb-6 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
              <div>
                <p className="font-medium">Instant Digital Download</p>
                <p className="text-sm text-muted-foreground">
                  You'll receive this high-quality digital artwork immediately after purchase.
                </p>
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
        
        {/* Related Artworks Section */}
        {relatedArtworks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <ArtworkGrid artworks={relatedArtworks} />
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
};

export default ArtworkDetailPage;
