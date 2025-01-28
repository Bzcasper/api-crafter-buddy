import mapboxgl from "mapbox-gl";

export const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const initializeMap = (container: HTMLDivElement, defaultCoordinates: [number, number]): mapboxgl.Map => {
  mapboxgl.accessToken = mapboxToken;
  
  const map = new mapboxgl.Map({
    container,
    style: "mapbox://styles/mapbox/streets-v12",
    center: defaultCoordinates,
    zoom: 12,
    pitch: 45, // Add default pitch for 3D effect
    bearing: -45, // Add slight rotation
    antialias: true // Enable antialiasing for smoother rendering
  });

  // Enable terrain and building extrusion
  map.on('style.load', () => {
    map.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 12,
      'paint': {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          12,
          0,
          12.5,
          ['get', 'height']
        ],
        'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          12,
          0,
          12.5,
          ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
      }
    });
  });

  return map;
};