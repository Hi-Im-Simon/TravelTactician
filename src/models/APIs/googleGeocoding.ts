export interface GeolocationResult {
  address_components: GeolocationAddressComponent[];
  formatted_address: string;
  geometry: {
    bounds: {
      northeast: Geocoder.LatLng;
      southwest: Geocoder.LatLng;
    };
    location: Geocoder.LatLng;
    location_type: string;
    viewport: {
      [key: string]: Object;
    };
  };
  place_id: string;
  types: string[];
  plus_code: Geocoder.PlusCode;
}
[];

export interface GeolocationAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
