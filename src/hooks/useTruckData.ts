
import { useState, useEffect } from 'react';
import { Truck, TruckSummary } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Initial sample data
const initialTrucks: Truck[] = [
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'On-Track',
    driverNumber: '9876543210',
    imageUrl: '/placeholder.svg'
  },
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'Delayed',
    driverNumber: '9876543211',
    imageUrl: '/placeholder.svg'
  },
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'On-Track',
    driverNumber: '9876543212',
    imageUrl: '/placeholder.svg'
  },
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'Delayed',
    driverNumber: '9876543213',
    imageUrl: '/placeholder.svg'
  },
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'On-Track',
    driverNumber: '9876543214',
    imageUrl: '/placeholder.svg'
  },
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'On-Track',
    driverNumber: '9876543215',
    imageUrl: '/placeholder.svg'
  },
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'On-Track',
    driverNumber: '9876543216',
    imageUrl: '/placeholder.svg'
  },
];

export function useTruckData() {
  const [trucks, setTrucks] = useState<Truck[]>(initialTrucks);
  const [summary, setSummary] = useState<TruckSummary>({
    total: 0,
    onTrack: 0,
    delayed: 0
  });

  // Calculate summary whenever trucks change
  useEffect(() => {
    const onTrack = trucks.filter(truck => truck.status === 'On-Track').length;
    setSummary({
      total: trucks.length,
      onTrack,
      delayed: trucks.length - onTrack
    });
  }, [trucks]);

  const addTruck = (truck: Omit<Truck, 'id'>) => {
    const newTruck = {
      ...truck,
      id: uuidv4()
    };
    setTrucks(prev => [...prev, newTruck]);
    toast.success("Truck added successfully");
  };

  const updateTruckStatus = (id: string, status: TruckStatus) => {
    setTrucks(prev => prev.map(truck => 
      truck.id === id ? { ...truck, status } : truck
    ));
    toast.success(`Truck status updated to ${status}`);
  };

  const deleteTruck = (id: string) => {
    setTrucks(prev => prev.filter(truck => truck.id !== id));
    toast.success("Truck removed successfully");
  };

  const importTrucksFromCSV = (newTrucks: Omit<Truck, 'id'>[]) => {
    const trucksWithIds = newTrucks.map(truck => ({
      ...truck,
      id: uuidv4()
    }));
    setTrucks(prev => [...prev, ...trucksWithIds]);
    toast.success(`Imported ${newTrucks.length} trucks successfully`);
  };

  return {
    trucks,
    summary,
    addTruck,
    updateTruckStatus,
    deleteTruck,
    importTrucksFromCSV
  };
}
