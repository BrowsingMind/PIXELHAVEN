
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, Purchase } from "@/lib/types";
import { mockUserProfile } from "@/lib/mockData";
import { useToast } from "@/components/ui/use-toast";

interface UserContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addPurchase: (purchase: Purchase) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("pixelHavenUser");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("pixelHavenUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("pixelHavenUser");
    }
  }, [user]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    
    setUser({ ...user, ...updates });
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const addPurchase = (purchase: Purchase) => {
    if (!user) return;
    
    setUser({
      ...user,
      purchases: [purchase, ...user.purchases],
    });
    
    toast({
      title: "Purchase complete",
      description: `Order #${purchase.orderId} has been placed successfully.`,
    });
  };

  const login = (username: string, password: string) => {
    // This is a mock login function
    // In a real app, this would make an API call
    
    // For demo purposes, we'll use the mockUserProfile
    setUser(mockUserProfile);
    setIsLoggedIn(true);
    
    toast({
      title: "Logged in",
      description: `Welcome back, ${mockUserProfile.username}!`,
    });
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        updateProfile,
        addPurchase,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
