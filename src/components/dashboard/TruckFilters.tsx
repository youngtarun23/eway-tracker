
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface TruckFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  startDate?: Date | null;
  setStartDate?: (date: Date | null) => void;
  endDate?: Date | null;
  setEndDate?: (date: Date | null) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export function TruckFilters({
  statusFilter,
  setStatusFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  sortBy,
  setSortBy
}: TruckFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center">
        <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
        <span className="text-sm font-medium">Filters:</span>
      </div>
      
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="h-8 w-[120px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="On-Track">On-Track</SelectItem>
          <SelectItem value="Delayed">Delayed</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="ml-auto">
        <span className="text-sm mr-2">Sort:</span>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="vehicle-asc">Vehicle # (A-Z)</SelectItem>
            <SelectItem value="vehicle-desc">Vehicle # (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default TruckFilters;
