import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-css";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { House, DollarSign } from "lucide-react";

// Initialize mapboxgl access token
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
if (!mapboxToken) {
  console.error("Mapbox token is not set in environment variables");
}
mapboxgl.accessToken = mapboxToken;

export const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const { toast } = useToast();
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const defaultCoordinates: [number, number] = [-118.2437, 34.0522]; // Los Angeles

  const fetchProperties = async () => {
    try {
      const { data: properties, error } = await supabase
        .from('property_listings')
        .select('*')
        .eq('status', 'active');

      if (error) throw error;

      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add new markers
      properties?.forEach(property => {
        if (!map) return;

        const markerColor = property.type === 'tax_lien' ? '#FF79C6' : '#50FA7B';
        
        // Create marker element
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.backgroundColor = markerColor;
        el.style.borderRadius = '50%';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.color = 'white';
        el.innerHTML = property.type === 'tax_lien' 
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <h3 class="font-bold">${property.title}</h3>
            <p class="text-sm">${property.address}</p>
            <p class="text-sm font-bold">$${property.price.toLocaleString()}</p>
            ${property.auction_date ? `<p class="text-sm">Auction: ${new Date(property.auction_date).toLocaleDateString()}</p>` : ''}
          </div>
        `);

        // Add marker to map
        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([property.longitude, property.latitude])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
      });

    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: "Error",
        description: "Could not fetch property listings",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (!mapContainer.current || map) return;

    if (!mapboxToken) {
      toast({
        title: "Configuration Error",
        description: "Mapbox token is not configured. Please check your environment variables.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create new map instance
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: defaultCoordinates,
        zoom: 12
      });

      // Add navigation control
      newMap.addControl(new mapboxgl.NavigationControl(), "top-right");

      // When map loads, fetch properties
      newMap.on("load", () => {
        fetchProperties();
      });

      setMap(newMap);

      // Get user location if available
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          newMap.setCenter([longitude, latitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Could not get your location. Using default location.",
            variant: "destructive"
          });
        }
      );
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Map Error",
        description: "Could not initialize the map. Please try again later.",
        variant: "destructive"
      });
    }

    // Cleanup function
    return () => {
      if (map) {
        markersRef.current.forEach(marker => marker.remove());
        map.remove();
        setMap(null);
      }
    };
  }, [map, toast]);

  return (
    <div ref={mapContainer} className="w-full h-[500px] rounded-lg border" />
  );
};

export default PropertyMap;