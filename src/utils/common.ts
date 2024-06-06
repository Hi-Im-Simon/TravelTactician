import { DateTime } from "luxon";

import { WeatherData } from "../models/openmeteo";

export const isDay = (weather: WeatherData, selectedDay: number, selectedHour: number): boolean => {
  const sunrise = DateTime.fromISO(weather.daily.sunrise[selectedDay]);
  const sunset = DateTime.fromISO(weather.daily.sunset[selectedDay]);
  const curTime = DateTime.fromISO(weather.hourly.time[selectedHour]);

  return curTime >= sunrise && sunset >= curTime;
};
