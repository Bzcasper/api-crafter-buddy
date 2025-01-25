import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useToast } from "@/components/ui/use-toast";

// Initialize mapboxgl access token
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
if (!mapboxToken) {
  console.error("Mapbox token is not set in environment variables");
}
mapboxgl.accessToken = mapboxToken;

export const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { toast } = useToast();

  const defaultCoordinates: [number, number] = [-118.2437, 34.0522]; // Los Angeles

  useEffect(() => {
    // Prevent re-initialization if map exists
    if (!mapContainer.current || map.current) return;

    if (!mapboxToken) {
      toast({
        title: "Configuration Error",
        description: "Mapbox token is not configured. Please check your environment variables.",
        variant: "destructive"
      });
      return;
    }

    const initializeMap = (coords: [number, number]) => {
      try {
        if (!mapContainer.current) return;

        // Create new map instance
        const newMap = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/light-v11",
          center: coords,
          zoom: 12
        });

        // Add navigation control
        newMap.addControl(new mapboxgl.NavigationControl(), "top-right");

        // Add marker when map loads
        newMap.on("load", () => {
          new mapboxgl.Marker()
            .setLngLat(coords)
            .addTo(newMap);
        });

        // Store map instance
        map.current = newMap;

      } catch (error) {
        console.error("Error initializing map:", error);
        toast({
          title: "Map Error",
          description: "Could not initialize the map. Please try again later.",
          variant: "destructive"
        });
      }
    };

    // Request user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        initializeMap([longitude, latitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
        toast({
          title: "Location Error",
          description: "Could not get your location. Using default location.",
          variant: "destructive"
        });
        initializeMap(defaultCoordinates);
      }
    );

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [toast]);

  return (
    <div ref={mapContainer} className="w-full h-[500px] rounded-lg border" />
  );
};

export default PropertyMap;