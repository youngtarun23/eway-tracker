
import { LicenseDetails } from './LicenseDetails';
import { FineDetails } from './FineDetails';

interface DriverInfoProps {
  driverName?: string;
  driverNumber?: string;
  licenseData: {
    verified: boolean;
    number: string;
    validThrough: string;
    categories: string[];
    issuedBy: string;
    issuedDate: string;
  };
  fineData: {
    id: string;
    date: string;
    offence: string;
    amount: number;
    status: 'Pending' | 'Paid';
  }[];
}

export function DriverInfo({ driverName, driverNumber, licenseData, fineData }: DriverInfoProps) {
  const pendingFines = fineData.filter(fine => fine.status === 'Pending');
  const hasPendingFines = pendingFines.length > 0;
  
  return (
    <div className="space-y-2">
      {driverName && (
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Driver Name: {driverName}
          </p>
          
          <LicenseDetails licenseData={licenseData} />
          
          {hasPendingFines && <FineDetails fineData={fineData} />}
        </div>
      )}
      
      {driverNumber && (
        <p className="text-sm text-muted-foreground">
          Driver Number: {driverNumber}
        </p>
      )}
    </div>
  );
}
