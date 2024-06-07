import { LocationCoords } from "../../../models/APIs/location";
import { WeatherData } from "../../../models/APIs/openmeteo";

const getWeather = (location: LocationCoords) => {
  return new Promise<WeatherData>((resolve, reject) => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?
    latitude=${location.latitude}&
    longitude=${location.longitude}&
    timezone=GMT&
    current_weather=true&
    hourly=temperature_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&
    daily=sunrise,sunset&
    forecast_days=16
  `.replace(/\s/g, "") // remove spaces
    )
      .then((res) => {
        if (!res.ok) {
          reject();
        }
        return res.json();
      })
      .then((json: WeatherData) => {
        if (!json.current_weather) {
          reject();
        }
        resolve(json);
      })
      .catch(reject);
  });
};

export default getWeather;
