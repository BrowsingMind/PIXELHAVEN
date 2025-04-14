
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import { X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const CartPreview = () => {
  const { items, removeItem, getCartTotal } = useCart();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h3 className="font-semibold">Your Cart</h3>
        <span className="text-sm text-muted-foreground">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
      </div>
      
      {items.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Link to="/explore">
            <Button size="sm" variant="outline">Browse Artworks</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.artwork.id} className="flex items-center space-x-3 py-2 border-b">
                <img 
                  src={item.artwork.imageUrl} 
                  alt={item.artwork.title} 
                  className="h-12 w-12 object-cover rounded" 
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{item.artwork.title}</h4>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-sm font-medium">{formatPrice(item.artwork.price * item.quantity)}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6" 
                    onClick={() => removeItem(item.artwork.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-2 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">{formatPrice(getCartTotal())}</span>
            </div>
            
            <div className="space-y-2">
              <Link to="/cart" className="block w-full">
                <Button variant="outline" size="sm" className="w-full">
                  View Cart
                </Button>
              </Link>
              <Link to="/checkout" className="block w-full">
                <Button size="sm" className="w-full">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPreview;
