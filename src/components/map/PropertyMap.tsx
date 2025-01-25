import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useToast } from "@/components/ui/use-toast";
import { initializeMap, mapboxToken } from "./utils/mapConfig";
import { PropertyMarker } from "./components/PropertyMarker";
import { usePropertyListings } from "./hooks/usePropertyListings";
import { MapOverlay } from "./components/MapOverlay";

export const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const { toast } = useToast();
  const [showOverlay, setShowOverlay] = useState(true);
  const defaultCoordinates: [number, number] = [-118.2437, 34.0522]; // Los Angeles

  const { data: properties, error } = usePropertyListings();

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
      const newMap = initializeMap(mapContainer.current, defaultCoordinates);
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

    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, [map, toast]);

  if (error) {
    console.error('Error fetching properties:', error);
    toast({
      title: "Error",
      description: "Could not fetch property listings",
      variant: "destructive"
    });
  }

  const handleOverlayClick = () => {
    setShowOverlay(false);
    mapContainer.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-[500px] rounded-lg border">
      <div ref={mapContainer} className="w-full h-full" />
      {showOverlay && <MapOverlay onClick={handleOverlayClick} />}
      {map && properties?.map(property => (
        <PropertyMarker
          key={property.id}
          map={map}
          property={property}
        />
      ))}
    </div>
  );
};

export default PropertyMap;