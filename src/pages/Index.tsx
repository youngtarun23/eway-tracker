import { useState, useRef } from 'react';
import { useTruckData } from '@/hooks/useTruckData';
import { useTruckSearch } from '@/hooks/useTruckSearch';
import { useTruckFilters } from '@/hooks/useTruckFilters';
import { useCSVUpload } from '@/hooks/useCSVUpload';
import { TruckCard } from '@/components/TruckCard';
import { SummaryCard } from '@/components/SummaryCard';
import { AddTruckDialog } from '@/components/AddTruckDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Upload, Truck, CalendarIcon, FilterIcon, ArrowDown, ArrowUp, SortAsc } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TruckStatus } from '@/types';

const Index = () => {
  const { trucks, summary, addTruck, importTrucksFromCSV } = useTruckData();
  const { searchQuery, setSearchQuery, filteredTrucks: searchedTrucks } = useTruckSearch(trucks);
  const { 
    statusFilter, 
    setStatusFilter, 
    startDate, 
    setStartDate, 
    endDate, 
    setEndDate, 
    filteredTrucks 
  } = useTruckFilters(searchedTrucks);
  const { isLoading, handleFileUpload } = useCSVUpload(importTrucksFromCSV);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadHover, setUploadHover] = useState(false);
  const [companyName, setCompanyName] = useState("Transport Co.");
  const [sortBy, setSortBy] = useState('date-desc');

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        toast.error('Please upload a CSV file');
        return;
      }
      handleFileUpload(file);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container py-8 space-y-8 max-w-6xl">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-xl border flex items-center justify-center bg-white shadow-subtle">
                <Truck size={32} className="text-primary" />
              </div>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="text-sm font-medium bg-transparent border-b border-transparent focus:border-primary focus:outline-none text-center"
              />
            </div>
            <h1 className="text-2xl font-semibold">Truck Tracking Dashboard</h1>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vehicle number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                onChange={handleFileInputChange}
                className="hidden"
                disabled={isLoading}
              />
              <Button
                variant="outline"
                className="gap-2"
                disabled={isLoading}
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={() => setUploadHover(true)}
                onMouseLeave={() => setUploadHover(false)}
              >
                <Upload className={`h-4 w-4 ${uploadHover ? 'animate-slide-in-right' : ''}`} />
                <span>Upload CSV</span>
              </Button>
            </div>
            
            <AddTruckDialog onAddTruck={addTruck} />
          </div>
        </header>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard title="Total" value={summary.total} />
          <SummaryCard title="On-Track" value={summary.onTrack} type="success" />
          <SummaryCard title="Delayed" value={summary.delayed} type="error" />
        </div>
        
        {/* Filter Section - Moved to just above the truck list */}
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
        
        {/* Truck List */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Tracked Vehicles</h2>
          
          {filteredTrucks.length === 0 ? (
            <div className="bg-white rounded-xl border p-8 text-center">
              <p className="text-muted-foreground">
                {trucks.length === 0 
                  ? "No trucks added yet. Add a truck or upload a CSV file to get started."
                  : "No trucks match your search criteria."
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTrucks.map((truck, index) => (
                <TruckCard 
                  key={truck.id} 
                  truck={truck} 
                  className="animate-fade-in" 
                  style={{ animationDelay: `${index * 0.05}s` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
