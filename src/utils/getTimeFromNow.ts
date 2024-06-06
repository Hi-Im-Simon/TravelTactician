import { DateTime } from "luxon";

import { WeatherData } from "../models/openmeteo";
import dateToUserTimeZone from "./dateToUserTimeZone";

export const getTimeFromNow = (weather: WeatherData, selectedDay: number): string => {
  const thisDate = dateToUserTimeZone(weather.hourly.time[selectedDay]);

  if (!thisDate) return "-";

  const currentDate = DateTime.local();
  const currentDateString = `${currentDate.toFormat("yyyy-MM-dd")}T${currentDate.toFormat(
    "HH:mm"
  )}`;
  const currentDateFixed = dateToUserTimeZone(currentDateString, false);

  if (!currentDateFixed) return "-";

  let daysFromNow = thisDate.diff(currentDateFixed, ["days"]).as("days");
  let hoursFromNow = thisDate.diff(currentDateFixed, ["hours"]).as("hours");
  let minutesFromNow = thisDate.diff(currentDateFixed, ["minutes"]).as("minutes");

  let dd = "";
  let hh = "";
  let mm = "";
  let prefix = "";
  let suffix = "";

  // set prefix and suffix or current - based on difference between chosen and current time
  if (hoursFromNow < -1) suffix = "ago";
  else if (hoursFromNow > 0) prefix = "in ";
  else return "Live data";

  // fix hours and minutes to display correctly if < 0
  // > this is because we want to show the difference
  // > between now and THE END of the chosen hour if it already happened
  // > otherwise it would look weird if an hour has just passed a few seconds ago
  // > and timer shows "1h 1m ago"
  if (hoursFromNow < 0) {
    hoursFromNow += 1;
  }

  // pre/affixes saved, switch to absolute value
  daysFromNow = Math.abs(daysFromNow);
  hoursFromNow = Math.abs(hoursFromNow);
  minutesFromNow = Math.abs(minutesFromNow);

  // get days from now
  if (daysFromNow > 1) dd = `${Math.floor(daysFromNow)}d `;

  // get hours from now
  hoursFromNow %= 24;
  if (hoursFromNow >= 1) hh = `${Math.floor(hoursFromNow)}h `;

  // get minutes from now
  // if time from now is longer than 1 day, skip minutes
  if (daysFromNow < 1) {
    minutesFromNow %= 60;
    if (minutesFromNow >= 1) mm = `${Math.floor(minutesFromNow)}m `;
  }

  return `${prefix}${dd}${hh}${mm}${suffix}`.trim();
};
