
import { CheckCircle, FileText, Ban } from 'lucide-react';
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

interface LicenseData {
  verified: boolean;
  number: string;
  validThrough: string;
  categories: string[];
  issuedBy: string;
  issuedDate: string;
}

interface LicenseDetailsProps {
  licenseData: LicenseData;
}

export function LicenseDetails({ licenseData }: LicenseDetailsProps) {
  return (
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
  );
}
