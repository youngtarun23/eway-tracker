
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

interface HeroProps {
  onOpenWaitlist: () => void;
}

const Hero = ({ onOpenWaitlist }: HeroProps) => {
  return (
    <section className="py-16 md:py-24 container mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your Trucks, Your Control - <span className="text-primary">No Tech Knowledge Required</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Transform your trucking business with India's simplest tracking solution. Built on government's ULIP platform for reliability you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" onClick={onOpenWaitlist}>
              Join Waitlist
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            "1000+ truck owners already on waitlist"
          </p>
        </div>
        <div className="relative h-[400px] bg-muted rounded-lg overflow-hidden shadow-xl">
          {/* This would be the hero image or mockup */}
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck">
              <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11c0 .6-.4 1-1 1h-2"></path>
              <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"></path>
              <circle cx="7" cy="18" r="2"></circle>
              <circle cx="17" cy="18" r="2"></circle>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
