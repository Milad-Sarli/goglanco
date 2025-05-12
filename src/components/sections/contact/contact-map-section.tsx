"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";

gsap.registerPlugin(ScrollTrigger);

// Map location configuration
const MAP_LOCATION = {
  lat: 40.7128,
  lng: -74.0060,
  zoom: 15
};

export function ContactMapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  // Use our custom hook to load Google Maps
  const { isLoaded, error } = useGoogleMaps();

  // Initialize map when script is loaded
  useEffect(() => {
    if (isLoaded && mapContainerRef.current && !map) {
      const mapOptions: google.maps.MapOptions = {
        center: { lat: MAP_LOCATION.lat, lng: MAP_LOCATION.lng },
        zoom: MAP_LOCATION.zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: resolvedTheme === "dark" ? darkMapStyle : [],
      };

      const newMap = new google.maps.Map(mapContainerRef.current, mapOptions);
      setMap(newMap);

      // Add marker
      const newMarker = new google.maps.Marker({
        position: { lat: MAP_LOCATION.lat, lng: MAP_LOCATION.lng },
        map: newMap,
        title: "Goglanco Rug Restoration",
        animation: google.maps.Animation.DROP,
      });
      setMarker(newMarker);

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0; font-weight: bold;">Goglanco Rug Restoration</h3>
            <p style="margin: 0;">123 Rug Restoration Lane, Textile District, NY 10001</p>
          </div>
        `,
      });

      newMarker.addListener("click", () => {
        infoWindow.open(newMap, newMarker);
      });
    }
  }, [isLoaded, map, resolvedTheme]);

  // Update map style when theme changes
  useEffect(() => {
    if (map) {
      map.setOptions({
        styles: resolvedTheme === "dark" ? darkMapStyle : [],
      });
    }
  }, [resolvedTheme, map]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        headingRef.current,
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate map container
      gsap.fromTo(
        mapContainerRef.current,
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: mapContainerRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Find Us on the <span className="text-primary">Map</span>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
              <p>Failed to load Google Maps. Please try again later.</p>
            </div>
          )}
          
          <div 
            ref={mapContainerRef}
            className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg"
          >
            {!isLoaded && (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <p className="text-muted-foreground">Loading map...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Dark mode map style
const darkMapStyle: google.maps.MapTypeStyle[] = [
  {
    elementType: "geometry",
    stylers: [{ color: "#242f3e" }]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#242f3e" }]
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#746855" }]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }]
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }]
  }
]; 