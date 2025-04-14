
import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Artwork } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

interface CartContextType {
  items: CartItem[];
  addItem: (artwork: Artwork) => void;
  removeItem: (artworkId: string) => void;
  updateQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("pixelHavenCart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pixelHavenCart", JSON.stringify(items));
  }, [items]);

  const addItem = (artwork: Artwork) => {
    setItems((prevItems) => {
      // Check if item already exists
      const existingItem = prevItems.find((item) => item.artwork.id === artwork.id);
      
      if (existingItem) {
        // If it exists, increment quantity
        toast({
          title: "Item already in cart",
          description: `Increased quantity of "${artwork.title}" to ${existingItem.quantity + 1}`,
        });
        
        return prevItems.map((item) =>
          item.artwork.id === artwork.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it doesn't exist, add new item
        toast({
          title: "Added to cart",
          description: `"${artwork.title}" has been added to your cart.`,
        });
        
        return [...prevItems, { artwork, quantity: 1 }];
      }
    });
  };

  const removeItem = (artworkId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.artwork.id !== artworkId));
    
    toast({
      title: "Removed from cart",
      description: "The item has been removed from your cart.",
    });
  };

  const updateQuantity = (artworkId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(artworkId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.artwork.id === artworkId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getCartTotal = () => {
    return items.reduce(
      (total, item) => total + item.artwork.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
