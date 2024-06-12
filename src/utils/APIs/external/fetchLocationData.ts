import { LocationCoords } from "../../../models/APIs/deviceLocation";
import { LocationData } from "../../../models/locationData";
import getLocationAddress from "./getLocationAddress";
import getRiskLevel from "./getRiskLevel";
import getWeather from "./getWeather";

const fetchLocationData = (location: LocationCoords) => {
  return new Promise<LocationData>((resolve, reject) => {
    // first get location names
    getLocationAddress(location)
      .then((address) => {
        // then get other data
        Promise.all([
          getWeather(location),
          address.countryCode ? getRiskLevel(address.countryCode) : undefined,
        ])
          .then((out) => {
            resolve({
              latitude: location.latitude,
              longitude: location.longitude,
              countryCode: address.countryCode,
              country: out[1]?.name ?? address.country,
              locality: address.locality,
              weather: out[0],
              advisory: out[1]?.advisory,
            });
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

export default fetchLocationData;
