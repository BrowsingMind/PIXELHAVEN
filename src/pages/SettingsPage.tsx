
import React, { useState, useEffect } from 'react';
import MainWebsiteNavbar from '@/components/MainWebsiteNavbar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sun, 
  Moon, 
  Type, 
  Palette, 
  RotateCcw 
} from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { AppSettings } from '@/lib/types';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [tempSettings, setTempSettings] = useState<AppSettings>(settings);
  const [activeTab, setActiveTab] = useState('appearance');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update tempSettings when settings change
  useEffect(() => {
    setTempSettings(settings);
  }, [settings]);

  const handleApplyChanges = () => {
    updateSettings(tempSettings);
  };

  // Check if settings have been modified
  const hasChanges = () => {
    return (
      settings.theme !== tempSettings.theme ||
      settings.fontSize !== tempSettings.fontSize ||
      settings.primaryButtonColor !== tempSettings.primaryButtonColor
    );
  };

  return (
    <>
      <MainWebsiteNavbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="appearance" className="flex items-center">
                <Palette className="mr-2 h-4 w-4" />
                Appearance
              </TabsTrigger>
            </TabsList>

            {/* Appearance Settings */}
            <TabsContent value="appearance">
              <div className="space-y-6">
                {/* Theme Setting */}
                <Card>
                  <CardHeader>
                    <CardTitle>Theme</CardTitle>
                    <CardDescription>
                      Choose between light and dark mode for the application.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-8 mb-6">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="dark-mode" 
                          checked={tempSettings.theme === 'dark'}
                          onCheckedChange={(checked) => 
                            setTempSettings((prev) => ({ 
                              ...prev, 
                              theme: checked ? 'dark' : 'light' 
                            }))
                          }
                        />
                        <Label htmlFor="dark-mode" className="flex items-center gap-2">
                          {tempSettings.theme === 'dark' ? (
                            <>
                              <Moon className="h-4 w-4" />
                              Dark Mode
                            </>
                          ) : (
                            <>
                              <Sun className="h-4 w-4" />
                              Light Mode
                            </>
                          )}
                        </Label>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div 
                        className={`bg-white border rounded-lg p-4 flex flex-col items-center transition-all ${
                          tempSettings.theme === 'light' 
                            ? 'ring-2 ring-pixel-primary' 
                            : 'opacity-70'
                        }`}
                        onClick={() => setTempSettings((prev) => ({ ...prev, theme: 'light' }))}
                      >
                        <div className="h-32 w-full bg-white border rounded mb-4 relative overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-8 bg-pixel-primary flex items-center px-2">
                            <div className="h-2 w-2 rounded-full bg-white mr-1"></div>
                            <div className="h-2 w-2 rounded-full bg-white mr-1"></div>
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          </div>
                          <div className="absolute top-12 left-4 w-16 h-4 bg-gray-300 rounded"></div>
                          <div className="absolute top-18 left-4 w-24 h-4 bg-gray-200 rounded"></div>
                          <div className="absolute top-24 left-4 w-20 h-4 bg-gray-300 rounded"></div>
                        </div>
                        <span className="text-sm font-medium">Light</span>
                      </div>
                      
                      <div 
                        className={`bg-pixel-dark text-white border rounded-lg p-4 flex flex-col items-center transition-all ${
                          tempSettings.theme === 'dark' 
                            ? 'ring-2 ring-pixel-primary' 
                            : 'opacity-70'
                        }`}
                        onClick={() => setTempSettings((prev) => ({ ...prev, theme: 'dark' }))}
                      >
                        <div className="h-32 w-full bg-gray-900 border border-gray-700 rounded mb-4 relative overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-8 bg-pixel-primary flex items-center px-2">
                            <div className="h-2 w-2 rounded-full bg-white mr-1"></div>
                            <div className="h-2 w-2 rounded-full bg-white mr-1"></div>
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          </div>
                          <div className="absolute top-12 left-4 w-16 h-4 bg-gray-700 rounded"></div>
                          <div className="absolute top-18 left-4 w-24 h-4 bg-gray-800 rounded"></div>
                          <div className="absolute top-24 left-4 w-20 h-4 bg-gray-700 rounded"></div>
                        </div>
                        <span className="text-sm font-medium">Dark</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Font Size Setting */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Font Size
                    </CardTitle>
                    <CardDescription>
                      Adjust the font size for better readability.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={tempSettings.fontSize} 
                      onValueChange={(value) => 
                        setTempSettings((prev) => ({ 
                          ...prev, 
                          fontSize: value as AppSettings['fontSize'] 
                        }))
                      }
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="small" id="font-small" />
                        <Label htmlFor="font-small" className="text-sm">Small</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="font-medium" />
                        <Label htmlFor="font-medium" className="text-base">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="large" id="font-large" />
                        <Label htmlFor="font-large" className="text-lg">Large</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Primary Button Color Setting */}
                <Card>
                  <CardHeader>
                    <CardTitle>Primary Button Color</CardTitle>
                    <CardDescription>
                      Choose a color for primary buttons in the application.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="button-color">Custom Color</Label>
                        <Input
                          id="button-color"
                          type="color"
                          value={tempSettings.primaryButtonColor}
                          onChange={(e) => 
                            setTempSettings((prev) => ({ 
                              ...prev, 
                              primaryButtonColor: e.target.value 
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Presets</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {['#6D28D9', '#0D9488', '#EC4899', '#F59E0B', '#10B981', '#EF4444'].map((color) => (
                            <button
                              key={color}
                              className="w-full aspect-square rounded-md border"
                              style={{ backgroundColor: color }}
                              onClick={() => 
                                setTempSettings((prev) => ({ 
                                  ...prev, 
                                  primaryButtonColor: color 
                                }))
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Label>Preview</Label>
                      <div className="flex items-center justify-center bg-muted rounded-lg p-6 mt-2">
                        <Button 
                          style={{ backgroundColor: tempSettings.primaryButtonColor }}
                          className="transition-colors"
                        >
                          Button Preview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Actions */}
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={resetSettings}
                    className="flex items-center"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </Button>
                  
                  <Button 
                    onClick={handleApplyChanges} 
                    disabled={!hasChanges()}
                  >
                    Apply Changes
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
