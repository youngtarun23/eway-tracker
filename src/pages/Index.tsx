import { useState, useRef } from 'react';
import { useTruckData } from '@/hooks/useTruckData';
import { useTruckSearch } from '@/hooks/useTruckSearch';
import { useTruckFilters } from '@/hooks/useTruckFilters';
import { useCSVUpload } from '@/hooks/useCSVUpload';
import { TruckCard } from '@/components/TruckCard';
import { SummaryCard } from '@/components/SummaryCard';
import { AddTruckDialog } from '@/components/AddTruckDialog';
import { ManageAccessFlow } from '@/components/ManageAccessFlow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CompanySidebar } from '@/components/CompanySidebar';
import { 
  Search, Upload, CalendarIcon, FilterIcon, 
  Download
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TruckStatus } from '@/types';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 5;

const generateCSVTemplate = () => {
  const headers = ['vehicleNumber', 'ewayBill', 'status', 'origin', 'destination', 'distance', 'journeyProgress'];
  const sampleRow = ['TN01A1234', 'EW123456789', 'On-Track', 'Chennai', 'Bangalore', '350', '60'];
  const csvContent = [headers.join(','), sampleRow.join(',')].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  return URL.createObjectURL(blob);
};

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
    sortBy,
    setSortBy,
    filteredTrucks 
  } = useTruckFilters(searchedTrucks);
  const { isLoading, handleFileUpload } = useCSVUpload(importTrucksFromCSV);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadHover, setUploadHover] = useState(false);
  const [companyName, setCompanyName] = useState("Transport Co.");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('dashboard');
  const csvTemplateUrl = generateCSVTemplate();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        toast.error('Please upload a CSV file');
        return;
      }
      handleFileUpload(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const totalPages = Math.ceil(filteredTrucks.length / ITEMS_PER_PAGE);
  const paginatedTrucks = filteredTrucks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <CompanySidebar 
          companyName={companyName} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <div className="flex-1">
          <div className="container py-8 space-y-8 max-w-6xl">
            <header className="mb-6">
              <h1 className="text-2xl font-semibold">Truck Tracking Dashboard</h1>
            </header>
            
            {activeTab === 'dashboard' && (
              <div className="space-y-8 mt-0">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search vehicle number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="relative">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".csv"
                        onChange={handleFileInputChange}
                        className="hidden"
                        disabled={isLoading}
                      />
                      <div className="flex flex-col">
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
                        <a 
                          href={csvTemplateUrl} 
                          download="truck_template.csv"
                          className="text-xs text-primary flex items-center mt-1 hover:underline"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download Template
                        </a>
                      </div>
                    </div>
                    
                    <AddTruckDialog onAddTruck={addTruck} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <SummaryCard title="Total" value={summary.total} />
                  <SummaryCard title="On-Track" value={summary.onTrack} type="success" />
                  <SummaryCard title="Delayed" value={summary.delayed} type="error" />
                </div>
                
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
                      {paginatedTrucks.map((truck, index) => (
                        <TruckCard 
                          key={truck.id} 
                          truck={truck} 
                          className="animate-fade-in" 
                          style={{ animationDelay: `${index * 0.05}s` }}
                        />
                      ))}

                      {totalPages > 1 && (
                        <Pagination className="mt-6">
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious 
                                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                              />
                            </PaginationItem>
                            
                            {Array.from({ length: totalPages }).map((_, i) => (
                              <PaginationItem key={i}>
                                <PaginationLink 
                                  isActive={currentPage === i + 1}
                                  onClick={() => goToPage(i + 1)}
                                >
                                  {i + 1}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            
                            <PaginationItem>
                              <PaginationNext 
                                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'manage-access' && <ManageAccessFlow />}
            
            {activeTab === 'analytics' && (
              <div className="p-8 text-center bg-white rounded-xl border">
                <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
                <p className="text-muted-foreground">Analytics section coming soon.</p>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="p-8 text-center bg-white rounded-xl border">
                <h2 className="text-2xl font-semibold mb-4">Company Profile</h2>
                <p className="text-muted-foreground">Company profile management coming soon.</p>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="p-8 text-center bg-white rounded-xl border">
                <h2 className="text-2xl font-semibold mb-4">Settings</h2>
                <p className="text-muted-foreground">Settings section coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
