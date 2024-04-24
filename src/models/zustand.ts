export interface LocationStore {
  locationPermission?: boolean;
  setLocationPermission: (permission: boolean) => void;
}

export interface MapStore {
  showMap: boolean;
  toggleMap: (show?: boolean) => void;
}
