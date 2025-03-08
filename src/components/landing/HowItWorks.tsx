
import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
        Three Simple Steps
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-muted p-8 rounded-lg text-center">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
            1
          </div>
          <h3 className="text-xl font-semibold mb-4">Register</h3>
          <ul className="text-muted-foreground space-y-2">
            <li>Enter your mobile number</li>
            <li>Add truck details</li>
            <li>Download mobile app</li>
          </ul>
        </div>
        
        <div className="bg-muted p-8 rounded-lg text-center">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
            2
          </div>
          <h3 className="text-xl font-semibold mb-4">Connect</h3>
          <ul className="text-muted-foreground space-y-2">
            <li>Install tracking device OR use driver's phone</li>
            <li>Instant activation</li>
          </ul>
        </div>
        
        <div className="bg-muted p-8 rounded-lg text-center">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
            3
          </div>
          <h3 className="text-xl font-semibold mb-4">Track</h3>
          <ul className="text-muted-foreground space-y-2">
            <li>View all trucks live</li>
            <li>Get automated alerts</li>
            <li>Share live location</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
