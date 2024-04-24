import { getCurrentPositionAsync } from "expo-location";
import { LocationCoords } from "../models/common";

export const getLocation = async (): Promise<LocationCoords> => {
  return new Promise((resolve, reject) => {
    getCurrentPositionAsync().then((loc) => {
      if (loc !== null) {
        resolve(loc.coords);
      } else {
        setTimeout(() => {
          getLocation().then(resolve).catch(reject);
        }, 500);
      }
    });
  });
};
