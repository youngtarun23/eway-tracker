
import { format } from 'date-fns';
import { CheckCircle, AlertTriangle, FileText, Ban } from 'lucide-react';
import { StatusBadge } from '../StatusBadge';
import { Truck } from '@/types';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TruckHeaderProps {
  truck: Truck;
}

export function TruckHeader({ truck }: TruckHeaderProps) {
  // Sample license data (would come from API in real implementation)
  const licenseData = {
    verified: true,
    number: 'DL-12345678',
    validThrough: '2025-12-31',
    categories: ['LMV', 'HMV', 'MCWG'],
    issuedBy: 'Karnataka RTO',
    issuedDate: '2015-06-15'
  };

  // Sample fine data (would come from API in real implementation)
  const fineData = [
    {
      id: 'F12345',
      date: '2023-08-15',
      offence: 'Speeding (exceeded limit by 20km/h)',
      amount: 2000,
      status: 'Pending'
    },
    {
      id: 'F12346',
      date: '2023-05-22',
      offence: 'Improper parking',
      amount: 500,
      status: 'Paid'
    }
  ];

  const pendingFines = fineData.filter(fine => fine.status === 'Pending');
  const hasPendingFines = pendingFines.length > 0;

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
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Driver Name: {truck.driverName}
              </p>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                          {licenseData.verified ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Ban className="h-5 w-5 text-orange-500" />
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <Card className="border-0 shadow-none">
                          <CardHeader className="px-0 pt-0">
                            <CardTitle className="text-base flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Driver License Details
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="px-0 pb-0">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">License Number</span>
                                <span className="text-sm font-medium">{licenseData.number}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Valid Through</span>
                                <span className="text-sm font-medium">{licenseData.validThrough}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Categories</span>
                                <div className="flex gap-1">
                                  {licenseData.categories.map(category => (
                                    <span key={category} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                      {category}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Issued By</span>
                                <span className="text-sm font-medium">{licenseData.issuedBy}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Issue Date</span>
                                <span className="text-sm font-medium">{licenseData.issuedDate}</span>
                              </div>
                              <div className="flex justify-between items-center pt-2">
                                <span className="text-sm text-muted-foreground">Verification</span>
                                <div className="flex items-center gap-1 text-green-500">
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="text-sm font-medium">Verified</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </PopoverContent>
                    </Popover>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View driver license details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {hasPendingFines && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <Card className="border-0 shadow-none">
                            <CardHeader className="px-0 pt-0">
                              <CardTitle className="text-base flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                Pending Fines & Challans
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-0 pb-0">
                              <div className="space-y-4">
                                {fineData.map(fine => (
                                  <div key={fine.id} className="border-b pb-3 last:border-0 last:pb-0">
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">Challan #{fine.id}</span>
                                      <span className={`text-xs px-2 py-0.5 rounded ${
                                        fine.status === 'Pending' 
                                          ? 'bg-amber-100 text-amber-700' 
                                          : 'bg-green-100 text-green-700'
                                      }`}>
                                        {fine.status}
                                      </span>
                                    </div>
                                    <div className="text-sm mt-1">{fine.offence}</div>
                                    <div className="flex justify-between mt-1">
                                      <span className="text-xs text-muted-foreground">
                                        {fine.date}
                                      </span>
                                      <span className="text-sm font-medium">
                                        ₹{fine.amount.toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                                
                                {hasPendingFines && (
                                  <div className="flex justify-between border-t pt-2">
                                    <span className="font-medium">Total Pending</span>
                                    <span className="font-medium text-amber-600">
                                      ₹{pendingFines.reduce((sum, fine) => sum + fine.amount, 0).toLocaleString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </PopoverContent>
                      </Popover>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View pending fines and challans</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
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
