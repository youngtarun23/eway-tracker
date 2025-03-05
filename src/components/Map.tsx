
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location } from '@/types';

interface MapProps {
  origin: Location;
  destination: Location;
  progress: number;
  className?: string;
}

const Map = ({ origin, destination, progress, className }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');

  useEffect(() => {
    // In a real application, this would be stored in an environment variable
    // or fetched from a secure backend
    const userToken = localStorage.getItem('mapbox-token');
    setMapboxToken(userToken || '');
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    const bounds = new mapboxgl.LngLatBounds(
      [origin.lng, origin.lat],
      [destination.lng, destination.lat]
    );

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      bounds: bounds,
      fitBoundsOptions: { padding: 50 }
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers
    new mapboxgl.Marker({ color: '#3FB1CE' })
      .setLngLat([origin.lng, origin.lat])
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${origin.name}</h3>`))
      .addTo(map.current);

    new mapboxgl.Marker({ color: '#F84C4C' })
      .setLngLat([destination.lng, destination.lat])
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${destination.name}</h3>`))
      .addTo(map.current);

    // Draw route line
    map.current.on('load', () => {
      if (!map.current) return;

      // Add the route source and layer
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [origin.lng, origin.lat],
              [destination.lng, destination.lat]
            ]
          }
        }
      });

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3FB1CE',
          'line-width': 8
        }
      });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [origin, destination, mapboxToken]);

  if (!mapboxToken) {
    return (
      <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">Enter your Mapbox token to see the map</p>
          <p className="text-xs text-muted-foreground mt-1">From {origin.name} to {destination.name}</p>
        </div>
        <input 
          type="password" 
          placeholder="Enter Mapbox token" 
          className="w-full p-2 border rounded"
          onChange={(e) => {
            localStorage.setItem('mapbox-token', e.target.value);
            setMapboxToken(e.target.value);
          }}
        />
        <p className="text-xs mt-2">
          Get your token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary">mapbox.com</a>
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
    </div>
  );
};

export default Map;
