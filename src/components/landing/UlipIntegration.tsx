
import React from 'react';
import { Check } from 'lucide-react';

const UlipIntegration = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto">
        <div className="bg-background p-8 rounded-lg shadow-subtle max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Powered by ULIP</h2>
          <h3 className="text-center font-medium text-lg mb-6">ULIP Integration</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Government's Unified Logistics Interface Platform</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Secure & reliable infrastructure</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Pan-India coverage</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Official documentation support</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-success mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Integrated with FastTag & Vahan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UlipIntegration;
