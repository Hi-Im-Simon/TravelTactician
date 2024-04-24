import { create } from "zustand";

import { LocationStore, MapStore } from "../models/zustand";

export const useLocationStore = create<LocationStore>((set) => ({
  locationPermission: undefined,
  setLocationPermission: (locationPermission: boolean) => set({ locationPermission }),
}));

export const useMapStore = create<MapStore>((set, get) => ({
  showMap: false,
  toggleMap: (show?: boolean) => set({ showMap: show || !get().showMap }),
}));
