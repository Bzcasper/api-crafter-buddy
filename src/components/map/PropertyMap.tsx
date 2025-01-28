import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useToast } from "@/components/ui/use-toast";
import { initializeMap, mapboxToken } from "./utils/mapConfig";
import { PropertyMarker } from "./components/PropertyMarker";
import { usePropertyListings } from "./hooks/usePropertyListings";
import { MapOverlay } from "./components/MapOverlay";
import { Loader2 } from "lucide-react";

export const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const { toast } = useToast();
  const [showOverlay, setShowOverlay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const defaultCoordinates: [number, number] = [-118.2437, 34.0522]; // Los Angeles

  const { data: properties, error, isLoading: isLoadingProperties } = usePropertyListings();

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
      
      // Add terrain and building layers for 3D effect
      newMap.on('style.load', () => {
        newMap.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        });
        
        newMap.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        
        newMap.addLayer({
          'id': 'sky',
          'type': 'sky',
          'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 90.0],
            'sky-atmosphere-sun-intensity': 15
          }
        });
      });

      // Add compass and zoom controls
      newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add fullscreen control
      newMap.addControl(new mapboxgl.FullscreenControl(), 'top-right');
      
      // Add geolocate control
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      });
      newMap.addControl(geolocateControl, 'top-right');

      setMap(newMap);
      setIsLoading(false);

      // Get user location if available
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          newMap.flyTo({
            center: [longitude, latitude],
            zoom: 12,
            pitch: 45,
            bearing: -45,
            duration: 2000,
            essential: true
          });
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
      setIsLoading(false);
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
    <div className="relative w-full h-[600px] rounded-xl border shadow-lg overflow-hidden">
      {(isLoading || isLoadingProperties) && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className="w-full h-full transition-all duration-300"
      />
      
      {showOverlay && <MapOverlay onClick={handleOverlayClick} />}
      
      {map && properties?.map(property => (
        <PropertyMarker
          key={property.id}
          map={map}
          property={property}
        />
      ))}
      
      {/* Map attribution overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm text-xs text-muted-foreground p-1 text-center">
        © Mapbox © OpenStreetMap
      </div>
    </div>
  );
};

export default PropertyMap;