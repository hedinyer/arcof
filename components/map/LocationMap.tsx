"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const CIUDADES = {
  bucaramanga: { center: [-73.1198, 7.1195] as [number, number], zoom: 12 },
  giron: { center: [-73.1698, 7.0731] as [number, number], zoom: 12 },
  piedecuesta: { center: [-73.0496, 6.9894] as [number, number], zoom: 12 },
} as const;

export type CiudadKey = keyof typeof CIUDADES;

type LocationMapProps = {
  className?: string;
  centerCity?: CiudadKey;
  onLocationSelect?: (lng: number, lat: number) => void;
  selectedLng?: number | null;
  selectedLat?: number | null;
  /** Cuando cambia, hace fly al marcador (usar tras búsqueda por dirección) */
  flyToMarker?: number;
};

export function LocationMap({
  className = "",
  centerCity = "bucaramanga",
  onLocationSelect,
  selectedLng,
  selectedLat,
  flyToMarker,
}: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!token || !containerRef.current) return;

    const config = CIUDADES[centerCity];
    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/hedinyer/cmlu42fsp001101s2h0waean4",
      center: config.center,
      zoom: config.zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => setIsLoaded(true));

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      onLocationSelect?.(lng, lat);
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [onLocationSelect]);

  // Fly to city when centerCity changes
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;
    const config = CIUDADES[centerCity];
    mapRef.current.flyTo({ center: config.center, zoom: config.zoom });
  }, [centerCity, isLoaded]);

  // Update marker when selected location changes
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;

    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }

    if (selectedLng != null && selectedLat != null) {
      const marker = new mapboxgl.Marker({ color: "#FF385C" })
        .setLngLat([selectedLng, selectedLat])
        .addTo(mapRef.current);
      markerRef.current = marker;
    }
  }, [selectedLng, selectedLat, isLoaded]);

  // Fly to marker cuando viene de búsqueda (flyToMarker cambia)
  useEffect(() => {
    if (!mapRef.current || !isLoaded || !flyToMarker) return;
    if (selectedLng == null || selectedLat == null) return;
    mapRef.current.flyTo({
      center: [selectedLng, selectedLat],
      zoom: 15,
    });
  }, [flyToMarker, selectedLng, selectedLat, isLoaded]);

  return (
    <div
      ref={containerRef}
      className={`h-64 w-full rounded-lg overflow-hidden ${className}`}
    />
  );
}
