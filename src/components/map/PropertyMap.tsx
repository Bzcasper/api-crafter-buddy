import { useEffect, useRef, useState } from "react";
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
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const { toast } = useToast();

  const defaultCoordinates: [number, number] = [-118.2437, 34.0522]; // Los Angeles

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
        style: "mapbox://styles/mapbox/light-v11",
        center: defaultCoordinates,
        zoom: 12
      });

      // Add navigation control
      newMap.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add marker when map loads
      newMap.on("load", () => {
        new mapboxgl.Marker()
          .setLngLat(defaultCoordinates)
          .addTo(newMap);
      });

      setMap(newMap);

      // Get user location if available
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          newMap.setCenter([longitude, latitude]);
          new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(newMap);
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