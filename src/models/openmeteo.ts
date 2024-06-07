export interface WeatherData {
  current_weather: {
    interval: number;
    is_day: number;
    temperature: number;
    time: string;
    weathercode: number;
    winddirection: number;
    windspeed: number;
  };
  current_weather_units: {
    interval: string;
    is_day: string;
    temperature: string;
    time: string;
    weathercode: string;
    winddirection: string;
    windspeed: string;
  };
  daily: {
    sunrise: string[];
    sunset: string[];
    time: string[];
  };
  daily_units: {
    sunrise: string;
    sunset: string;
    time: string;
  };
  elevation: number;
  generationtime_ms: number;
  hourly: {
    apparent_temperature: (number | undefined)[];
    precipitation_probability: (number | null)[];
    temperature_2m: (number | undefined)[];
    time: string[];
    weathercode: (number | undefined)[];
    windspeed_10m: (number | undefined)[];
  };
  hourly_units: {
    apparent_temperature: string;
    precipitation_probability: string;
    temperature_2m: string;
    time: string;
    weathercode: string;
    windspeed_10m: string;
  };
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}
