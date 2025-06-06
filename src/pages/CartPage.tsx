
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainWebsiteNavbar from '@/components/MainWebsiteNavbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag,
  Lock,
  CreditCard
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getCartTotal } = useCart();
  const { toast } = useToast();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set document title
    document.title = "Your Cart | Pixel Haven";
  }, []);

  const handleQuantityChange = (artworkId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      updateQuantity(artworkId, newQuantity);
    }
  };

  const handleIncrement = (artworkId: string, currentQuantity: number) => {
    updateQuantity(artworkId, currentQuantity + 1);
  };

  const handleDecrement = (artworkId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(artworkId, currentQuantity - 1);
    }
  };
  
  const handleRemoveItem = (artworkId: string, title: string) => {
    removeItem(artworkId);
    toast({
      title: "Item removed",
      description: `"${title}" has been removed from your cart.`,
    });
  };

  return (
    <>
      <MainWebsiteNavbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-muted/30 rounded-lg">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Looks like you haven't added any pixel art to your cart yet. 
              Explore our collection to find unique digital creations.
            </p>
            <Link to="/explore">
              <Button size="lg" className="px-8">
                Browse Artworks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5 text-muted-foreground" />
                    {items.length} {items.length === 1 ? "Item" : "Items"}
                  </h2>

                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.artwork.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                        <Link 
                          to={`/artwork/${item.artwork.id}`}
                          className="sm:w-24 sm:h-24 rounded overflow-hidden"
                        >
                          <img 
                            src={item.artwork.imageUrl} 
                            alt={item.artwork.title} 
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <Link 
                              to={`/artwork/${item.artwork.id}`}
                              className="font-medium hover:text-pixel-primary transition-colors"
                            >
                              {item.artwork.title}
                            </Link>
                            <span className="font-semibold text-pixel-primary">
                              {formatPrice(item.artwork.price * item.quantity)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            by {item.artwork.artist} • {item.artwork.dimensions}
                          </p>
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleDecrement(item.artwork.id, item.quantity)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              
                              <Input 
                                type="number" 
                                min="1"
                                value={item.quantity} 
                                onChange={(e) => handleQuantityChange(item.artwork.id, e)}
                                className="w-14 h-8 text-center"
                              />
                              
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleIncrement(item.artwork.id, item.quantity)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                              onClick={() => handleRemoveItem(item.artwork.id, item.artwork.title)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" /> 
                  Order Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                  
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-pixel-primary">{formatPrice(getCartTotal())}</span>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <Link to="/checkout" className="block w-full">
                      <Button className="w-full" size="lg">
                        <Lock className="mr-2 h-4 w-4" />
                        Proceed to Checkout
                      </Button>
                    </Link>
                    
                    <Link to="/explore" className="block w-full">
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="pt-4 text-center text-xs text-muted-foreground">
                    <p className="flex items-center justify-center">
                      <Lock className="h-3 w-3 mr-1" /> Secure checkout
                    </p>
                    <p className="mt-1">
                      Your payment information is processed securely.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
};

export default CartPage;
