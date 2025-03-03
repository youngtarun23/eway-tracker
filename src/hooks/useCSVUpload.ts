
import { useState } from 'react';
import { Truck } from '@/types';
import { toast } from 'sonner';

export function useCSVUpload(onImport: (trucks: Omit<Truck, 'id'>[]) => void) {
  const [isLoading, setIsLoading] = useState(false);

  const processCSV = (csvText: string) => {
    try {
      const lines = csvText.split('\n');
      const headers = lines[0].split(',').map(header => header.trim());
      
      // Validate required headers
      const requiredHeaders = ['vehicleNumber', 'ewayBill', 'status'];
      const missingHeaders = requiredHeaders.filter(
        header => !headers.includes(header)
      );
      
      if (missingHeaders.length > 0) {
        toast.error(`Missing required headers: ${missingHeaders.join(', ')}`);
        return;
      }
      
      const trucks: Omit<Truck, 'id'>[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',').map(value => value.trim());
        if (values.length !== headers.length) {
          toast.error(`Line ${i + 1} has invalid format`);
          continue;
        }
        
        const truck: Record<string, any> = {};
        headers.forEach((header, index) => {
          truck[header] = values[index];
        });
        
        // Validate status
        if (truck.status !== 'On-Track' && truck.status !== 'Delayed') {
          truck.status = 'On-Track'; // Default to On-Track
        }
        
        trucks.push(truck as Omit<Truck, 'id'>);
      }
      
      onImport(trucks);
    } catch (error) {
      console.error('Error processing CSV:', error);
      toast.error('Failed to process CSV file. Please check the format.');
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const csvText = event.target?.result as string;
        processCSV(csvText);
        setIsLoading(false);
      };
      
      reader.onerror = () => {
        toast.error('Error reading file');
        setIsLoading(false);
      };
      
      reader.readAsText(file);
    } catch (error) {
      toast.error('Error uploading file');
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleFileUpload
  };
}
