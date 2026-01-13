"use client";

import React, { useEffect, useRef, useState } from 'react';
import { BusinessListing } from './ListingCard';

// Leaflet types
declare global {
  interface Window {
    L: any;
  }
}

interface BusinessMapProps {
  listings: BusinessListing[];
  hoveredListingId: string | null;
}

const BusinessMap: React.FC<BusinessMapProps> = ({ listings, hoveredListingId }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const markersRef = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPIP, setIsPIP] = useState(false);

  // Responsive PIP mode
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsPIP(true);
      } else {
        setIsPIP(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update map size when container size changes (e.g. PIP toggle)
  useEffect(() => {
    if (map) {
      const timer = setTimeout(() => {
        map.invalidateSize();
      }, 350); // Wait for transition
      return () => clearTimeout(timer);
    }
  }, [isPIP, map]);

  // Load Leaflet
  useEffect(() => {
    const loadLeaflet = () => {
      if (window.L) {
        setIsLoaded(true);
        return;
      }

      // Load Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Load Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        setIsLoaded(true);
      };
      document.head.appendChild(script);
    };

    loadLeaflet();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.L) return;

    // Initialize Leaflet map
    const mapInstance = window.L.map(mapRef.current).setView([-28.7282, 24.7499], 12);

    // Add OpenStreetMap tiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [isLoaded]);

  // Handle marker updates
  useEffect(() => {
    if (!map || !isLoaded || !window.L) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());

    const newMarkers: any[] = [];

    listings.forEach(listing => {
      try {
        if (!listing.coordinates ||
          typeof listing.coordinates.lat !== 'number' ||
          typeof listing.coordinates.lng !== 'number' ||
          isNaN(listing.coordinates.lat) ||
          isNaN(listing.coordinates.lng)) {
          return;
        }

        // Create custom icon (default state)
        const icon = window.L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              width: 28px;
              height: 28px;
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="
                position: absolute;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #6b7280, #9ca3af);
                border-radius: 50%;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              "></div>
              <div style="
                width: 12px;
                height: 12px;
                background: white;
                border-radius: 50%;
                position: relative;
                z-index: 2;
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
              "></div>
              <div style="
                width: 6px;
                height: 6px;
                background: #6b7280;
                border-radius: 50%;
                position: absolute;
                z-index: 3;
              "></div>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        // Create marker
        const marker = window.L.marker([listing.coordinates.lat, listing.coordinates.lng], { icon })
          .addTo(map);

        // Create popup
        const popup = window.L.popup({
          closeButton: false,
          autoClose: false,
          content: `
            <div style="padding: 12px; max-width: 220px; font-family: system-ui, -apple-system, sans-serif;">
              <h4 style="margin: 0 0 6px 0; font-weight: bold; color: #1f2937; font-size: 14px;">${listing.name}</h4>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280; font-weight: 500;">${listing.category}</p>
              <div style="margin: 0 0 4px 0; font-size: 11px; color: #9ca3af; display: flex; align-items: flex-start;">
                <span style="margin-right: 4px;">📍</span>
                <span>${listing.address}</span>
              </div>
              <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 12px;">
                <div style="color: #1f2937; margin-bottom: 2px;">⭐ ${listing.rating} (${listing.reviews} reviews)</div>
                <div style="color: #6b7280;">📞 ${listing.phone}</div>
              </div>
            </div>
          `
        });

        marker.bindPopup(popup);
        marker.listingId = listing.id;

        newMarkers.push(marker);
      } catch (error) {
        console.warn('Error creating marker for listing:', listing.id, error);
      }
    });

    setMarkers(newMarkers);
    markersRef.current = newMarkers;

    // Fit map to show all markers
    if (newMarkers.length > 0) {
      try {
        const group = new window.L.featureGroup(newMarkers);
        const bounds = group.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds.pad(0.1));
        }
      } catch (error) {
        console.warn('Error fitting bounds:', error);
      }
    }
  }, [map, listings, isLoaded]);

  // Handle hover state changes without recreating markers
  useEffect(() => {
    if (!map || markers.length === 0) return;

    markers.forEach(marker => {
      const isHovered = hoveredListingId === marker.listingId;

      // Update marker appearance
      const markerElement = marker.getElement();
      if (markerElement) {
        if (isHovered) {
          markerElement.style.transform = 'scale(1.3)';
          markerElement.style.zIndex = '1000';
          markerElement.style.filter = 'drop-shadow(0 8px 16px rgba(37, 99, 235, 0.4))';
        } else {
          markerElement.style.transform = 'scale(1)';
          markerElement.style.zIndex = '500';
          markerElement.style.filter = 'none';
        }
      }

      // Handle popup
      if (isHovered) {
        marker.openPopup();
        // Pan to the hovered marker
        const lat = marker.getLatLng().lat;
        const lng = marker.getLatLng().lng;
        const zoom = map.getZoom();

        if (
          typeof lat === 'number' && !isNaN(lat) &&
          typeof lng === 'number' && !isNaN(lng) &&
          typeof zoom === 'number' && !isNaN(zoom)
        ) {
          try {
            // Ensure map has size before flying to avoid NaN errors
            const size = map.getSize();
            if (size.x > 0 && size.y > 0) {
              map.flyTo(marker.getLatLng(), zoom, {
                animate: true,
                duration: 0.8
              });
            }
          } catch (error) {
            console.warn('Error flying to location:', error);
          }
        }
      } else {
        marker.closePopup();
      }
    });
  }, [hoveredListingId, map, markers]);

  return (
    <div className={`
      bg-white rounded-lg shadow-lg overflow-hidden
      ${isPIP ? 'fixed bottom-4 right-4 w-80 h-64 z-50 border-2 border-blue-500' : 'sticky top-24'}
      transition-all duration-300
    `}>
      <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className={`font-semibold ${isPIP ? 'text-sm' : 'text-lg'}`}>Business Locations</h3>
            <p className={`opacity-90 ${isPIP ? 'text-xs' : 'text-sm'}`}>Hover over listings to highlight</p>
          </div>
          {isPIP && (
            <button
              onClick={() => setIsPIP(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded p-1 transition-colors"
              title="Dismiss map"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className={`relative bg-gray-100 ${isPIP ? 'h-48' : 'h-96'}`}>
        {!isLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading map...</p>
            </div>
          </div>
        ) : (
          <div ref={mapRef} className="w-full h-full" />
        )}

        {/* Map Legend */}
        <div className={`absolute bg-white bg-opacity-90 rounded-lg p-2 text-xs shadow-md pointer-events-none ${isPIP ? 'bottom-2 left-2' : 'bottom-4 left-4'
          }`}>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full border border-gray-500"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full border border-blue-700"></div>
            <span>Hovered</span>
          </div>
        </div>

        {/* PIP Toggle Button (for desktop) */}
        {!isPIP && (
          <button
            onClick={() => setIsPIP(true)}
            className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors shadow-lg"
            title="Picture-in-Picture mode"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 0h4m-4 0l-4 4" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default BusinessMap;
