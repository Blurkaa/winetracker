import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface WineSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const WineSearch = ({ searchQuery, setSearchQuery }: WineSearchProps) => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search wines by name, producer, or grape variety..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9"
      />
    </div>
  );
};