
import { format } from 'date-fns';
import { StatusBadge } from '../StatusBadge';
import { Truck } from '@/types';
import { DriverInfo } from './DriverInfo';

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
      status: 'Pending' as const
    },
    {
      id: 'F12346',
      date: '2023-05-22',
      offence: 'Improper parking',
      amount: 500,
      status: 'Paid' as const
    }
  ];

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
          
          <DriverInfo 
            driverName={truck.driverName} 
            driverNumber={truck.driverNumber}
            licenseData={licenseData}
            fineData={fineData}
          />
          
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
