import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useToast } from "@/components/ui/use-toast";

// Initialize mapboxgl access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || "";

export const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { toast } = useToast();

  const defaultCoordinates: [number, number] = [-118.2437, 34.0522]; // Los Angeles

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Request user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Initialize map
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: "mapbox://styles/mapbox/light-v11",
          center: [longitude, latitude],
          zoom: 12
        });

        // Add navigation control
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        // Add marker for user location
        map.current.on("load", () => {
          new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(map.current!);
        });

        console.log("Map initialized successfully");
      },
      (error) => {
        console.error("Error getting location:", error);
        toast({
          title: "Location Error",
          description: "Could not get your location. Using default location.",
          variant: "destructive"
        });

        // Initialize map with default location
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: "mapbox://styles/mapbox/light-v11",
          center: defaultCoordinates,
          zoom: 12
        });

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
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