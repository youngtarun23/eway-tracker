
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Download } from 'lucide-react';
import { toast } from 'sonner';

interface ImportCSVProps {
  handleFileUpload: (file: File) => void;
  isLoading: boolean;
  csvTemplateUrl: string;
}

export function ImportCSV({ handleFileUpload, isLoading, csvTemplateUrl }: ImportCSVProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadHover, setUploadHover] = useState(false);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        toast.error('Please upload a CSV file');
        return;
      }
      handleFileUpload(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        accept=".csv"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={isLoading}
      />
      <div className="flex flex-col">
        <Button
          variant="outline"
          className="gap-2"
          disabled={isLoading}
          onClick={() => fileInputRef.current?.click()}
          onMouseEnter={() => setUploadHover(true)}
          onMouseLeave={() => setUploadHover(false)}
        >
          <Upload className={`h-4 w-4 ${uploadHover ? 'animate-slide-in-right' : ''}`} />
          <span>Upload CSV</span>
        </Button>
        <a 
          href={csvTemplateUrl} 
          download="truck_template.csv"
          className="text-xs text-primary flex items-center mt-1 hover:underline"
        >
          <Download className="h-3 w-3 mr-1" />
          Download Template
        </a>
      </div>
    </div>
  );
}
