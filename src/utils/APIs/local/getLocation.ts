import { getCurrentPositionAsync } from "expo-location";
import { LocationCoords } from "../../../models/APIs/location";

export const getLocation = () => {
  return new Promise<LocationCoords | null>((resolve, reject) => {
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
