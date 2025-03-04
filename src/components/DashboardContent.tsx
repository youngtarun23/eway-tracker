
import React from 'react';
import { SearchBar } from '@/components/SearchBar';
import { ImportCSV } from '@/components/ImportCSV';
import { AddTruckDialog } from '@/components/AddTruckDialog';
import { SummaryCard } from '@/components/SummaryCard';
import { FilterSection } from '@/components/FilterSection';
import { TruckList } from '@/components/TruckList';
import { Truck, TruckSummary } from '@/types';

interface DashboardContentProps {
  trucks: Truck[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: any;
  setStatusFilter: (status: any) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  filteredTrucks: Truck[];
  paginatedTrucks: Truck[];
  summary: TruckSummary;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  isLoading: boolean;
  handleFileUpload: (file: File) => void;
  addTruck: (truck: Omit<Truck, 'id'>) => void;
  csvTemplateUrl: string;
}

export function DashboardContent({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  sortBy,
  setSortBy,
  filteredTrucks,
  paginatedTrucks,
  summary,
  currentPage,
  totalPages,
  goToPage,
  isLoading,
  handleFileUpload,
  addTruck,
  csvTemplateUrl,
  trucks
}: DashboardContentProps) {
  return (
    <div className="space-y-8 mt-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <div className="flex gap-2">
          <ImportCSV 
            handleFileUpload={handleFileUpload} 
            isLoading={isLoading}
            csvTemplateUrl={csvTemplateUrl}
          />
          
          <AddTruckDialog onAddTruck={addTruck} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard title="Total" value={summary.total} />
        <SummaryCard title="On-Track" value={summary.onTrack} type="success" />
        <SummaryCard title="Delayed" value={summary.delayed} type="error" />
      </div>
      
      <FilterSection
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
        
        <TruckList 
          trucks={filteredTrucks.length === 0 && trucks.length > 0 ? [] : paginatedTrucks}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
}
