import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

interface PropertyMarkerProps {
  map: mapboxgl.Map;
  property: {
    longitude: number;
    latitude: number;
    type: string;
    title: string;
    address: string;
    price: number;
    auction_date?: string;
  };
  onMarkerClick?: () => void;
}

export const PropertyMarker = ({ map, property, onMarkerClick }: PropertyMarkerProps) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
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
    markerRef.current = new mapboxgl.Marker({ element: el })
      .setLngLat([property.longitude, property.latitude])
      .setPopup(popup)
      .addTo(map);

    if (onMarkerClick) {
      el.addEventListener('click', onMarkerClick);
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
      }
    };
  }, [map, property, onMarkerClick]);

  return null;
};