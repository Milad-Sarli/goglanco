declare namespace google.maps {
  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
    fullscreenControl?: boolean;
    zoomControl?: boolean;
    styles?: MapTypeStyle[];
  }

  interface LatLng {
    lat(): number;
    lng(): number;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapTypeStyle {
    elementType?: string;
    featureType?: string;
    stylers: MapTypeStyler[];
  }

  interface MapTypeStyler {
    color?: string;
    lightness?: number;
    saturation?: number;
    visibility?: string;
    weight?: number;
  }

  class Map {
    constructor(element: HTMLElement, options?: MapOptions);
    setOptions(options: Partial<MapOptions>): void;
  }

  class Marker {
    constructor(options: MarkerOptions);
    addListener(eventName: string, handler: (event: google.maps.MapMouseEvent) => void): void;
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    animation?: Animation;
  }

  enum Animation {
    BOUNCE,
    DROP
  }

  class InfoWindow {
    constructor(options: InfoWindowOptions);
    open(map: Map, marker: Marker): void;
  }

  interface InfoWindowOptions {
    content?: string | HTMLElement;
  }
} 