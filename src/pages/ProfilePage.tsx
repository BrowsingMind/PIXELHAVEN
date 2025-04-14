
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainWebsiteNavbar from '@/components/MainWebsiteNavbar';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Heart, 
  Package, 
  Settings, 
  Upload, 
  Trash2, 
  ShoppingBag,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { formatPrice } from '@/lib/utils';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useUser();
  const { items: wishlistItems, removeItem: removeFromWishlist } = useWishlist();
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [activeTab, setActiveTab] = useState('wishlist');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check for hash in URL to set active tab
    const hash = window.location.hash.substring(1);
    if (hash === 'wishlist' || hash === 'purchases' || hash === 'edit') {
      setActiveTab(hash);
    }
  }, []);

  // Set initial form values when user data is loaded
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAvatarUrl(user.avatar);
    }
  }, [user]);

  // Handle form submission for profile edit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateProfile({
      ...user,
      username,
      avatar: avatarUrl,
    });
  };

  // Handle avatar file upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, this would upload the file to a server
    // For now, we'll just create a data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  if (!user) {
    return (
      <>
        <MainWebsiteNavbar />
        <div className="container mx-auto px-4 pt-24 pb-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
          <p className="text-muted-foreground mb-6">
            You need to be logged in to view your profile.
          </p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <MainWebsiteNavbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 mb-8">
            <Card>
              <CardHeader>
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-center">{user.username}</CardTitle>
                  <CardDescription className="text-center">{user.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="#wishlist" onClick={() => setActiveTab('wishlist')} className="block">
                  <Button 
                    variant={activeTab === 'wishlist' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Saved Artworks
                  </Button>
                </Link>
                <Link to="#purchases" onClick={() => setActiveTab('purchases')} className="block">
                  <Button 
                    variant={activeTab === 'purchases' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Purchase History
                  </Button>
                </Link>
                <Link to="#edit" onClick={() => setActiveTab('edit')} className="block">
                  <Button 
                    variant={activeTab === 'edit' ? 'default' : 'ghost'} 
                    className="w-full justify-start"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
              <CardFooter>
                <Link to="/settings" className="block w-full">
                  <Button variant="outline" className="w-full">
                    App Settings
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="wishlist" className="flex items-center">
                  <Heart className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Saved Artworks</span>
                  <span className="sm:hidden">Saved</span>
                </TabsTrigger>
                <TabsTrigger value="purchases" className="flex items-center">
                  <Package className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Purchase History</span>
                  <span className="sm:hidden">Purchases</span>
                </TabsTrigger>
                <TabsTrigger value="edit" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Edit Profile</span>
                  <span className="sm:hidden">Edit</span>
                </TabsTrigger>
              </TabsList>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <h2 className="text-2xl font-bold mb-4">Saved Artworks</h2>
                
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No saved artworks yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Browse our collection and save the artworks you love.
                    </p>
                    <Link to="/explore">
                      <Button>Explore Artworks</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                      <Card key={item.artwork.id} className="overflow-hidden">
                        <Link to={`/artwork/${item.artwork.id}`}>
                          <div className="aspect-square overflow-hidden">
                            <img 
                              src={item.artwork.imageUrl} 
                              alt={item.artwork.title}
                              className="w-full h-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                        </Link>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">
                            <Link 
                              to={`/artwork/${item.artwork.id}`} 
                              className="hover:text-pixel-primary transition-colors"
                            >
                              {item.artwork.title}
                            </Link>
                          </CardTitle>
                          <CardDescription>by {item.artwork.artist}</CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <span className="font-medium">
                            {formatPrice(item.artwork.price)}
                          </span>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => removeFromWishlist(item.artwork.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Purchase History Tab */}
              <TabsContent value="purchases">
                <h2 className="text-2xl font-bold mb-4">Purchase History</h2>
                
                {user.purchases.length === 0 ? (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No purchases yet</h3>
                    <p className="text-muted-foreground mb-6">
                      Your purchase history will appear here after you buy some pixel art.
                    </p>
                    <Link to="/explore">
                      <Button>Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {user.purchases.map((purchase) => (
                      <Card key={purchase.orderId}>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>Order #{purchase.orderId}</CardTitle>
                            <div className="text-right text-sm">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>
                                  {new Date(purchase.purchaseDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center mt-1">
                                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {formatPrice(purchase.total)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {purchase.items.map((item) => (
                              <div key={item.artwork.id} className="flex gap-4">
                                <Link 
                                  to={`/artwork/${item.artwork.id}`}
                                  className="w-16 h-16 rounded overflow-hidden"
                                >
                                  <img 
                                    src={item.artwork.imageUrl} 
                                    alt={item.artwork.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </Link>
                                <div className="flex-1">
                                  <Link 
                                    to={`/artwork/${item.artwork.id}`}
                                    className="font-medium hover:text-pixel-primary transition-colors"
                                  >
                                    {item.artwork.title}
                                  </Link>
                                  <p className="text-sm text-muted-foreground">
                                    by {item.artwork.artist}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">
                                    {formatPrice(item.artwork.price * item.quantity)}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Qty: {item.quantity}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Edit Profile Tab */}
              <TabsContent value="edit">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>
                      Update your profile information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="avatar">Avatar</Label>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={avatarUrl} alt={username} />
                            <AvatarFallback>{username[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Input
                              id="avatar-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleAvatarChange}
                            />
                            <Label 
                              htmlFor="avatar-upload" 
                              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 py-2 px-4"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Upload New Avatar
                            </Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input 
                          id="username" 
                          type="text" 
                          value={username} 
                          onChange={(e) => setUsername(e.target.value)} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={user.email} 
                          disabled 
                          className="bg-muted/50"
                        />
                        <p className="text-xs text-muted-foreground">
                          Email address cannot be changed.
                        </p>
                      </div>
                      
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
