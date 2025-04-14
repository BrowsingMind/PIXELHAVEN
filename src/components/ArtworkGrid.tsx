
import React from 'react';
import ArtworkCard from './ArtworkCard';
import { Artwork } from '@/lib/types';
import { Skeleton } from "@/components/ui/skeleton"; 

interface ArtworkGridProps {
  artworks: Artwork[];
  isLoading?: boolean;
}

const ArtworkGrid: React.FC<ArtworkGridProps> = ({ artworks, isLoading = false }) => {
  // Number of skeleton cards to show while loading
  const skeletonCount = 6;
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(skeletonCount).fill(0).map((_, index) => (
          <div key={index} className="w-full">
            <Skeleton className="w-full aspect-square rounded-t-md" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (artworks.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-semibold mb-2">No artworks found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
};

export default ArtworkGrid;
