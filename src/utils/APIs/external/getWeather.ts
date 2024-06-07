import { LocationCoords } from "../../../models/locationData";
import { WeatherData } from "../../../models/openmeteo";

export const getWeather = async (location: LocationCoords): Promise<WeatherData | undefined> => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?
    latitude=${location.latitude}&
    longitude=${location.longitude}&
    timezone=GMT&
    current_weather=true&
    hourly=temperature_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m&
    daily=sunrise,sunset&
    forecast_days=16
  `.replace(/\s/g, "") // remove spaces
  );

  if (res.ok) {
    return await res.json();
  }
};
