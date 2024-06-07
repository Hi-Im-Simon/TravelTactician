import { LocationCoords } from "../../../models/APIs/location";
import { LocationData } from "../../../models/locationData";
import getWeather from "./getWeather";

const fetchLocationData = (location: LocationCoords) => {
  return new Promise<LocationData>((resolve) => {
    Promise.all([getWeather(location)]).then((out) => {
      resolve({
        latitude: location.latitude,
        longitude: location.longitude,
        name: "test",
        weather: out[0],
      });
    });
  });
};

export default fetchLocationData;
