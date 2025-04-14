
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainWebsiteNavbar from '@/components/MainWebsiteNavbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { formatPrice, createPurchase } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { user, addPurchase } = useUser();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If cart is empty and not in completion stage, redirect to cart
    if (items.length === 0 && !isCompleted) {
      navigate('/cart');
    }
    
    // Pre-fill with user data if available
    if (user) {
      setEmail(user.email);
    }
  }, [items.length, isCompleted, navigate, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      const purchase = createPurchase(items, getCartTotal());
      
      // Add to user's purchase history
      addPurchase(purchase);
      
      // Clear cart
      clearCart();
      
      // Show success state
      setIsProcessing(false);
      setIsCompleted(true);
      
      toast({
        title: "Order Placed!",
        description: `Order #${purchase.orderId} has been confirmed.`,
      });
    }, 1500);
  };

  const validateForm = () => {
    if (!name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!address.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your address.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!city.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your city.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  if (isCompleted) {
    return (
      <>
        <MainWebsiteNavbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-xl mx-auto text-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your order has been confirmed and will be processed shortly.
            </p>
            
            <div className="text-left bg-card rounded-lg shadow-sm p-6 mb-8">
              <h2 className="font-bold text-xl mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/profile#purchases')}
                size="lg"
                className="w-full"
              >
                View Your Purchases
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => navigate('/explore')}
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MainWebsiteNavbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Delivery Details Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Delivery Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your street address"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP/Postal Code</Label>
                      <Input 
                        id="zip"
                        type="text"
                        placeholder="Enter postal code"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Confirm Purchase'}
                    </Button>
                  </div>
                </form>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-6 mt-6">
                <h3 className="font-medium mb-2">Note</h3>
                <p className="text-sm text-muted-foreground">
                  This is a demo checkout process. No actual payment will be processed, and no real products will be delivered.
                </p>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={item.artwork.id} className="flex gap-3">
                      <img 
                        src={item.artwork.imageUrl} 
                        alt={item.artwork.title} 
                        className="w-16 h-16 object-cover rounded" 
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.artwork.title}</h4>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-medium">{formatPrice(item.artwork.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                  
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>Taxes</span>
                    <span>Calculated at next step</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
