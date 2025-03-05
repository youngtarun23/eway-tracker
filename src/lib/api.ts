
import { Truck } from '@/types';

// Mock data for trucks
const mockTrucks: Truck[] = [
  {
    id: '1',
    vehicleNumber: 'TRK-001',
    ewayBill: 'EWB-12345',
    status: 'On-Track',
    driverNumber: '+91 9876543210',
    date: new Date(),
    origin: { lat: 12.9716, lng: 77.5946, name: 'Bangalore' },
    destination: { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
    journeyProgress: 65,
    name: 'Truck 1', // Adding name for compatibility
    type: 'Delivery', // Adding type for compatibility
    lastUpdated: '2 hours ago', // Adding lastUpdated for compatibility
  },
  {
    id: '2',
    vehicleNumber: 'TRK-002',
    ewayBill: 'EWB-67890',
    status: 'Delayed',
    driverNumber: '+91 9876543211',
    date: new Date(Date.now() - 86400000), // Yesterday
    origin: { lat: 28.7041, lng: 77.1025, name: 'Delhi' },
    destination: { lat: 17.3850, lng: 78.4867, name: 'Hyderabad' },
    journeyProgress: 30,
    name: 'Truck 2',
    type: 'Pickup',
    lastUpdated: '5 hours ago',
  },
  {
    id: '3',
    vehicleNumber: 'TRK-003',
    ewayBill: 'EWB-54321',
    status: 'On-Track',
    driverNumber: '+91 9876543212',
    date: new Date(Date.now() - 172800000), // 2 days ago
    origin: { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
    destination: { lat: 13.0827, lng: 80.2707, name: 'Chennai' },
    journeyProgress: 80,
    name: 'Truck 3',
    type: 'Transit',
    lastUpdated: '1 day ago',
  },
  {
    id: '4',
    vehicleNumber: 'TRK-004',
    ewayBill: 'EWB-09876',
    status: 'On-Track',
    driverNumber: '+91 9876543213',
    date: new Date(Date.now() - 259200000), // 3 days ago
    origin: { lat: 18.5204, lng: 73.8567, name: 'Pune' },
    destination: { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad' },
    journeyProgress: 45,
    name: 'Truck 4',
    type: 'Delivery',
    lastUpdated: '3 days ago',
  },
  {
    id: '5',
    vehicleNumber: 'TRK-005',
    ewayBill: 'EWB-13579',
    status: 'Delayed',
    driverNumber: '+91 9876543214',
    date: new Date(Date.now() - 432000000), // 5 days ago
    origin: { lat: 10.8505, lng: 76.2711, name: 'Coimbatore' },
    destination: { lat: 9.9312, lng: 76.2673, name: 'Kochi' },
    journeyProgress: 20,
    name: 'Truck 5',
    type: 'Pickup',
    lastUpdated: '1 week ago',
  },
];

// Interface for the filters used in the getTrucks function
export interface Filters {
  status: string;
  type: string;
}

// Available sort options
export type SortOption = 'newest' | 'oldest' | 'name_asc' | 'name_desc';

// Function to get filtered and sorted trucks
export const getTrucks = (
  searchTerm: string,
  filters: Filters,
  sortOption: SortOption,
  page: number,
  limit: number
) => {
  // Filter trucks based on search term and filters
  let filteredTrucks = [...mockTrucks];

  // Apply search filter
  if (searchTerm) {
    const search = searchTerm.toLowerCase();
    filteredTrucks = filteredTrucks.filter(
      truck => 
        truck.name.toLowerCase().includes(search) ||
        truck.vehicleNumber.toLowerCase().includes(search) ||
        truck.ewayBill.toLowerCase().includes(search)
    );
  }

  // Apply status filter
  if (filters.status !== 'all') {
    filteredTrucks = filteredTrucks.filter(
      truck => truck.status.toLowerCase() === filters.status.toLowerCase()
    );
  }

  // Apply type filter
  if (filters.type !== 'all') {
    filteredTrucks = filteredTrucks.filter(
      truck => truck.type.toLowerCase() === filters.type.toLowerCase()
    );
  }

  // Sort trucks
  switch (sortOption) {
    case 'newest':
      filteredTrucks.sort((a, b) => b.date.getTime() - a.date.getTime());
      break;
    case 'oldest':
      filteredTrucks.sort((a, b) => a.date.getTime() - b.date.getTime());
      break;
    case 'name_asc':
      filteredTrucks.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name_desc':
      filteredTrucks.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  // Calculate pagination
  const total = filteredTrucks.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTrucks = filteredTrucks.slice(startIndex, endIndex);

  // Return paginated data along with total count
  return {
    trucks: paginatedTrucks,
    total,
  };
};
