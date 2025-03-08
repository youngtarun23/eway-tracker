
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenWaitlist: () => void;
}

const Header = ({ onOpenWaitlist }: HeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="text-2xl font-bold">TruckSathi</div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#benefits" className="text-sm font-medium hover:text-primary">Benefits</a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary">How It Works</a>
          <a href="#security" className="text-sm font-medium hover:text-primary">Security</a>
          <a href="#faq" className="text-sm font-medium hover:text-primary">FAQ</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
          <Button onClick={onOpenWaitlist}>Join Waitlist</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
