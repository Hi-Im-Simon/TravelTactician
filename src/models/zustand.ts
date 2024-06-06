import { LoadingInfo } from "../models/common";

export interface LocationStore {
  locationPermission?: boolean;
  setLocationPermission: (permission: boolean) => void;
}

export interface MapStore {
  showMap: boolean;
  toggleMap: (show?: boolean) => void;
}

export interface LoadingStore {
  info: LoadingInfo;
  setInfo: (info: LoadingInfo) => void;
}
