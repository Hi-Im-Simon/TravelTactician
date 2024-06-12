import {
  TravelAdvisoryCountryData,
  TravelAdvisoryResult,
} from "../../../models/APIs/travelAdvisory";

export default (countryCode: string) => {
  return new Promise<TravelAdvisoryCountryData>((resolve, reject) => {
    fetch(`https://www.travel-advisory.info/api?countrycode=${countryCode}`)
      .then((res) => {
        if (!res.ok) {
          reject();
          return;
        }
        return res.json();
      })
      .then((json: TravelAdvisoryResult) => {
        if (json.api_status.reply.code !== 200) {
          reject();
        }
        resolve(json.data[countryCode]);
      })
      .catch(reject);
  });
};
