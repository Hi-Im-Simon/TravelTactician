import { WeatherData } from "./APIs/openmeteo";
import { TravelAdvisoryAdvisory } from "./APIs/travelAdvisory";

export interface LocationData {
  latitude: number;
  longitude: number;
  countryCode?: string;
  country?: string;
  locality?: string;
  weather: WeatherData;
  advisory?: TravelAdvisoryAdvisory;
}
