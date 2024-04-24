import { DateTime } from "luxon";

import { WeatherData } from "../models/openmeteo";
import { backgrounds } from "../../assets/weather-backgrounds/backgrounds";

export const getImageOfWeather = (
  weather: WeatherData,
  selectedDay: number,
  selectedHour: number
) => {
  const sunrise = DateTime.fromISO(weather.daily.sunrise[selectedDay]);
  const sunset = DateTime.fromISO(weather.daily.sunset[selectedDay]);
  const curTime = DateTime.fromISO(weather.hourly.time[selectedHour]);

  const timeOfDay: string = curTime >= sunrise && sunset >= curTime ? "day" : "night";

  let weatherCode: number = weather.hourly.weathercode[selectedHour];

  // clear sky
  if ([0].includes(weatherCode)) {
    weatherCode = 0;
  }
  // mainly clear, partly cloudy, and overcast
  else if ([1, 2, 3].includes(weatherCode)) {
    // seperate pics, keep weatherCode
  }
  // fog
  else if ([45, 48].includes(weatherCode)) {
    weatherCode = 45;
  }
  // rain - small to mid
  else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67].includes(weatherCode)) {
    weatherCode = 51;
  }
  // snow fall
  else if ([71, 73, 75].includes(weatherCode)) {
    weatherCode = 71;
  }
  // snow grains
  else if ([77].includes(weatherCode)) {
    weatherCode = 77;
  }
  // rain shower
  else if ([80, 81, 82].includes(weatherCode)) {
    weatherCode = 80;
  }
  // snow shower
  else if ([85, 86].includes(weatherCode)) {
    weatherCode = 85;
  }
  // thunderstorm
  else if ([95, 96, 99].includes(weatherCode)) {
    weatherCode = 95;
  }

  return backgrounds[`${timeOfDay}_${weatherCode}`];
};
