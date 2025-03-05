
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
  date?: Date;
  origin?: Location;
  destination?: Location;
  journeyProgress?: number; // Percentage 0-100
  
  // Adding missing properties to fix TypeScript errors
  name?: string;
  type?: string;
  lastUpdated?: string | Date;
}

export interface TruckSummary {
  total: number;
  onTrack: number;
  delayed: number;
}

export type SortOption = 'newest' | 'oldest' | 'status' | 'progress';

export interface CompanyProfile {
  name: string;
  panNumber: string;
  gstNumber: string;
  officeNumber: string;
  email: string;
  verified: boolean;
}
