
import React, { useState } from 'react';
import { ArrowRight, ChevronRight, LineChart, BarChart3, Palette, Upload, Check, Users, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainWebsiteNavbar from '@/components/MainWebsiteNavbar';
import Footer from '@/components/Footer';
import { useUser } from '@/contexts/UserContext';
import { mockArtworks } from '@/lib/mockData';
import { useToast } from "@/components/ui/use-toast";

// Component for seller dashboard stats
const StatCard = ({ icon: Icon, title, value, trend, color }: { 
  icon: React.ElementType, 
  title: string, 
  value: string, 
  trend?: string,
  color: string
}) => (
  <Card className="backdrop-blur-sm bg-white/70 dark:bg-black/30 border-white/20 overflow-hidden">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color} text-white`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className={`text-xs ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'} flex items-center mt-1`}>
          {trend.startsWith('+') ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />}
          {trend} from last month
        </p>
      )}
    </CardContent>
  </Card>
);

// Define the upload stages for the wizard
type UploadStage = {
  id: number;
  title: string;
  description: string;
  component: React.ReactNode;
  isValid: boolean;
};

const SellerPage: React.FC = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [currentUploadStage, setCurrentUploadStage] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Example form state for artwork upload
  const [artworkTitle, setArtworkTitle] = useState('');
  const [artworkDescription, setArtworkDescription] = useState('');
  const [artworkPrice, setArtworkPrice] = useState('');
  const [artworkCategory, setArtworkCategory] = useState('');
  const [artworkImage, setArtworkImage] = useState<File | null>(null);
  
  // Filtered artworks that belong to this seller
  const myArtworks = mockArtworks.slice(0, 5); // Simulate this seller's artworks
  
  // Create upload stages for the wizard
  const uploadStages: UploadStage[] = [
    {
      id: 1,
      title: "Artwork Details",
      description: "Provide basic information about your artwork",
      isValid: !!artworkTitle && !!artworkDescription,
      component: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Artwork Title</label>
            <input
              type="text"
              value={artworkTitle}
              onChange={(e) => setArtworkTitle(e.target.value)}
              className="fun-input w-full"
              placeholder="My Amazing Pixel Art"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={artworkDescription}
              onChange={(e) => setArtworkDescription(e.target.value)}
              className="fun-input w-full h-24"
              placeholder="Describe your artwork..."
            />
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Pricing & Category",
      description: "Set your price and choose a category",
      isValid: !!artworkPrice && !!artworkCategory,
      component: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price (USD)</label>
            <input
              type="number"
              value={artworkPrice}
              onChange={(e) => setArtworkPrice(e.target.value)}
              className="fun-input w-full"
              placeholder="29.99"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={artworkCategory}
              onChange={(e) => setArtworkCategory(e.target.value)}
              className="fun-input w-full"
            >
              <option value="">Select a category</option>
              <option value="landscape">Landscape</option>
              <option value="character">Character</option>
              <option value="animation">Animation</option>
              <option value="gameAsset">Game Asset</option>
              <option value="abstract">Abstract</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Upload Image",
      description: "Upload your pixel art image",
      isValid: !!artworkImage,
      component: (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {artworkImage ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img 
                    src={URL.createObjectURL(artworkImage)} 
                    alt="Preview" 
                    className="max-h-48 rounded-lg" 
                  />
                </div>
                <p className="text-sm">{artworkImage.name}</p>
                <Button 
                  variant="outline"
                  onClick={() => setArtworkImage(null)}
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <label className="cursor-pointer block">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setArtworkImage(e.target.files[0]);
                    }
                  }}
                />
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium">Drag and drop your image here, or click to browse</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                </div>
              </label>
            )}
          </div>
        </div>
      )
    }
  ];

  const handleNextStage = () => {
    if (currentUploadStage < uploadStages.length - 1) {
      setCurrentUploadStage(currentUploadStage + 1);
    } else {
      // Submit the form
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        toast({
          title: "Artwork uploaded!",
          description: "Your artwork has been added to the marketplace.",
        });
        
        // Reset form
        setArtworkTitle('');
        setArtworkDescription('');
        setArtworkPrice('');
        setArtworkCategory('');
        setArtworkImage(null);
        setCurrentUploadStage(0);
      }, 1500);
    }
  };

  const handlePreviousStage = () => {
    if (currentUploadStage > 0) {
      setCurrentUploadStage(currentUploadStage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fun-purple/20 to-fun-mint/20 texture-overlay">
      <MainWebsiteNavbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Seller Header */}
          <div className="bg-fun-coral rounded-lg p-6 text-white mb-8 sketchy-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
                <p>Welcome back, {user?.username || 'Artist'}! Here's how your store is performing.</p>
              </div>
              <Button 
                className="bg-white text-fun-coral hover:bg-white/90 fun-button shadow-lg"
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Palette className="mr-2 h-4 w-4" />
                Sell New Artwork
              </Button>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              icon={ShoppingCart} 
              title="Total Sales" 
              value="142" 
              trend="+12.5%" 
              color="bg-fun-purple"
            />
            <StatCard 
              icon={DollarSign} 
              title="Revenue" 
              value="$2,845" 
              trend="+8.2%" 
              color="bg-fun-coral"
            />
            <StatCard 
              icon={Users} 
              title="Unique Buyers" 
              value="89" 
              trend="+24.3%" 
              color="bg-fun-mint"
            />
            <StatCard 
              icon={TrendingUp} 
              title="Conversion Rate" 
              value="3.2%" 
              trend="+1.1%" 
              color="bg-fun-yellow"
            />
          </div>
          
          {/* Analytics Section */}
          <div className="mb-12">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sales">Sales History</TabsTrigger>
                <TabsTrigger value="traffic">Traffic</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card className="backdrop-blur-sm bg-white/70 dark:bg-black/30 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Monthly Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 flex items-center justify-center">
                      <div className="flex items-end space-x-2 h-40 w-full max-w-md mx-auto">
                        {Array.from({ length: 7 }).map((_, i) => {
                          const height = Math.max(20, Math.random() * 100);
                          return (
                            <div key={i} className="flex-1 group">
                              <div 
                                className="bg-fun-purple hover:bg-fun-coral transition-all duration-300 rounded-t" 
                                style={{ height: `${height}%` }}
                              ></div>
                              <div className="text-xs text-center mt-1">{
                                ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]
                              }</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="backdrop-blur-sm bg-white/70 dark:bg-black/30 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">Popular Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Character Art</span>
                            <span>42%</span>
                          </div>
                          <Progress value={42} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Landscape</span>
                            <span>28%</span>
                          </div>
                          <Progress value={28} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Animation</span>
                            <span>18%</span>
                          </div>
                          <Progress value={18} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Game Assets</span>
                            <span>12%</span>
                          </div>
                          <Progress value={12} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="backdrop-blur-sm bg-white/70 dark:bg-black/30 border-white/20">
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {myArtworks.slice(0, 4).map((artwork) => (
                          <div key={artwork.id} className="flex items-center gap-3">
                            <img 
                              src={artwork.imageUrl} 
                              alt={artwork.title}
                              className="h-10 w-10 rounded object-cover"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium truncate">{artwork.title}</p>
                              <p className="text-xs text-muted-foreground">Sold 2 days ago</p>
                            </div>
                            <div className="font-medium">${artwork.price}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="sales">
                <Card className="backdrop-blur-sm bg-white/70 dark:bg-black/30 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Sales History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10">
                      <LineChart className="h-16 w-16 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Detailed Sales Analytics</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        More detailed sales analytics would be available here in a real application.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="traffic">
                <Card className="backdrop-blur-sm bg-white/70 dark:bg-black/30 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Traffic Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10">
                      <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Traffic Analytics</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Information about your store's visitors and traffic sources would be shown here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Upload New Artwork Section */}
          <div id="upload-section" className="pt-6">
            <div className="bg-fun-mint rounded-lg p-6 text-pixel-dark mb-8 sketchy-border">
              <h2 className="text-2xl font-bold mb-4">Upload New Artwork</h2>
              <p className="mb-6">Share your creativity with the world! Complete the steps below to add your pixel art to the marketplace.</p>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {uploadStages.map((stage, index) => (
                    <div 
                      key={stage.id} 
                      className={`flex items-center ${index <= currentUploadStage ? 'text-pixel-dark' : 'text-muted-foreground'}`}
                    >
                      <div className={`
                        h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
                        ${index < currentUploadStage ? 'bg-fun-coral text-white' : 
                          index === currentUploadStage ? 'bg-fun-purple text-white' : 
                          'bg-muted text-muted-foreground'}
                      `}>
                        {index < currentUploadStage ? <Check className="h-4 w-4" /> : index + 1}
                      </div>
                      <span className="hidden sm:inline ml-2 text-sm font-medium">{stage.title}</span>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-1 bg-muted rounded">
                      <div 
                        className="h-1 bg-fun-purple rounded transition-all duration-300"
                        style={{ width: `${(currentUploadStage / (uploadStages.length - 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Current Step Content */}
              <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
                <h3 className="text-xl font-medium mb-2">{uploadStages[currentUploadStage].title}</h3>
                <p className="text-muted-foreground mb-6">{uploadStages[currentUploadStage].description}</p>
                
                {uploadStages[currentUploadStage].component}
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStage}
                  disabled={currentUploadStage === 0 || isUploading}
                >
                  Back
                </Button>
                
                <Button 
                  onClick={handleNextStage}
                  disabled={!uploadStages[currentUploadStage].isValid || isUploading}
                  className="bg-fun-coral text-white hover:bg-fun-coral/90"
                >
                  {isUploading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></span>
                      Uploading...
                    </span>
                  ) : currentUploadStage === uploadStages.length - 1 ? (
                    <span className="flex items-center">
                      Upload Artwork
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
            
            {/* My Artworks Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">My Artworks</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {myArtworks.map((artwork) => (
                  <Card key={artwork.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 sketchy-border">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={artwork.imageUrl} 
                        alt={artwork.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-1">{artwork.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">${artwork.price}</span>
                        <span className="text-xs text-muted-foreground">
                          {Math.floor(Math.random() * 50)} sold
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SellerPage;
