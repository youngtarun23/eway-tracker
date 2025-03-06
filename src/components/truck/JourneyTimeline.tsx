
import { Circle, CheckCircle2, XCircle, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { CityStop, Location } from '@/types';
import { cn } from '@/lib/utils';
import Map from '@/components/Map';

interface JourneyTimelineProps {
  origin: Location;
  destination: Location;
  cityStops: CityStop[];
  progress: number;
  status: 'On-Track' | 'Delayed';
}

export function JourneyTimeline({ origin, destination, cityStops, progress, status }: JourneyTimelineProps) {
  return (
    <div className="border rounded-lg p-4 bg-secondary/10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-primary" />
          <span className="text-sm font-medium">{origin.name}</span>
        </div>
        <div className="text-sm font-medium">Journey Progress: {progress}%</div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-primary" />
          <span className="text-sm font-medium">{destination.name}</span>
        </div>
      </div>

      {/* City Stops Timeline */}
      <div className="relative flex justify-between items-center mb-5 px-2">
        {cityStops.map((stop, index) => {
          let Icon = Circle;
          let color = "text-muted-foreground";
          
          if (stop.status === 'On-Track') {
            Icon = CheckCircle2;
            color = "text-success";
          } else if (stop.status === 'Delayed') {
            Icon = XCircle;
            color = "text-destructive";
          }
          
          return (
            <div 
              key={index} 
              className="flex flex-col items-center"
              style={{ 
                position: 'relative',
                zIndex: 10
              }}
            >
              <Icon className={`h-5 w-5 ${color}`} />
              <span className="text-xs mt-1 font-medium text-center">
                {stop.location.name}
              </span>
              {stop.crossedAt && (
                <span className={`text-xs ${stop.status === 'Delayed' ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {format(stop.crossedAt, 'HH:mm')}
                </span>
              )}
            </div>
          );
        })}
        
        {/* Dotted line connecting the stops */}
        <div 
          className="absolute top-[10px] h-[1px] left-[10px] right-[10px] bg-dotted-line"
          style={{ 
            backgroundImage: 'linear-gradient(to right, #cbd5e1 50%, transparent 50%)',
            backgroundSize: '8px 1px',
            backgroundRepeat: 'repeat-x',
            zIndex: 1
          }}
        />
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-secondary/30 rounded-full h-2.5 mb-4">
        <div 
          className={cn(
            "h-2.5 rounded-full transition-all duration-500",
            status === 'On-Track' ? "bg-success" : "bg-destructive"
          )}
          style={{ width: `${progress}%` }} 
        ></div>
      </div>

      {/* Map Component */}
      <Map 
        origin={origin}
        destination={destination}
        progress={progress}
        className="h-48 rounded-lg"
      />
    </div>
  );
}
