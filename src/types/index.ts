
export type TruckStatus = 'On-Track' | 'Delayed';

export interface Truck {
  id: string;
  vehicleNumber: string;
  ewayBill: string;
  status: TruckStatus;
  driverNumber?: string;
  imageUrl?: string;
}

export interface TruckSummary {
  total: number;
  onTrack: number;
  delayed: number;
}
