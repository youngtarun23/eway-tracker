
import { AlertTriangle } from 'lucide-react';
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

interface FineItem {
  id: string;
  date: string;
  offence: string;
  amount: number;
  status: 'Pending' | 'Paid';
}

interface FineDetailsProps {
  fineData: FineItem[];
}

export function FineDetails({ fineData }: FineDetailsProps) {
  const pendingFines = fineData.filter(fine => fine.status === 'Pending');
  const hasPendingFines = pendingFines.length > 0;

  if (!hasPendingFines) {
    return null;
  }

  return (
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
  );
}
