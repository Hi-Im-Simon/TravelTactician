import { LocationCoords } from "../../../models/APIs/deviceLocation";
import { LocationData } from "../../../models/locationData";
import getLocationAddress from "./getLocationAddress";
import getWeather from "./getWeather";

const fetchLocationData = (location: LocationCoords) => {
  return new Promise<LocationData>((resolve, reject) => {
    Promise.all([getLocationAddress(location), getWeather(location)])
      .then((out) => {
        resolve({
          latitude: location.latitude,
          longitude: location.longitude,
          address: out[0],
          weather: out[1],
        });
      })
      .catch(reject);
  });
};

export default fetchLocationData;
