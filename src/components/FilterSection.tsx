
import React from 'react';
import { FilterIcon, CalendarIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { TruckStatus } from '@/types';

interface FilterSectionProps {
  statusFilter: TruckStatus | 'All';
  setStatusFilter: (status: TruckStatus | 'All') => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

export function FilterSection({
  statusFilter,
  setStatusFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  sortBy,
  setSortBy
}: FilterSectionProps) {
  return (
    <div className="bg-white rounded-xl border p-4 space-y-4">
      <h2 className="text-lg font-medium flex items-center gap-2">
        <FilterIcon size={18} className="text-muted-foreground" />
        Filters and Sorting
      </h2>
      
      <div className="flex flex-wrap gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Status</p>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as TruckStatus | 'All')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="On-Track">On-Track</SelectItem>
              <SelectItem value="Delayed">Delayed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">Date Range</p>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, 'PP') : <span>Start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate || undefined}
                  onSelect={(date) => setStartDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <span className="text-sm text-muted-foreground">to</span>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, 'PP') : <span>End date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate || undefined}
                  onSelect={(date) => setEndDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            {(startDate || endDate) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">Sort By</p>
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as any)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">
                <div className="flex items-center gap-2">
                  <CalendarIcon size={14} />
                  <span>Date (Newest First)</span>
                </div>
              </SelectItem>
              <SelectItem value="date-asc">
                <div className="flex items-center gap-2">
                  <CalendarIcon size={14} />
                  <span>Date (Oldest First)</span>
                </div>
              </SelectItem>
              <SelectItem value="status">
                <div className="flex items-center gap-2">
                  <FilterIcon size={14} />
                  <span>Status</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
