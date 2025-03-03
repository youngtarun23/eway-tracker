
import { useState, useMemo } from 'react';
import { Truck } from '@/types';

export function useTruckSearch(trucks: Truck[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrucks = useMemo(() => {
    if (!searchQuery.trim()) return trucks;
    
    const query = searchQuery.toLowerCase().trim();
    return trucks.filter(truck => 
      truck.vehicleNumber.toLowerCase().includes(query) ||
      truck.ewayBill.toLowerCase().includes(query) ||
      (truck.driverNumber && truck.driverNumber.toLowerCase().includes(query))
    );
  }, [trucks, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredTrucks
  };
}
