import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Loader2 } from 'lucide-react'
import { usePropertyListings } from './hooks/usePropertyListings'
import { PropertyMarker } from './components/PropertyMarker'

// Set the access token from environment variables
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [loading, setLoading] = useState(true)
  const { data: properties, isLoading: propertiesLoading } = usePropertyListings()

  useEffect(() => {
    if (!mapContainer.current) return

    console.log('Initializing map with token:', mapboxgl.accessToken)

    try {
      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40], // Default to New York
        zoom: 9,
        antialias: true // Enable antialiasing for smoother rendering
      })

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right')
      map.current.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }), 'top-right')

      // Add terrain and 3D buildings
      map.current.on('load', () => {
        console.log('Map loaded successfully')
        setLoading(false)
        
        if (!map.current) return

        // Add 3D terrain
        map.current.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        })
        
        map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 })

        // Add 3D buildings
        map.current.addLayer({
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.6
          }
        })
      })

      map.current.on('error', (e) => {
        console.error('Map error:', e)
      })
    } catch (error) {
      console.error('Error initializing map:', error)
      setLoading(false)
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Add markers when properties data is loaded
  useEffect(() => {
    if (!map.current || !properties) return

    // Add markers for each property
    properties.forEach(property => {
      if (property.latitude && property.longitude) {
        const marker = new mapboxgl.Marker()
          .setLngLat([property.longitude, property.latitude])
          .addTo(map.current!)

        // Add popup with property information
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <h3 class="font-bold">${property.title}</h3>
            <p class="text-sm">${property.address}</p>
            <p class="text-sm font-bold">$${property.price.toLocaleString()}</p>
            ${property.auction_date ? `<p class="text-sm">Auction: ${new Date(property.auction_date).toLocaleDateString()}</p>` : ''}
          </div>
        `)

        marker.setPopup(popup)
      }
    })
  }, [properties])

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {(loading || propertiesLoading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm z-10">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  )
}