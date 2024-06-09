import { WeatherData } from "./APIs/openmeteo";

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string[];
  weather: WeatherData;
}
