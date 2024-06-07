import { WeatherData } from "./openmeteo";

export interface LocationData {
  latitude: number;
  longitude: number;
  name: unknown;
  weather: WeatherData;
}

export interface LocationCoords {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}
