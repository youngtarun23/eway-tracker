
import React from 'react';
import { Truck, MapPin, Users, FileText, Fuel } from 'lucide-react';

const SolutionPreview = () => {
  return (
    <section className="py-16 container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">Solution Preview</h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
        A complete trucking management platform designed for owners, not tech experts.
      </p>
      
      <div className="relative h-[400px] bg-muted rounded-lg overflow-hidden shadow-xl mb-12">
        {/* This would be the tracking interface image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
          <Truck className="h-24 w-24 mb-4" />
          <h3 className="text-xl font-semibold">Tracking Interface</h3>
          <ul className="mt-4 text-center">
            <li className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="h-4 w-4" /> Live location on simple maps
            </li>
            <li className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-4 w-4" /> Driver status updates
            </li>
            <li className="flex items-center justify-center gap-2 mb-2">
              <FileText className="h-4 w-4" /> Delivery confirmations
            </li>
            <li className="flex items-center justify-center gap-2 mb-2">
              <Fuel className="h-4 w-4" /> Fuel monitoring
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SolutionPreview;
