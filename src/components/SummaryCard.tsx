
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: number;
  type?: 'default' | 'success' | 'error';
  className?: string;
}

export function SummaryCard({ 
  title, 
  value, 
  type = 'default',
  className 
}: SummaryCardProps) {
  return (
    <div 
      className={cn(
        "rounded-xl p-5 flex flex-col items-center justify-center border transition-all",
        "hover:shadow-subtle animate-fade-in",
        type === 'default' && "bg-white border-border",
        type === 'success' && "bg-success/5 border-success/20",
        type === 'error' && "bg-destructive/5 border-destructive/20",
        className
      )}
    >
      <span className="text-sm font-medium text-muted-foreground mb-1">{title}</span>
      <span 
        className={cn(
          "text-4xl font-semibold",
          type === 'default' && "text-foreground",
          type === 'success' && "text-success",
          type === 'error' && "text-destructive",
        )}
      >
        {value}
      </span>
    </div>
  );
}
