
import React from 'react';
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onOpenWaitlist: () => void;
}

const CTASection = ({ onOpenWaitlist }: CTASectionProps) => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Join Waitlist Now</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Limited time offer: First 100 users get 50% off for life
        </p>
        <Button size="lg" onClick={onOpenWaitlist}>
          Join Waitlist
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
