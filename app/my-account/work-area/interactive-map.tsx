"use client";
/* eslint-disable */
import { useEffect, useRef, useState } from "react";

interface InteractiveMapProps {
  distance: number;
  centerCoords: { lat: number; lng: number };
  locationName: string;
}

interface Pin {
  id: number;
  lat: number;
  lng: number;
}

export default function InteractiveMap({
  distance,
  centerCoords,
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [pins, setPins] = useState<Pin[]>([]);
  const { lat: centerLat, lng: centerLng } = centerCoords;

  const generateInitialPins = (distanceKm: number) => {
    const numPins = 12;
    const pins: Pin[] = [];

    for (let i = 0; i < numPins; i++) {
      const angle = (i * 360) / numPins;
      const radians = (angle * Math.PI) / 180;

      // Convert distance to approximate lat/lng offset
      const latOffset = (distanceKm / 111) * Math.cos(radians);
      const lngOffset =
        (distanceKm / (111 * Math.cos((centerLat * Math.PI) / 180))) *
        Math.sin(radians);

      pins.push({
        id: i,
        lat: centerLat + latOffset,
        lng: centerLng + lngOffset,
      });
    }

    return pins;
  };

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !map) {
      // Dynamically import Leaflet
      import("leaflet").then((L) => {
        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });

        const mapInstance = L.map(mapRef.current!).setView(
          [centerLat, centerLng],
          10,
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstance);

        // Add center marker
        const centerIcon = L.divIcon({
          className: "center-marker",
          html: '<div style="width: 20px; height: 20px; background: #14b8a6; border: 4px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        L.marker([centerLat, centerLng], { icon: centerIcon }).addTo(
          mapInstance,
        );

        setMap(mapInstance);

        // Generate initial pins
        const initialPins = generateInitialPins(distance * 1.609); // Convert miles to km
        setPins(initialPins);
      });
    }
  }, [distance, map]);

  useEffect(() => {
    if (map && pins.length > 0) {
      map.eachLayer((layer: any) => {
        if (
          layer.options &&
          (layer.options.draggable ||
            layer instanceof (window as any).L?.Polygon ||
            layer instanceof (window as any).L?.Circle)
        ) {
          map.removeLayer(layer);
        }
      });

      const L = (window as any).L;
      if (!L) return;

      const markers: any[] = [];

      // Add draggable pins
      pins.forEach((pin) => {
        const pinIcon = L.divIcon({
          className: "draggable-pin",
          html: '<div style="width: 16px; height: 16px; background: #2f76d9; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3); cursor: grab;"></div>',
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        const marker = L.marker([pin.lat, pin.lng], {
          icon: pinIcon,
          draggable: true,
        }).addTo(map);

        marker.on("drag", (e: any) => {
          const newPos = e.target.getLatLng();
          setPins((prevPins) =>
            prevPins.map((p) =>
              p.id === pin.id ? { ...p, lat: newPos.lat, lng: newPos.lng } : p,
            ),
          );
        });

        markers.push(marker);
      });

      // 🟦 Draw transparent blue circle overlay
      const circle = L.circle([centerLat, centerLng], {
        radius: distance * 1609, // miles to meters
        color: "#3b82f6", // outline color (blue-500)
        fillColor: "#3b82f6", // fill color
        fillOpacity: 0.2, // transparent blue fill
        weight: 1,
      });
      circle.addTo(map);
    }
  }, [map, pins]);

  // Update pins when distance changes
  useEffect(() => {
    if (map) {
      const newPins = generateInitialPins(distance * 1.609); // Convert miles to km
      setPins(newPins);
    }
  }, [distance, map]);

  // Add this useEffect after the existing ones
  useEffect(() => {
    if (map && centerCoords) {
      // Update map center
      map.setView([centerCoords.lat, centerCoords.lng], 10);

      // Clear existing center marker
      map.eachLayer((layer: any) => {
        if (layer.options && layer.options.className === "center-marker") {
          map.removeLayer(layer);
        }
      });

      // Add new center marker
      const L = (window as any).L;
      if (L) {
        const centerIcon = L.divIcon({
          className: "center-marker",
          html: '<div style="width: 20px; height: 20px; background: #14b8a6; border: 4px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        L.marker([centerCoords.lat, centerCoords.lng], {
          icon: centerIcon,
          className: "center-marker",
        }).addTo(map);
      }

      // Regenerate pins around new location
      const newPins = generateInitialPins(distance * 1.609);
      setPins(newPins);
    }
  }, [map, centerCoords, distance]);

  return (
    <>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <div
        ref={mapRef}
        className="h-96 md:h-[500px] w-full relative z-0"
        style={{ minHeight: "400px" }}
      />
    </>
  );
}
