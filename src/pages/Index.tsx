
import { useState, useRef } from 'react';
import { useTruckData } from '@/hooks/useTruckData';
import { useTruckSearch } from '@/hooks/useTruckSearch';
import { useCSVUpload } from '@/hooks/useCSVUpload';
import { TruckCard } from '@/components/TruckCard';
import { SummaryCard } from '@/components/SummaryCard';
import { AddTruckDialog } from '@/components/AddTruckDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Upload, Truck } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const { trucks, summary, addTruck, importTrucksFromCSV } = useTruckData();
  const { searchQuery, setSearchQuery, filteredTrucks } = useTruckSearch(trucks);
  const { isLoading, handleFileUpload } = useCSVUpload(importTrucksFromCSV);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadHover, setUploadHover] = useState(false);

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
            <div className="w-20 h-20 rounded-xl border flex items-center justify-center bg-white shadow-subtle">
              <Truck size={32} className="text-primary" />
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
        <div className="grid grid-cols-3 gap-4">
          <SummaryCard title="Total" value={summary.total} />
          <SummaryCard title="On-Track" value={summary.onTrack} type="success" />
          <SummaryCard title="Delayed" value={summary.delayed} type="error" />
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
