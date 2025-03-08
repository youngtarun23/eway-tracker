
import React from 'react';
import { Phone, BarChart3, Bell, Shield } from 'lucide-react';

const ProblemStatement = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">The Daily Struggles of Truck Owners</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-background p-6 rounded-lg shadow-subtle flex flex-col items-center text-center">
            <Phone className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">"Where is my driver?"</h3>
            <p className="text-muted-foreground">Countless calls to drivers</p>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-subtle flex flex-col items-center text-center">
            <BarChart3 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">40% Revenue Loss</h3>
            <p className="text-muted-foreground">From idle trucks</p>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-subtle flex flex-col items-center text-center">
            <Bell className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Real-time Updates</h3>
            <p className="text-muted-foreground">For customers</p>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-subtle flex flex-col items-center text-center">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Security Concerns</h3>
            <p className="text-muted-foreground">During night halts</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
