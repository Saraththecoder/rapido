import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRideStore } from '../store/useRideStore';

// Coordinate dictionary for Hyderabad location addresses
const COORDS = {
  'Hitech City Cyber Towers': [17.4504, 78.3808],
  'Jubilee Hills, Road No. 36': [17.4325, 78.4070],
  'Gachibowli DLF Cyber City': [17.4436, 78.3489],
  'Charminar Heritage Plaza': [17.3616, 78.4747],
  'Secunderabad Railway Station': [17.4347, 78.5015],
  'Tirupati Alipiri Tollgate': [13.6521, 79.4026],
  'Banjara Hills Care Hospital': [17.4162, 78.4485]
};

// Locate coordinates by name or fallback to a standard Hyderabad location
const getCoords = (name, fallback) => {
  if (!name) return fallback;
  for (const key of Object.keys(COORDS)) {
    if (
      name.toLowerCase().includes(key.toLowerCase()) || 
      key.toLowerCase().includes(name.toLowerCase())
    ) {
      return COORDS[key];
    }
  }
  return fallback;
};

export default function MapSVG({ mode = 'home' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const pilotMarkerRef = useRef(null);
  const location = useLocation();
  const { pickup, dropoff } = useRideStore();
  const [pilotProgress, setPilotProgress] = useState(0);

  const isFood = location.pathname.startsWith('/food');

  // Address lookup coordinates
  const startCoords = getCoords(pickup, [17.4504, 78.3808]); // Default to Hitech City
  const endCoords = getCoords(dropoff, [17.4325, 78.4070]); // Default to Jubilee Hills

  // Animate the pilot tracking progress along the path
  useEffect(() => {
    if (mode === 'tracking') {
      const interval = setInterval(() => {
        setPilotProgress((p) => {
          if (p >= 1) return 0; // Restart animation cycle
          return p + 0.02; // Increment progress
        });
      }, 250);
      return () => clearInterval(interval);
    } else {
      setPilotProgress(0);
    }
  }, [mode]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Cleanup previous Leaflet map instance if it exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Dynamic tile styling depending on light/dark mode theme
    const tileUrl = isFood
      ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

    // Build the Map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    L.tileLayer(tileUrl, {
      maxZoom: 19,
    }).addTo(map);

    // Populate layers depending on mode
    if (mode === 'home') {
      map.setView(startCoords, 14);

      // Pulsing location blue dot marker
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `
          <div class="relative w-6 h-6 flex items-center justify-center">
            <div class="absolute inset-0 w-full h-full rounded-full bg-blue-500/30 animate-ping"></div>
            <div class="w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-md"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      L.marker(startCoords, { icon: userIcon }).addTo(map);

    } else if (mode === 'route' || mode === 'tracking') {
      // Fit bounds to cover both coordinates
      map.fitBounds([startCoords, endCoords], { padding: [50, 50] });

      // Pickup Marker (Green)
      const startIcon = L.divIcon({
        className: 'custom-start-marker',
        html: `<div class="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-lg"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      L.marker(startCoords, { icon: startIcon }).addTo(map);

      // Destination Marker (Red)
      const endIcon = L.divIcon({
        className: 'custom-end-marker',
        html: `<div class="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-lg"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      L.marker(endCoords, { icon: endIcon }).addTo(map);

      // Dash route connection line
      const routeColor = isFood ? '#FC8019' : '#FDE047';
      L.polyline([startCoords, endCoords], {
        color: routeColor,
        weight: 4,
        dashArray: '6, 6',
        lineCap: 'round'
      }).addTo(map);

      // Dynamic Pilot Marker (Scooter/Auto icon depending on theme)
      if (mode === 'tracking') {
        const vehicleEmoji = isFood ? '🛵' : '🏍️';
        const pilotIcon = L.divIcon({
          className: 'custom-pilot-marker',
          html: `
            <div class="w-8 h-8 rounded-full bg-yellow-450 border-2 border-slate-900 shadow-xl flex items-center justify-center font-bold text-sm">
              ${vehicleEmoji}
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        // Initialize pilot location at starting coordinates
        const pilotMarker = L.marker(startCoords, { icon: pilotIcon }).addTo(map);
        pilotMarkerRef.current = pilotMarker;
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mode, pickup, dropoff, isFood]);

  // Adjust pilot marker position dynamically based on interval increments
  useEffect(() => {
    if (mode === 'tracking' && pilotMarkerRef.current) {
      const lat = startCoords[0] + (endCoords[0] - startCoords[0]) * pilotProgress;
      const lng = startCoords[1] + (endCoords[1] - startCoords[1]) * pilotProgress;
      pilotMarkerRef.current.setLatLng([lat, lng]);
    }
  }, [pilotProgress, mode, startCoords, endCoords]);

  return (
    <div className="relative w-full h-[320px] bg-slate-950 overflow-hidden shadow-inner border-b border-gray-800">
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* Tracking overlay badge */}
      {mode === 'tracking' && (
        <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-yellow-500/30 flex items-center gap-1.5 shadow-md z-[1000]">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider">Pilot En Route</span>
        </div>
      )}
    </div>
  );
}
