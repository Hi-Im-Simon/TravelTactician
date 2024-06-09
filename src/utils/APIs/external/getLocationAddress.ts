import Geocoder from "react-native-geocoding";

import { LocationCoords } from "../../../models/APIs/deviceLocation";
import { GeolocationAddressComponent } from "../../../models/APIs/googleGeocoding";

Geocoder.init("AIzaSyCf5k040WYoLKkr5vjJeHV_Gc8zCnjHndo", { language: "en" });

const getLocationAddress = async (
  location: LocationCoords,
  addressType: "long" | "short" = "short"
) => {
  return new Promise<string[]>((resolve, reject) => {
    Geocoder.from(location.latitude, location.longitude)
      .then((json) => {
        if (json.status !== "OK") {
          reject();
          return;
        }

        const getAddress = addressType === "short" ? getShortAddress : getLongAddress;

        for (const result of json.results) {
          const addressParts = getAddress(result.address_components);
          if (addressParts.length) {
            resolve(addressParts);
            return;
          }
        }
        resolve(["Unnamed location"]);
      })
      .catch(reject);
  });
};

const getShortAddress = (data: GeolocationAddressComponent[]): string[] => {
  const addressParts = [
    data.find((x) => x.types.includes("locality"))?.short_name ||
      data.find((x) => x.types.includes("administrative_area_level_2"))?.long_name ||
      data.find((x) => x.types.includes("administrative_area_level_1"))?.long_name, // city/village or administrative area if not found
    data.find((x) => x.types.includes("country"))?.long_name, // country
  ];
  return addressParts.filter(Boolean) as string[];
};

const getLongAddress = (data: GeolocationAddressComponent[]): string[] => {
  const addressParts = [
    data.find((x) => x.types.includes("locality"))?.long_name ||
      data.find((x) => x.types.includes("administrative_area_level_2"))?.long_name ||
      data.find((x) => x.types.includes("administrative_area_level_1"))?.long_name, // city/village or administrative area if not found
    data.find((x) => x.types.includes("postal_code"))?.long_name, // postal code
    data.find((x) => x.types.includes("country"))?.long_name, // country
  ];
  return addressParts.filter(Boolean) as string[];
};

export default getLocationAddress;
