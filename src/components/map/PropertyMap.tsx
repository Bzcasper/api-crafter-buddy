import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from '@/components/ui/use-toast';

export const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = process.env.MAPBOX_TOKEN || '';
    
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([longitude, latitude]);
        
        // Initialize map with user's location
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [longitude, latitude],
          zoom: 12
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add user location marker
        new mapboxgl.Marker({ color: '#FF0000' })
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup().setHTML('<h3>Your Location</h3>'))
          .addTo(map.current);

        // Add sample property markers (replace with real data)
        const sampleProperties = [
          {
            coordinates: [longitude + 0.01, latitude + 0.01],
            price: '$450,000',
            type: 'Auction',
            address: '123 Main St'
          },
          {
            coordinates: [longitude - 0.01, latitude - 0.01],
            price: '$380,000',
            type: 'For Sale',
            address: '456 Oak Ave'
          }
        ];

        sampleProperties.forEach(property => {
          new mapboxgl.Marker({ color: '#4A90E2' })
            .setLngLat(property.coordinates)
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <div class="p-2">
                  <h3 class="font-bold">${property.type}</h3>
                  <p>${property.address}</p>
                  <p class="text-primary">${property.price}</p>
                </div>
              `)
            )
            .addTo(map.current!);
        });

      },
      (error) => {
        console.error('Error getting location:', error);
        toast({
          title: "Location Error",
          description: "Could not get your location. Showing default map view.",
          variant: "destructive"
        });

        // Initialize map with default location
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [-74.006, 40.7128], // Default to NYC
          zoom: 12
        });
      }
    );

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [toast]);

  return (
    <div ref={mapContainer} className="w-full h-full rounded-lg" />
  );
};