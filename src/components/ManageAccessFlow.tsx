
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Check, Plus, X } from 'lucide-react';

interface UserAccess {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}

export function ManageAccessFlow() {
  const [users, setUsers] = useState<UserAccess[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1234567890', role: 'Admin' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+9876543210', role: 'Editor' },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [newUser, setNewUser] = useState<Omit<UserAccess, 'id'>>({
    name: '',
    email: '',
    phone: '',
    role: 'Viewer'
  });

  const handleAddUser = () => {
    // Validate form
    if (!newUser.name || !newUser.email || !newUser.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    // Add new user
    const id = Math.random().toString(36).substring(2, 9);
    setUsers([...users, { ...newUser, id }]);
    setIsOpen(false);
    
    // Reset form
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: 'Viewer'
    });
    
    toast.success('User access granted successfully');
  };

  const handleRemoveUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success('User access revoked');
  };

  const handleRoleChange = (id: string, role: 'Admin' | 'Editor' | 'Viewer') => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role } : user
    ));
    toast.success('Role updated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">User Access Management</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Grant Access</DialogTitle>
              <DialogDescription>
                Add a new user to grant access to the platform.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  placeholder="+1234567890"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Access Level</Label>
                <Select 
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({...newUser, role: value as 'Admin' | 'Editor' | 'Viewer'})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin (Full Access)</SelectItem>
                    <SelectItem value="Editor">Editor (Can Edit)</SelectItem>
                    <SelectItem value="Viewer">Viewer (Read Only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="grid grid-cols-5 p-4 border-b bg-muted/40 font-medium">
          <div className="col-span-2">User</div>
          <div>Mobile</div>
          <div>Access Level</div>
          <div className="text-right">Actions</div>
        </div>
        
        {users.map((user) => (
          <div key={user.id} className="grid grid-cols-5 p-4 border-b items-center">
            <div className="col-span-2">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
            <div>{user.phone}</div>
            <div>
              <Select 
                value={user.role}
                onValueChange={(value) => handleRoleChange(user.id, value as 'Admin' | 'Editor' | 'Viewer')}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveUser(user.id)}
                disabled={user.role === 'Admin' && users.filter(u => u.role === 'Admin').length === 1}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        {users.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No users added yet. Click the "Add New User" button to grant access.
          </div>
        )}
      </div>
    </div>
  );
}
