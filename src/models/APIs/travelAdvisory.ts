export interface TravelAdvisoryResult {
  api_status: {
    reply: {
      code: number;
      status: string;
    };
  };
  data: { [key: string]: TravelAdvisoryCountryData };
}

export interface TravelAdvisoryCountryData {
  iso_alpha2: string;
  name: string;
  continent: string;
  advisory: TravelAdvisoryAdvisory;
}

export interface TravelAdvisoryAdvisory {
  score: number;
  sources_active: number;
  message: string;
  updated: string;
  source: string;
}
