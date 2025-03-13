
import { WineFormData } from "@/components/wine-form/types";
import { WineCard } from "@/components/WineCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

interface WineGridProps {
  wines: WineFormData[];
  isLoading: boolean;
}

export const WineGrid = ({ wines, isLoading }: WineGridProps) => {
  // Memoize the skeleton loaders to prevent re-renders during loading
  const skeletonLoaders = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border shadow overflow-hidden">
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-16 w-full mt-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ), []);

  if (isLoading) {
    return skeletonLoaders;
  }

  if (!wines.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No wines found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wines.map((wine) => (
        <WineCard key={wine.id || wine.name} wine={wine} />
      ))}
    </div>
  );
};
