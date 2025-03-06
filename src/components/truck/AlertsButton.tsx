
import { useState } from 'react';
import { Bell, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface AlertsButtonProps {
  vehicleNumber: string;
  defaultEmail?: string;
}

interface AlertContact {
  type: 'email' | 'phone';
  value: string;
}

export function AlertsButton({ vehicleNumber, defaultEmail }: AlertsButtonProps) {
  const [contacts, setContacts] = useState<AlertContact[]>([
    { type: 'email', value: defaultEmail || '' }
  ]);
  const [threshold, setThreshold] = useState('30'); // minutes
  const [open, setOpen] = useState(false);

  const handleAddContact = () => {
    setContacts([...contacts, { type: 'email', value: '' }]);
  };

  const handleRemoveContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleContactChange = (index: number, value: string) => {
    const newContacts = [...contacts];
    newContacts[index].value = value;
    setContacts(newContacts);
  };

  const handleContactTypeChange = (index: number, type: 'email' | 'phone') => {
    const newContacts = [...contacts];
    newContacts[index].type = type;
    newContacts[index].value = ''; // Clear value when changing type
    setContacts(newContacts);
  };

  const handleSubmit = () => {
    // Validate contacts
    const isValid = contacts.every(contact => {
      if (contact.type === 'email') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.value);
      }
      return /^\+?[\d\s-]{10,}$/.test(contact.value);
    });

    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please enter valid email addresses and phone numbers",
        variant: "destructive"
      });
      return;
    }

    // Here you would integrate with your backend to save the alerts
    toast({
      title: "Alerts Set Successfully",
      description: `Alerts will be sent when delay exceeds ${threshold} minutes`,
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full mt-2">
          <Bell className="h-4 w-4 mr-2" />
          Set Alerts
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Delay Alerts</DialogTitle>
          <DialogDescription>
            Get notified when vehicle {vehicleNumber} is delayed beyond the specified threshold.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="threshold">Delay Threshold</Label>
            <Select
              value={threshold}
              onValueChange={setThreshold}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select threshold" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Alert Recipients</Label>
            {contacts.map((contact, index) => (
              <div key={index} className="flex gap-2 items-start">
                <Select
                  value={contact.type}
                  onValueChange={(value: 'email' | 'phone') => 
                    handleContactTypeChange(index, value)
                  }
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input
                  type={contact.type === 'email' ? 'email' : 'tel'}
                  placeholder={contact.type === 'email' ? 'Email' : 'Phone'}
                  value={contact.value}
                  onChange={(e) => handleContactChange(index, e.target.value)}
                />
                
                {contacts.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveContact(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddContact}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Recipient
            </Button>
          </div>
        </div>

        <Button onClick={handleSubmit}>Save Alert Settings</Button>
      </DialogContent>
    </Dialog>
  );
}
