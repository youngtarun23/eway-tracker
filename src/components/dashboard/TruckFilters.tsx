
import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Filters, SortOption } from '@/types';

interface TruckFiltersProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string | boolean) => void;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
}

const TruckFilters: React.FC<TruckFiltersProps> = ({ 
  filters, 
  onFilterChange, 
  sortOption, 
  onSortChange 
}) => {
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filters</h4>
              <p className="text-sm text-muted-foreground">
                Filter trucks by different criteria
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={filters.status} 
                  onValueChange={(value) => onFilterChange('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Any status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={filters.type} 
                  onValueChange={(value) => onFilterChange('type', value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Any type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pickup">Pickup</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="transit">Transit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <Select value={sortOption} onValueChange={onSortChange}>
        <SelectTrigger className="h-8 w-[180px]">
          <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="name_asc">Name (A-Z)</SelectItem>
          <SelectItem value="name_desc">Name (Z-A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TruckFilters;
