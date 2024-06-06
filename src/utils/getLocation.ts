import { getCurrentPositionAsync } from "expo-location";
import { LocationCoords } from "../models/common";

export const getLocation = async (): Promise<LocationCoords | null> => {
  return new Promise((resolve, reject) => {
    getCurrentPositionAsync()
      .then((loc) => {
        if (loc !== null) {
          resolve({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        } else {
          reject();
        }
      })
      .catch(() => resolve(null));
  });
};
