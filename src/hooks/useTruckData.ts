import { useState, useEffect } from 'react';
import { Truck, TruckStatus, TruckSummary, CityStop, Location } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Helper function to create city stops
const createCityStops = (origin: Location, destination: Location): CityStop[] => {
  const now = new Date();
  const twoHoursAgo = new Date(now);
  twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
  
  const fourHoursAgo = new Date(now);
  fourHoursAgo.setHours(fourHoursAgo.getHours() - 4);
  
  return [
    {
      location: origin,
      expectedAt: fourHoursAgo,
      crossedAt: fourHoursAgo,
      status: 'On-Track'
    },
    {
      location: {
        lat: (origin.lat + destination.lat) * 0.33 + origin.lat * 0.67,
        lng: (origin.lng + destination.lng) * 0.33 + origin.lng * 0.67,
        name: "City 1"
      },
      expectedAt: new Date(fourHoursAgo.getTime() + 2 * 60 * 60 * 1000),
      crossedAt: new Date(fourHoursAgo.getTime() + 1.5 * 60 * 60 * 1000),
      status: 'On-Track'
    },
    {
      location: {
        lat: (origin.lat + destination.lat) * 0.66 + origin.lat * 0.34,
        lng: (origin.lng + destination.lng) * 0.66 + origin.lng * 0.34,
        name: "City 2"
      },
      expectedAt: new Date(fourHoursAgo.getTime() + 4 * 60 * 60 * 1000),
      crossedAt: new Date(fourHoursAgo.getTime() + 4.5 * 60 * 60 * 1000),
      status: 'Delayed'
    },
    {
      location: destination,
      expectedAt: new Date(fourHoursAgo.getTime() + 6 * 60 * 60 * 1000),
      status: undefined
    }
  ];
};

// Initial sample data with enhanced information
const initialTrucks: Truck[] = [
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'On-Track',
    driverName: 'Rajesh Kumar',
    driverNumber: '9876543210',
    imageUrl: '/placeholder.svg',
    date: new Date(2023, 5, 15),
    origin: { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
    destination: { lat: 13.0827, lng: 80.2707, name: "Chennai" },
    journeyProgress: 65
  },
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'Delayed',
    driverName: 'Suresh Singh',
    driverNumber: '9876543211',
    imageUrl: '/placeholder.svg',
    date: new Date(2023, 6, 20),
    origin: { lat: 28.6139, lng: 77.2090, name: "Delhi" },
    destination: { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
    journeyProgress: 30
  },
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'On-Track',
    driverNumber: '9876543212',
    imageUrl: '/placeholder.svg',
    date: new Date(2023, 7, 5)
  },
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'Delayed',
    driverNumber: '9876543213',
    imageUrl: '/placeholder.svg',
    date: new Date(2023, 7, 12)
  },
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'On-Track',
    driverNumber: '9876543214',
    imageUrl: '/placeholder.svg',
    date: new Date(2023, 8, 3)
  },
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'On-Track',
    driverNumber: '9876543215',
    imageUrl: '/placeholder.svg',
    date: new Date(2023, 8, 15)
  },
  {
    id: uuidv4(),
    vehicleNumber: 'KA 53 EN 1756',
    ewayBill: '124567809',
    status: 'On-Track',
    driverNumber: '9876543216',
    imageUrl: '/placeholder.svg',
    date: new Date(2023, 9, 1)
  },
];

// Add city stops to each truck
const trucksWithCityStops = initialTrucks.map(truck => {
  if (truck.origin && truck.destination) {
    return {
      ...truck,
      cityStops: createCityStops(truck.origin, truck.destination)
    };
  }
  return truck;
});

export function useTruckData() {
  const [trucks, setTrucks] = useState<Truck[]>(trucksWithCityStops);
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
    
    // Add city stops if origin and destination are provided
    if (newTruck.origin && newTruck.destination) {
      newTruck.cityStops = createCityStops(newTruck.origin, newTruck.destination);
    }
    
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
