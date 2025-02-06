import { WineFormData } from "@/components/wine-form/types";
import { WineCard } from "@/components/WineCard";

interface WineGridProps {
  wines: WineFormData[];
  isLoading: boolean;
}

export const WineGrid = ({ wines, isLoading }: WineGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-64 bg-gray-100 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
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
        <WineCard key={wine.name} wine={wine} />
      ))}
    </div>
  );
};