
import { useState } from 'react';
import { useTruckData } from '@/hooks/useTruckData';
import { useTruckSearch } from '@/hooks/useTruckSearch';
import { useTruckFilters } from '@/hooks/useTruckFilters';
import { useCSVUpload } from '@/hooks/useCSVUpload';
import { TruckCard } from '@/components/TruckCard';
import { SummaryCard } from '@/components/SummaryCard';
import { AddTruckDialog } from '@/components/AddTruckDialog';
import { SearchBar } from '@/components/dashboard/SearchBar';
import { TruckFilters } from '@/components/dashboard/TruckFilters';
import { TruckPagination } from '@/components/dashboard/TruckPagination';
import { Button } from '@/components/ui/button';
import { Upload, Download } from 'lucide-react';
import { toast } from 'sonner';
import { useRef, useState as useHoverState } from 'react';

const ITEMS_PER_PAGE = 5;

const generateCSVTemplate = () => {
  const headers = ['vehicleNumber', 'ewayBill', 'status', 'origin', 'destination', 'distance', 'journeyProgress'];
  const sampleRow = ['TN01A1234', 'EW123456789', 'On-Track', 'Chennai', 'Bangalore', '350', '60'];
  const csvContent = [headers.join(','), sampleRow.join(',')].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  return URL.createObjectURL(blob);
};

export const Dashboard = () => {
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
  const [uploadHover, setUploadHover] = useHoverState(false);
  const [currentPage, setCurrentPage] = useState(1);
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
    <div className="space-y-8 mt-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
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
      
      <TruckFilters 
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
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
              <TruckPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
