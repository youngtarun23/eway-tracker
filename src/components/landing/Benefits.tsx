
import React from 'react';
import { Check, BarChart3, Shield, Users } from 'lucide-react';

const Benefits = () => {
  return (
    <section id="benefits" className="py-16 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Benefits</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-background p-8 rounded-lg shadow-subtle">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="h-6 w-6 text-primary mr-2" />
              Save Money
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Reduce empty returns by 30%</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Cut fuel costs by 25%</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Minimize unauthorized stops</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Optimize route planning</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Increase trips per month</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-background p-8 rounded-lg shadow-subtle">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Shield className="h-6 w-6 text-primary mr-2" />
              Better Control
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Real-time truck location</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Instant driver communication</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Digital proof of delivery</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Route deviation alerts</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Theft prevention monitoring</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Role-based access controls</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-background p-8 rounded-lg shadow-subtle">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="h-6 w-6 text-primary mr-2" />
              Happy Customers
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Live delivery updates</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Accurate ETAs</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Digital documentation</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Professional service</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <span>Build trust</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
