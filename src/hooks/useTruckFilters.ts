
import { useState, useMemo } from 'react';
import { Truck, TruckStatus } from '@/types';

export type SortOption = 'newest' | 'oldest' | 'status' | 'progress';

export function useTruckFilters(trucks: Truck[]) {
  const [statusFilter, setStatusFilter] = useState<TruckStatus | 'All'>('All');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  
  const filteredTrucks = useMemo(() => {
    // First filter the trucks
    const filtered = trucks.filter(truck => {
      // Filter by status
      if (statusFilter !== 'All' && truck.status !== statusFilter) {
        return false;
      }
      
      // Filter by date range
      if (startDate && truck.date && truck.date < startDate) {
        return false;
      }
      
      if (endDate && truck.date && truck.date > endDate) {
        return false;
      }
      
      return true;
    });
    
    // Then sort the filtered trucks
    return [...filtered].sort((a, b) => {
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      
      if (sortBy === 'progress') {
        const progressA = a.journeyProgress || 0;
        const progressB = b.journeyProgress || 0;
        return progressB - progressA; // Higher progress first
      }
      
      // Default sort by date if no dates available
      if (!a.date) return 1;
      if (!b.date) return -1;
      
      // Sort by date
      if (sortBy === 'oldest') {
        return a.date.getTime() - b.date.getTime();
      } else { // 'newest'
        return b.date.getTime() - a.date.getTime();
      }
    });
  }, [trucks, statusFilter, startDate, endDate, sortBy]);
  
  return {
    statusFilter,
    setStatusFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sortBy,
    setSortBy,
    filteredTrucks
  };
}
