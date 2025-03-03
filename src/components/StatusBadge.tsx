
import { cn } from '@/lib/utils';
import { TruckStatus } from '@/types';

interface StatusBadgeProps {
  status: TruckStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "px-4 py-1 rounded-full text-sm font-medium inline-flex items-center justify-center",
        status === 'On-Track' 
          ? "bg-success/10 text-success border border-success/30" 
          : "bg-destructive/10 text-destructive border border-destructive/30",
        "animate-scale-in transition-all duration-200",
        className
      )}
    >
      <span className={cn(
        "w-2 h-2 rounded-full mr-2",
        status === 'On-Track' ? "bg-success animate-pulse-subtle" : "bg-destructive animate-pulse-subtle"
      )} />
      {status}
    </div>
  );
}
