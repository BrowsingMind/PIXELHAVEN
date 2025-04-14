
import React, { useEffect, useState } from 'react';
import MainWebsiteNavbar from '@/components/MainWebsiteNavbar';
import ArtworkGrid from '@/components/ArtworkGrid';
import { mockArtworks } from '@/lib/mockData';
import { Artwork } from '@/lib/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const ExplorePage: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>(mockArtworks);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Simulate loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter and sort artworks
  useEffect(() => {
    let filtered = [...mockArtworks];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artwork.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artwork.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (category) {
      filtered = filtered.filter(
        (artwork) => artwork.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    setArtworks(filtered);
  }, [searchQuery, category, sortBy]);

  // Get unique categories from the artwork data
  const categories = Array.from(
    new Set(mockArtworks.map((artwork) => artwork.category))
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied via useEffect
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCategory("");
    setSortBy("newest");
  };

  return (
    <>
      <MainWebsiteNavbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Explore Artworks</h1>
          
          <div className="flex items-center gap-2">
            {/* Sort dropdown for desktop */}
            <div className="hidden md:block">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Filter drawer for mobile */}
            <div className="md:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Filter and Sort</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-categories">All Categories</SelectItem>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat.toLowerCase()}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Sort By</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="oldest">Oldest</SelectItem>
                          <SelectItem value="price-asc">Price: Low to High</SelectItem>
                          <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button onClick={clearFilters} variant="outline">Clear Filters</Button>
                    <DrawerClose asChild>
                      <Button>Apply Filters</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
        
        {/* Search and filters for desktop */}
        <div className="hidden md:flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search artworks by title, artist, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          <div className="w-48">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {(searchQuery || category || sortBy !== "newest") && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFilters}
              className="hidden md:flex"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Search for mobile */}
        <div className="md:hidden mb-6">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search artworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
        
        {/* Active filters indicator */}
        {(searchQuery || category || sortBy !== "newest") && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <div className="bg-muted text-sm px-2 py-1 rounded-md flex items-center gap-1">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery("")}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {category && (
              <div className="bg-muted text-sm px-2 py-1 rounded-md flex items-center gap-1">
                Category: {category}
                <button onClick={() => setCategory("")}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {sortBy !== "newest" && (
              <div className="bg-muted text-sm px-2 py-1 rounded-md flex items-center gap-1">
                Sort: {sortBy.replace("-", " ")}
                <button onClick={() => setSortBy("newest")}>
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Clear all
            </Button>
          </div>
        )}
        
        {/* Results count */}
        <div className="text-sm text-muted-foreground mb-6">
          Showing {artworks.length} {artworks.length === 1 ? "artwork" : "artworks"}
        </div>
        
        {/* Artwork Grid */}
        <ArtworkGrid artworks={artworks} isLoading={isLoading} />
      </div>
    </>
  );
};

export default ExplorePage;
