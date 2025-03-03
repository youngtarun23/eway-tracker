
import { useState, useMemo } from 'react';
import { Truck, TruckStatus } from '@/types';

export function useTruckFilters(trucks: Truck[]) {
  const [statusFilter, setStatusFilter] = useState<TruckStatus | 'All'>('All');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const filteredTrucks = useMemo(() => {
    return trucks.filter(truck => {
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
  }, [trucks, statusFilter, startDate, endDate]);
  
  return {
    statusFilter,
    setStatusFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    filteredTrucks
  };
}
