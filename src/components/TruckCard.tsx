
import { useState } from 'react';
import { Truck } from '@/types';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import Map from './Map';

interface TruckCardProps extends HTMLAttributes<HTMLDivElement> {
  truck: Truck;
  className?: string;
}

export function TruckCard({ truck, className, ...props }: TruckCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Mock data for map demonstration
  const defaultOrigin = { lat: 12.9716, lng: 77.5946, name: "Bangalore" };
  const defaultDestination = { lat: 13.0827, lng: 80.2707, name: "Chennai" };
  const origin = truck.origin || defaultOrigin;
  const destination = truck.destination || defaultDestination;
  const progress = truck.journeyProgress || 45; // Default 45% if not provided

  return (
    <div 
      className={cn(
        "p-5 border rounded-xl bg-white hover:shadow-subtle transition-all",
        "animate-fade-in flex flex-col gap-4",
        className
      )}
      {...props}
    >
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
            
            {truck.date && (
              <p className="text-sm text-muted-foreground">
                Date: {format(truck.date, 'PP')}
              </p>
            )}
          </div>
          
          <div className="border-t md:border-t-0 md:border-l pt-2 md:pt-0 md:pl-4 flex flex-col justify-center">
            <span className="text-xs text-muted-foreground">E-Way Bill</span>
            <span className="font-mono text-sm">{truck.ewayBill}</span>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="self-center"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 
          <><ChevronUp className="h-4 w-4 mr-2" /> Hide Details</> : 
          <><ChevronDown className="h-4 w-4 mr-2" /> View Journey</>
        }
      </Button>
      
      {/* Expandable Map Section */}
      {expanded && (
        <div className="mt-2 animate-fade-in">
          <div className="border rounded-lg p-4 bg-secondary/10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm font-medium">{origin.name}</span>
              </div>
              <div className="text-sm font-medium">Journey Progress: {progress}%</div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm font-medium">{destination.name}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-secondary/30 rounded-full h-2.5 mb-4">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }} 
              ></div>
            </div>

            {/* Map Component - Replaces the placeholder */}
            <Map 
              origin={origin}
              destination={destination}
              progress={progress}
              className="h-48 rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
