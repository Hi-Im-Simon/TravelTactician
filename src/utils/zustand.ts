import { create } from "zustand";

import { LoadingStore, LocationStore, MapStore } from "../models/zustand";
import { LoadingInfo } from "../models/common";

export const useLocationStore = create<LocationStore>((set) => ({
  locationPermission: undefined,
  setLocationPermission: (locationPermission: boolean) => set({ locationPermission }),
}));

export const useMapStore = create<MapStore>((set, get) => ({
  showMap: false,
  toggleMap: (show?: boolean) => set({ showMap: show || !get().showMap }),
}));

export const useLoadingStore = create<LoadingStore>((set, get) => ({
  info: { loading: false },
  setInfo: (info: LoadingInfo) => set({ info }),
}));
