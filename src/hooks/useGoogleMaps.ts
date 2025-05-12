"use client";

import { useState, useEffect } from "react";

// Use environment variable for API key
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY";

// Global variable to track if the script has been loaded
let isScriptLoaded = false;
let scriptLoadPromise: Promise<void> | null = null;

export function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If the script is already loaded, just set the state
    if (isScriptLoaded) {
      setIsLoaded(true);
      return;
    }

    // If the script is currently loading, wait for it
    if (scriptLoadPromise) {
      scriptLoadPromise
        .then(() => setIsLoaded(true))
        .catch((err) => setError(err));
      return;
    }

    // Create a new promise to load the script
    scriptLoadPromise = new Promise<void>((resolve, reject) => {
      // Check if the script is already in the document
      if (document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
        isScriptLoaded = true;
        resolve();
        return;
      }

      // Create and append the script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        isScriptLoaded = true;
        resolve();
      };
      
      script.onerror = () => {
        const error = new Error("Failed to load Google Maps API");
        reject(error);
      };
      
      document.head.appendChild(script);
    });

    // Handle the promise
    scriptLoadPromise
      .then(() => setIsLoaded(true))
      .catch((err) => setError(err));

    // Cleanup function
    return () => {
      // We don't remove the script on cleanup to avoid reloading it
      // when components unmount and remount
    };
  }, []);

  return { isLoaded, error };
}