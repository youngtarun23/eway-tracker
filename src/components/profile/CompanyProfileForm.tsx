
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyProfile } from '@/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { Lock, Save, Edit, CheckCircle, X } from 'lucide-react';

const initialProfile: CompanyProfile = {
  name: "Transport Co.",
  panNumber: "ABCDE1234F",
  gstNumber: "22AAAAA0000A1Z5",
  officeNumber: "+91 9876543210",
  email: "contact@transportco.com",
  verified: true
};

export const CompanyProfileForm = () => {
  const [profile, setProfile] = useState<CompanyProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<CompanyProfile>(initialProfile);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleInputChange = (field: keyof CompanyProfile) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempProfile({
      ...tempProfile,
      [field]: e.target.value
    });
  };

  const startEditing = () => {
    setTempProfile({...profile});
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setOtpDialogOpen(true);
  };

  const verifyOtp = () => {
    setIsVerifying(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      if (otp === '123456' || otp === '') {
        setProfile(tempProfile);
        setIsEditing(false);
        setOtpDialogOpen(false);
        toast.success("Profile updated successfully");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
      setOtp('');
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>Manage your company information</CardDescription>
            </div>
            {!isEditing ? (
              <Button variant="outline" onClick={startEditing}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" onClick={cancelEditing}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input 
                id="company-name" 
                value={isEditing ? tempProfile.name : profile.name}
                onChange={handleInputChange('name')}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pan-number">PAN Number</Label>
              <div className="relative">
                <Input 
                  id="pan-number" 
                  value={isEditing ? tempProfile.panNumber : profile.panNumber}
                  onChange={handleInputChange('panNumber')}
                  disabled={!isEditing}
                />
                {profile.verified && !isEditing && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gst-number">GST Number</Label>
              <div className="relative">
                <Input 
                  id="gst-number" 
                  value={isEditing ? tempProfile.gstNumber : profile.gstNumber}
                  onChange={handleInputChange('gstNumber')}
                  disabled={!isEditing}
                />
                {profile.verified && !isEditing && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="office-number">Office Contact Number</Label>
              <Input 
                id="office-number" 
                value={isEditing ? tempProfile.officeNumber : profile.officeNumber}
                onChange={handleInputChange('officeNumber')}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input 
                id="email" 
                type="email"
                value={isEditing ? tempProfile.email : profile.email}
                onChange={handleInputChange('email')}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
        {!isEditing && (
          <CardFooter className="border-t bg-secondary/20 py-3 px-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <Lock className="mr-2 h-4 w-4" />
              Verified company details. Changes require verification.
            </div>
          </CardFooter>
        )}
      </Card>

      <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Your Identity</DialogTitle>
            <DialogDescription>
              We've sent a verification code to {profile.email}. Please enter it below to confirm changes.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input 
                id="otp" 
                placeholder="123456" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                For demonstration, use code "123456" or leave empty
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOtpDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={verifyOtp} disabled={isVerifying}>
              {isVerifying ? "Verifying..." : "Verify & Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
