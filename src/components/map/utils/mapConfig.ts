import mapboxgl from "mapbox-gl";

export const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const initializeMap = (container: HTMLDivElement, defaultCoordinates: [number, number]): mapboxgl.Map => {
  const map = new mapboxgl.Map({
    container,
    style: "mapbox://styles/mapbox/streets-v12",
    center: defaultCoordinates,
    zoom: 12
  });

  map.addControl(new mapboxgl.NavigationControl(), "top-right");
  return map;
};