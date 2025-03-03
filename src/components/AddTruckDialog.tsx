
import { useState } from 'react';
import { Truck, TruckStatus } from '@/types';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlusCircle } from 'lucide-react';

interface AddTruckDialogProps {
  onAddTruck: (truck: Omit<Truck, 'id'>) => void;
}

export function AddTruckDialog({ onAddTruck }: AddTruckDialogProps) {
  const [open, setOpen] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [ewayBill, setEwayBill] = useState('');
  const [driverNumber, setDriverNumber] = useState('');
  const [status, setStatus] = useState<TruckStatus>('On-Track');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vehicleNumber.trim() || !ewayBill.trim()) {
      toast.error('Vehicle number and E-way bill are required');
      return;
    }
    
    const newTruck: Omit<Truck, 'id'> = {
      vehicleNumber,
      ewayBill,
      status,
      driverNumber: driverNumber || undefined,
      imageUrl: '/placeholder.svg'
    };
    
    onAddTruck(newTruck);
    resetForm();
    setOpen(false);
  };
  
  const resetForm = () => {
    setVehicleNumber('');
    setEwayBill('');
    setDriverNumber('');
    setStatus('On-Track');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Add Truck</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] animate-scale-in">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Truck</DialogTitle>
            <DialogDescription>
              Enter the truck details below to add it to your tracking dashboard.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="vehicleNumber">Vehicle Number*</Label>
              <Input
                id="vehicleNumber"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="e.g. KA 53 EN 1756"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="ewayBill">E-way Bill*</Label>
              <Input
                id="ewayBill"
                value={ewayBill}
                onChange={(e) => setEwayBill(e.target.value)}
                placeholder="e.g. 124567809"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="driverNumber">Driver Number</Label>
              <Input
                id="driverNumber"
                value={driverNumber}
                onChange={(e) => setDriverNumber(e.target.value)}
                placeholder="e.g. 9876543210"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Status</Label>
              <RadioGroup 
                value={status} 
                onValueChange={(value) => setStatus(value as TruckStatus)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="On-Track" id="on-track" />
                  <Label htmlFor="on-track" className="text-success">On-Track</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Delayed" id="delayed" />
                  <Label htmlFor="delayed" className="text-destructive">Delayed</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Truck</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
