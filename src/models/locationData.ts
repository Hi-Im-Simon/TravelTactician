import { WeatherData } from "./APIs/openmeteo";

export interface LocationData {
  latitude: number;
  longitude: number;
  name: unknown;
  weather: WeatherData;
}
