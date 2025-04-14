
import React, { createContext, useContext, useEffect, useState } from "react";
import { WishlistItem, Artwork } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (artwork: Artwork) => void;
  removeItem: (artworkId: string) => void;
  isInWishlist: (artworkId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("pixelHavenWishlist");
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pixelHavenWishlist", JSON.stringify(items));
  }, [items]);

  const addItem = (artwork: Artwork) => {
    setItems((prevItems) => {
      // Check if item already exists
      const existingItem = prevItems.find((item) => item.artwork.id === artwork.id);
      
      if (existingItem) {
        toast({
          title: "Already in wishlist",
          description: `"${artwork.title}" is already in your wishlist.`,
        });
        return prevItems;
      } else {
        toast({
          title: "Added to wishlist",
          description: `"${artwork.title}" has been added to your wishlist.`,
        });
        return [...prevItems, { artwork, addedAt: new Date().toISOString() }];
      }
    });
  };

  const removeItem = (artworkId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.artwork.id !== artworkId));
    
    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist.",
    });
  };

  const isInWishlist = (artworkId: string) => {
    return items.some((item) => item.artwork.id === artworkId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
