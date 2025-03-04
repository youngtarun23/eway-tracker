
import React from 'react';
import { Truck } from '@/types';
import { TruckCard } from '@/components/TruckCard';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface TruckListProps {
  trucks: Truck[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export function TruckList({ trucks, currentPage, totalPages, goToPage }: TruckListProps) {
  if (trucks.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center">
        <p className="text-muted-foreground">
          No trucks match your search criteria.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {trucks.map((truck, index) => (
        <TruckCard 
          key={truck.id} 
          truck={truck} 
          className="animate-fade-in" 
          style={{ animationDelay: `${index * 0.05}s` }}
        />
      ))}

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  isActive={currentPage === i + 1}
                  onClick={() => goToPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
