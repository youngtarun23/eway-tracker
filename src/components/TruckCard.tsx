
import { Truck } from '@/types';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface TruckCardProps extends HTMLAttributes<HTMLDivElement> {
  truck: Truck;
  className?: string;
}

export function TruckCard({ truck, className, ...props }: TruckCardProps) {
  return (
    <div 
      className={cn(
        "p-5 border rounded-xl bg-white hover:shadow-subtle transition-all",
        "animate-fade-in flex flex-col md:flex-row items-center md:items-start gap-4",
        className
      )}
      {...props}
    >
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
        </div>
        
        <div className="border-t md:border-t-0 md:border-l pt-2 md:pt-0 md:pl-4 flex flex-col justify-center">
          <span className="text-xs text-muted-foreground">E-Way Bill</span>
          <span className="font-mono text-sm">{truck.ewayBill}</span>
        </div>
      </div>
    </div>
  );
}
