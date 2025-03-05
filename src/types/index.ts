
export type TruckStatus = 'On-Track' | 'Delayed';

export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export interface Truck {
  id: string;
  vehicleNumber: string;
  ewayBill: string;
  status: TruckStatus;
  driverNumber?: string;
  imageUrl?: string;
  date: Date;
  origin?: Location;
  destination?: Location;
  journeyProgress?: number; // Percentage 0-100
  
  // Additional fields needed by the dashboard
  name: string;
  type: string;
  lastUpdated: string;
}

export interface TruckSummary {
  total: number;
  onTrack: number;
  delayed: number;
}

// Filter and sort types used in the dashboard
export interface Filters {
  status: string;
  type: string;
}

export type SortOption = 'newest' | 'oldest' | 'name_asc' | 'name_desc';
