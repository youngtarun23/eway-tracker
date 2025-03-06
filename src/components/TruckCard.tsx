import { useState } from 'react';
import { Truck } from '@/types';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from './ui/collapsible';
import { TruckHeader } from './truck/TruckHeader';
import { JourneyTimeline } from './truck/JourneyTimeline';
import { EwayBillDetails } from './truck/EwayBillDetails';

interface TruckCardProps extends HTMLAttributes<HTMLDivElement> {
  truck: Truck;
  className?: string;
}

export function TruckCard({ truck, className, ...props }: TruckCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [ewayBillExpanded, setEwayBillExpanded] = useState(false);

  // Mock data for map demonstration
  const defaultOrigin = { lat: 12.9716, lng: 77.5946, name: "Bangalore" };
  const defaultDestination = { lat: 13.0827, lng: 80.2707, name: "Chennai" };
  const origin = truck.origin || defaultOrigin;
  const destination = truck.destination || defaultDestination;
  const progress = truck.journeyProgress || 45;

  // Mock city stops if not provided
  const cityStops = truck.cityStops || [
    {
      location: { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
      expectedAt: new Date(2023, 5, 15, 8, 0),
      crossedAt: new Date(2023, 5, 15, 8, 15),
      status: 'On-Track'
    },
    {
      location: { lat: 13.0327, lng: 78.6387, name: "Kolar" },
      expectedAt: new Date(2023, 5, 15, 10, 0),
      crossedAt: new Date(2023, 5, 15, 9, 45),
      status: 'On-Track'
    },
    {
      location: { lat: 13.1231, lng: 79.1282, name: "Chittoor" },
      expectedAt: new Date(2023, 5, 15, 13, 0),
      crossedAt: new Date(2023, 5, 15, 14, 30),
      status: 'Delayed'
    },
    {
      location: { lat: 13.0827, lng: 80.2707, name: "Chennai" },
      expectedAt: new Date(2023, 5, 15, 16, 0),
      status: undefined
    }
  ];

  // Mock E-way bill details
  const mockEwayBillDetails = {
    ebnNumber: truck.ewayBill,
    consignor: {
      gstin: "29AABCX0892R1ZK",
      name: "ABC Supplies Ltd.",
      address: "123 Industrial Area, Bangalore, Karnataka"
    },
    consignee: {
      gstin: "33XYZPQ1234S1Z5",
      name: "XYZ Enterprises",
      address: "456 Business Park, Chennai, Tamil Nadu"
    },
    document: {
      type: "Tax Invoice",
      number: "INV-2023-1234",
      date: "2023-05-15"
    },
    goods: {
      description: "Electronic Components",
      hsnCode: "8517",
      quantity: "500",
      unit: "Pcs",
      value: "250000"
    },
    transporter: {
      gstin: "29PQRST5678U1ZM",
      name: "Fast Logistics Services",
      address: "789 Transport Nagar, Bangalore, Karnataka"
    },
    vehicleNumber: truck.vehicleNumber,
    placeOfDispatch: origin.name,
    placeOfDelivery: destination.name,
    distance: "350",
    validityPeriod: "15-05-2023 to 17-05-2023"
  };

  return (
    <div 
      className={cn(
        "p-5 border rounded-xl bg-white hover:shadow-subtle transition-all",
        "animate-fade-in flex flex-col gap-4",
        className
      )}
      {...props}
    >
      <TruckHeader truck={truck} />
      
      <div className="border-t md:border-t-0 md:border-l pt-2 md:pt-0 md:pl-4 flex flex-col justify-center">
        <Collapsible
          open={ewayBillExpanded}
          onOpenChange={setEwayBillExpanded}
          className="w-full"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground">E-Way Bill</span>
              <span className="font-mono text-sm block">{truck.ewayBill}</span>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                <FileText className="h-4 w-4 mr-1" />
                {ewayBillExpanded ? "Hide Details" : "View Details"}
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="mt-4 space-y-4 animate-slide-down">
            <EwayBillDetails details={mockEwayBillDetails} />
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Toggle Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="self-center"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 
          <><ChevronUp className="h-4 w-4 mr-2" /> Hide Journey</> : 
          <><ChevronDown className="h-4 w-4 mr-2" /> View Journey</>
        }
      </Button>
      
      {/* Expandable Journey Section */}
      {expanded && (
        <div className="mt-2 animate-fade-in">
          <JourneyTimeline 
            origin={origin}
            destination={destination}
            cityStops={cityStops}
            progress={progress}
            status={truck.status}
          />
        </div>
      )}
    </div>
  );
}
