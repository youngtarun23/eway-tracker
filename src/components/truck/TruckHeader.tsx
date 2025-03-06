
import { format } from 'date-fns';
import { StatusBadge } from '../StatusBadge';
import { Truck } from '@/types';

interface TruckHeaderProps {
  truck: Truck;
}

export function TruckHeader({ truck }: TruckHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
      <div className="w-24 h-24 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
        <img 
          src={truck.imageUrl || '/placeholder.svg'} 
          alt="Vehicle" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex flex-col md:flex-row flex-1 gap-4 w-full">
        <div className="space-y-2 flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
            <h3 className="font-medium text-lg tracking-tight">{truck.vehicleNumber}</h3>
            <StatusBadge status={truck.status} />
          </div>
          
          {truck.driverNumber && (
            <p className="text-sm text-muted-foreground">
              Driver Number: {truck.driverNumber}
            </p>
          )}
          
          {truck.driverName && (
            <p className="text-sm text-muted-foreground">
              Driver Name: {truck.driverName}
            </p>
          )}
          
          {truck.date && (
            <p className="text-sm text-muted-foreground">
              Date: {format(truck.date, 'PP')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
