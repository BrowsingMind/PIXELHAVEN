
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Artwork } from '@/lib/types';
import { formatPrice, truncateText } from '@/lib/utils';

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();

  const inWishlist = isInWishlist(artwork.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(artwork);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(artwork.id);
    } else {
      addToWishlist(artwork);
    }
  };

  return (
    <Link to={`/artwork/${artwork.id}`}>
      <Card 
        className="overflow-hidden transition-all duration-300 h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title}
            className="w-full aspect-square object-cover"
          />
          
          <div 
            className={`absolute inset-0 bg-black/50 flex flex-col justify-center items-center gap-3 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button 
              variant="default"
              size="sm" 
              className="bg-white text-pixel-dark hover:bg-white/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" /> 
              Add to Cart
            </Button>
            
            <Button 
              variant="outline"
              size="sm" 
              className={`border-white text-white hover:bg-white/20 ${
                inWishlist ? 'bg-white/20' : 'bg-transparent'
              }`}
              onClick={handleWishlistToggle}
            >
              <Heart 
                className={`h-4 w-4 mr-2 ${inWishlist ? 'fill-white' : ''}`} 
              /> 
              {inWishlist ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold truncate">{artwork.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">by {artwork.artist}</p>
          <div className="flex justify-between items-center">
            <span className="font-medium">{formatPrice(artwork.price)}</span>
            <span className="text-xs text-muted-foreground">{artwork.dimensions}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArtworkCard;
