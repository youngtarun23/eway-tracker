import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SettingsPlaceholder } from '../settings/SettingsPlaceholder';
import TruckFilters from './TruckFilters';
import TruckPagination from './TruckPagination';
import { useQuery } from '@tanstack/react-query';
import { getTrucks } from '@/lib/api';
import { Filters, SortOption, Truck } from '@/types';

interface DashboardProps { }

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search trucks..."
        className="pl-10"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    type: 'all',
  });
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const trucksPerPage = 5;

  const { data: trucksData, isLoading, isError } = useQuery({
    queryKey: ['trucks', searchTerm, filters, sortOption, currentPage, trucksPerPage],
    queryFn: () => getTrucks(searchTerm, filters, sortOption, currentPage, trucksPerPage),
    keepPreviousData: true,
  });

  const trucks: Truck[] = trucksData?.trucks || [];
  const totalTrucks: number = trucksData?.total || 0;
  const totalPages = Math.ceil(totalTrucks / trucksPerPage);

  const handleFilterChange = (key: keyof Filters, value: string | boolean) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  if (isLoading) return <div>Loading trucks...</div>;
  if (isError) return <div>Error fetching trucks.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Track and manage your truck fleet efficiently.
          </p>
        </div>
        <Button>Add Truck</Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 space-y-4">
          <div className="flex justify-between items-center">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={(value) => setSearchTerm(value)} 
            />
            
            <TruckFilters 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              sortOption={sortOption} 
              onSortChange={(value) => setSortOption(value as SortOption)}
            />
          </div>
          
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table>
              <TableCaption>A list of your recent trucks.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6 py-3">Name</TableHead>
                  <TableHead className="px-6 py-3">Type</TableHead>
                  <TableHead className="px-6 py-3">Status</TableHead>
                  <TableHead className="px-6 py-3">Last Updated</TableHead>
                  <TableHead className="px-6 py-3">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trucks.map((truck) => (
                  <TableRow key={truck.id}>
                    <TableCell className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {truck.name}
                    </TableCell>
                    <TableCell className="px-6 py-4">{truck.type}</TableCell>
                    <TableCell className="px-6 py-4">{truck.status}</TableCell>
                    <TableCell className="px-6 py-4">{truck.lastUpdated}</TableCell>
                    <TableCell className="px-6 py-4">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {trucks.length === 0 && (
              <div className="p-4 text-center">No trucks found.</div>
            )}
          </div>
          
          {trucks.length > 0 && (
            <div className="mt-4">
              <TruckPagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            </div>
          )}
        </div>
        
        <div className="w-full md:w-1/3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Total Trucks: {totalTrucks}
              </div>
              <div className="text-sm text-muted-foreground">
                Active Trucks: {trucks.filter(truck => truck.status === 'active').length}
              </div>
              {/* Add more summary data here */}
            </CardContent>
          </Card>
          <SettingsPlaceholder />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
