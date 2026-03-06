"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const DEFAULT_CENTER: [number, number] = [-73.1198, 7.1195];
const DEFAULT_ZOOM = 11;
const SOURCE_ID = "properties";
const CLUSTER_LAYER_ID = "clusters";
const CLUSTER_COUNT_LAYER_ID = "cluster-count";
const UNCLUSTERED_LAYER_ID = "unclustered-point";
const CLUSTER_MAX_ZOOM = 14;
const CLUSTER_RADIUS = 48;

export type PropertyMapItem = {
  id: string;
  lat: number;
  lng: number;
  price: string;
  tipo_oferta: "venta" | "arriendo";
  title: string;
  imageUrl?: string | null;
};

type PropertiesMapProps = {
  className?: string;
  properties: PropertyMapItem[];
};

export function PropertiesMap({ className = "", properties }: PropertiesMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const isLoadedRef = useRef(false);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!token || !containerRef.current) return;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/hedinyer/cmlu42fsp001101s2h0waean4",
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    mapRef.current = map;

    const popup = new mapboxgl.Popup({ offset: 16, closeButton: true, closeOnClick: true });
    popupRef.current = popup;

    map.on("load", () => {
      isLoadedRef.current = true;

      const initialData = toGeoJson(properties);
      map.addSource(SOURCE_ID, {
        type: "geojson",
        data: initialData,
        cluster: true,
        clusterMaxZoom: CLUSTER_MAX_ZOOM,
        clusterRadius: CLUSTER_RADIUS,
      });

      map.addLayer({
        id: CLUSTER_LAYER_ID,
        type: "circle",
        source: SOURCE_ID,
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#0ea5e9",
          "circle-opacity": 0.92,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2,
          "circle-radius": [
            "step",
            ["get", "point_count"],
            18,
            10,
            22,
            50,
            28,
            200,
            34,
          ],
        },
      });

      map.addLayer({
        id: CLUSTER_COUNT_LAYER_ID,
        type: "symbol",
        source: SOURCE_ID,
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#ffffff",
        },
      });

      map.addLayer({
        id: UNCLUSTERED_LAYER_ID,
        type: "circle",
        source: SOURCE_ID,
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#0ea5e9",
          "circle-opacity": 0.95,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2,
          "circle-radius": 8,
        },
      });

      map.on("click", CLUSTER_LAYER_ID, (e) => {
        const feature = e.features?.[0];
        if (!feature) return;
        const clusterId = feature.properties?.cluster_id as number | undefined;
        const source = map.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource & {
          getClusterExpansionZoom?: (clusterId: number, cb: (err: unknown, zoom?: number | null) => void) => void;
        };
        const coords = feature.geometry?.type === "Point" ? (feature.geometry.coordinates as number[]) : null;
        if (!clusterId || !coords || typeof source.getClusterExpansionZoom !== "function") return;

        source.getClusterExpansionZoom(clusterId, (_err, zoom) => {
          const safeZoom = typeof zoom === "number" ? zoom : DEFAULT_ZOOM;
          map.easeTo({ center: coords as [number, number], zoom: Math.min(safeZoom, 16) });
        });
      });

      map.on("click", UNCLUSTERED_LAYER_ID, (e) => {
        const feature = e.features?.[0];
        if (!feature || feature.geometry.type !== "Point") return;
        const coords = feature.geometry.coordinates as [number, number];
        const p = feature.properties ?? {};
        const id = String(p.id ?? "");
        const title = String(p.title ?? "");
        const price = String(p.price ?? "");
        const tipo_oferta = String(p.tipo_oferta ?? "");
        const imageUrl = String(p.imageUrl ?? "");

        const html = renderPopupHtml({ id, title, price, tipo_oferta, imageUrl });
        popup.setLngLat(coords).setHTML(html).addTo(map);
      });

      map.on("mouseenter", CLUSTER_LAYER_ID, () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", CLUSTER_LAYER_ID, () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("mouseenter", UNCLUSTERED_LAYER_ID, () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", UNCLUSTERED_LAYER_ID, () => {
        map.getCanvas().style.cursor = "";
      });

      fitToFeatures(map, properties);
    });

    return () => {
      popupRef.current?.remove();
      popupRef.current = null;
      map.remove();
      mapRef.current = null;
      isLoadedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isLoadedRef.current) return;
    const source = map.getSource(SOURCE_ID) as mapboxgl.GeoJSONSource | undefined;
    if (!source) return;

    source.setData(toGeoJson(properties));
    fitToFeatures(map, properties);
  }, [properties]);

  return (
    <div
      ref={containerRef}
      className={`h-[420px] w-full rounded-xl overflow-hidden border border-neutral-200/80 ${className}`}
    />
  );
}

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

function toGeoJson(properties: PropertyMapItem[]): GeoJSON.FeatureCollection<GeoJSON.Geometry> {
  const features: GeoJSON.Feature<GeoJSON.Geometry>[] = properties
    .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng))
    .map((p) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [p.lng, p.lat],
      },
      properties: {
        id: p.id,
        title: p.title,
        price: p.price,
        tipo_oferta: p.tipo_oferta,
        imageUrl: p.imageUrl ?? "",
      },
    }));
  return { type: "FeatureCollection", features };
}

function fitToFeatures(map: mapboxgl.Map, properties: PropertyMapItem[]) {
  const pts = properties.filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng));
  if (pts.length === 0) return;

  const bounds = new mapboxgl.LngLatBounds();
  for (const p of pts) bounds.extend([p.lng, p.lat]);

  if (pts.length === 1) {
    map.flyTo({ center: [pts[0].lng, pts[0].lat], zoom: 14 });
    return;
  }

  map.fitBounds(bounds, { padding: 56, maxZoom: 14 });
}

function renderPopupHtml(args: {
  id: string;
  title: string;
  price: string;
  tipo_oferta: string;
  imageUrl: string;
}) {
  const safeTitle = escapeHtml(args.title);
  const safePrice = escapeHtml(args.price);
  const safeImg = args.imageUrl ? escapeHtml(args.imageUrl) : "";
  const suffix = args.tipo_oferta === "arriendo" ? " / mes" : "";
  const imgHtml = safeImg
    ? `<div style="width: 100%; aspect-ratio: 16 / 10; overflow: hidden; border-radius: 10px; background: #f1f5f9; border: 1px solid rgba(226,232,240,1); margin-bottom: 10px;">
         <img src="${safeImg}" alt="" style="width: 100%; height: 100%; object-fit: cover; display: block;" loading="lazy" />
       </div>`
    : "";

  return `
    <div style="min-width: 220px; max-width: 260px;">
      ${imgHtml}
      <p style="margin: 0 0 4px; font-weight: 700; font-size: 14px; color: #0f172a; line-height: 1.2;">${safeTitle}</p>
      <p style="margin: 0 0 10px; font-size: 15px; font-weight: 800; color: #0ea5e9;">${safePrice}${escapeHtml(suffix)}</p>
      <a href="/propiedades/${escapeHtml(args.id)}" style="display: inline-block; font-size: 13px; font-weight: 650; color: #0ea5e9;">Ver propiedad →</a>
    </div>
  `;
}
