
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
}

export interface TruckSummary {
  total: number;
  onTrack: number;
  delayed: number;
}
