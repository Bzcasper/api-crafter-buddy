import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useToast } from "@/components/ui/use-toast";

// Initialize mapboxgl access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || "";

export const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const { toast } = useToast();

  const defaultCoordinates: [number, number] = [-118.2437, 34.0522]; // Los Angeles

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const initializeMap = (coords: [number, number]) => {
      try {
        if (!mapContainer.current) return;
        
        // Initialize map
        mapInstance.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/light-v11",
          center: coords,
          zoom: 12
        });

        // Add navigation control
        mapInstance.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        // Add marker
        mapInstance.current.on("load", () => {
          new mapboxgl.Marker()
            .setLngLat(coords)
            .addTo(mapInstance.current!);
        });

        console.log("Map initialized successfully");
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
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [toast]);

  return (
    <div ref={mapContainer} className="w-full h-[500px] rounded-lg border" />
  );
};

export default PropertyMap;