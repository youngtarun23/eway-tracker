
import { useState } from 'react';
import { Truck } from '@/types';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, MapPin, FileText } from 'lucide-react';
import { Button } from './ui/button';
import Map from './Map';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from './ui/collapsible';
import { Card, CardContent } from './ui/card';

// Define E-way bill details interface
interface EwayBillDetails {
  ebnNumber: string;
  consignor: {
    gstin: string;
    name: string;
    address: string;
  };
  consignee: {
    gstin: string;
    name: string;
    address: string;
  };
  document: {
    type: string;
    number: string;
    date: string;
  };
  goods: {
    description: string;
    hsnCode: string;
    quantity: string;
    unit: string;
    value: string;
  };
  transporter: {
    gstin: string;
    name: string;
    address: string;
  };
  vehicleNumber: string;
  placeOfDispatch: string;
  placeOfDelivery: string;
  distance: string;
  validityPeriod: string;
}

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
  const progress = truck.journeyProgress || 45; // Default 45% if not provided

  // Mock E-way bill details
  const mockEwayBillDetails: EwayBillDetails = {
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
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">E-way Bill Details</h4>
                        <table className="min-w-full text-xs">
                          <tbody>
                            <tr>
                              <td className="py-1 text-muted-foreground">EBN Number:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.ebnNumber}</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-muted-foreground">Distance:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.distance} km</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-muted-foreground">Validity:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.validityPeriod}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2">Document Details</h4>
                        <table className="min-w-full text-xs">
                          <tbody>
                            <tr>
                              <td className="py-1 text-muted-foreground">Type:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.document.type}</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-muted-foreground">Number:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.document.number}</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-muted-foreground">Date:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.document.date}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">Consignor Details</h4>
                        <table className="min-w-full text-xs">
                          <tbody>
                            <tr>
                              <td className="py-1 text-muted-foreground">Name:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.consignor.name}</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-muted-foreground">GSTIN:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.consignor.gstin}</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-muted-foreground">Address:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.consignor.address}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">Consignee Details</h4>
                        <table className="min-w-full text-xs">
                          <tbody>
                            <tr>
                              <td className="py-1 text-muted-foreground">Name:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.consignee.name}</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-muted-foreground">GSTIN:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.consignee.gstin}</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-muted-foreground">Address:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.consignee.address}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">Goods Details</h4>
                        <table className="min-w-full text-xs">
                          <tbody>
                            <tr>
                              <td className="py-1 text-muted-foreground">Description:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.goods.description}</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-muted-foreground">HSN Code:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.goods.hsnCode}</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-muted-foreground">Quantity:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.goods.quantity} {mockEwayBillDetails.goods.unit}</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-muted-foreground">Value:</td>
                              <td className="py-1 font-medium">₹{mockEwayBillDetails.goods.value}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">Transporter Details</h4>
                        <table className="min-w-full text-xs">
                          <tbody>
                            <tr>
                              <td className="py-1 text-muted-foreground">Name:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.transporter.name}</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-muted-foreground">GSTIN:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.transporter.gstin}</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-muted-foreground">Address:</td>
                              <td className="py-1 font-medium">{mockEwayBillDetails.transporter.address}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
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
          <><ChevronUp className="h-4 w-4 mr-2" /> Hide Journey</> : 
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
                className={cn(
                  "h-2.5 rounded-full transition-all duration-500",
                  truck.status === 'On-Track' ? "bg-success" : "bg-destructive"
                )}
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
