
import React, { createContext, useContext, useEffect, useState } from "react";
import { AppSettings } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: AppSettings = {
  theme: "light",
  fontSize: "medium",
  primaryButtonColor: "#6D28D9",
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const { toast } = useToast();

  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedSettings = localStorage.getItem("pixelHavenSettings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Failed to parse settings from localStorage:", error);
      }
    }
    
    // Apply theme setting
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Apply font size setting
    document.documentElement.style.fontSize = 
      settings.fontSize === "small" ? "14px" : 
      settings.fontSize === "large" ? "18px" : "16px";
      
  }, []);

  // Save settings to localStorage and apply changes whenever they change
  useEffect(() => {
    localStorage.setItem("pixelHavenSettings", JSON.stringify(settings));
    
    // Apply theme setting
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Apply font size setting
    document.documentElement.style.fontSize = 
      settings.fontSize === "small" ? "14px" : 
      settings.fontSize === "large" ? "18px" : "16px";
      
  }, [settings]);

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...updates }));
    
    toast({
      title: "Settings updated",
      description: "Your preferences have been saved.",
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    
    toast({
      title: "Settings reset",
      description: "Your preferences have been reset to default values.",
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
