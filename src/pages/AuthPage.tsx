
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from '@/contexts/UserContext';
import Footer from '@/components/Footer';

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Simple login - in a real app this would contact a backend
    login(username, password);
    toast({
      title: "Welcome back!",
      description: `You've successfully logged in as ${username}`,
    });
    navigate('/profile');
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Simple signup - in a real app this would contact a backend
    login(username, password); // Using the same login function to simulate account creation
    toast({
      title: "Account created!",
      description: `Welcome to Pixel Haven, ${username}`,
    });
    navigate('/profile');
  };
  
  // Generate blobs for background effect
  const blobs = Array(5).fill(0).map((_, i) => {
    const colors = ['bg-fun-coral', 'bg-fun-purple', 'bg-fun-mint', 'bg-fun-yellow', 'bg-fun-blue'];
    const sizes = ['w-64 h-64', 'w-80 h-80', 'w-96 h-96', 'w-72 h-72', 'w-48 h-48'];
    const positions = [
      'top-1/4 left-1/4', 
      'bottom-1/3 right-1/4', 
      'top-3/4 left-1/3', 
      'top-1/2 right-1/3',
      'bottom-1/4 left-1/2'
    ];
    
    return (
      <div 
        key={i}
        className={`fun-blob ${colors[i]} ${sizes[i]} ${positions[i]}`}
        style={{ 
          transform: `rotate(${i * 45}deg)`,
          animation: `float ${3 + i}s ease-in-out infinite`
        }}
      />
    );
  });
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-fun-purple/30 to-fun-mint/30">
      {/* Background blobs */}
      {blobs}
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Pixel<span className="text-pixel-accent">Haven</span>
            </h1>
            <p className="text-muted-foreground">Your favorite digital art marketplace</p>
          </div>
          
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-black/50 border-white/20">
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </TabsContent>
                
                <TabsContent value="signup">
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Enter your details to create a new account</CardDescription>
                </TabsContent>
              </Tabs>
            </CardHeader>
            
            <CardContent>
              {activeTab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Your username"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-sm text-pixel-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Input 
                      id="password" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-username">Username</Label>
                    <Input 
                      id="signup-username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose a username"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-black px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Google
                </Button>
                <Button variant="outline" className="flex-1">
                  Twitter
                </Button>
                <Button variant="outline" className="flex-1">
                  Discord
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="text-center mt-6">
            <a 
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to home
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
