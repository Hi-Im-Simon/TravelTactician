import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Fontisto,
  Octicons,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { dateToUserTimeZone } from "../../../utils/timezone";
import { Results } from "../../../models/common";
import { LocationData } from "../../../models/locationData";

interface Props {
  locationData: LocationData;
  selectedHour: number;
  selectedLength: number;
}

const ResultsPanel = ({ locationData, selectedHour, selectedLength }: Props) => {
  const [results, setResults] = useState<Results>();

  useEffect(() => {
    // gather data about the time period
    const weatherCodesDay = new Set<number>();
    const weatherCodesNight = new Set<number>();
    let minTempDay = Infinity;
    let minTempNight = Infinity;
    let maxTempDay = -Infinity;
    let maxTempNight = -Infinity;
    let maxWindDay = 0;
    let maxWindNight = 0;

    let nDayHours = 0;
    let nNightHours = 0;
    let sumTempDay = 0;
    let sumTempNight = 0;

    for (let i: number = selectedHour; i < selectedHour + selectedLength; i++) {
      // iterate over all elements that are supposed to be counted
      const hour = dateToUserTimeZone(locationData.weather.hourly.time[i])?.get("hour");

      if (hour !== undefined && 8 < hour && hour <= 18) {
        const code = locationData.weather.hourly.weathercode[i];
        const temp = locationData.weather.hourly.temperature_2m[i];
        const wind = locationData.weather.hourly.windspeed_10m[i];
        if (code !== undefined && temp !== undefined && wind !== undefined) {
          nDayHours++;
          weatherCodesDay.add(code);
          sumTempDay += temp;
          minTempDay = Math.min(minTempDay, temp);
          maxTempDay = Math.max(maxTempDay, temp);
          maxWindDay = Math.max(maxWindDay, wind);
        }
      } else {
        const code = locationData.weather.hourly.weathercode[i];
        const temp = locationData.weather.hourly.temperature_2m[i];
        const wind = locationData.weather.hourly.windspeed_10m[i];
        if (code !== undefined && temp !== undefined && wind !== undefined) {
          nNightHours++;
          weatherCodesNight.add(code);
          sumTempNight += temp;
          minTempNight = Math.min(minTempNight, temp);
          maxTempNight = Math.max(maxTempNight, temp);
          maxWindNight = Math.max(maxWindNight, wind);
        }
      }
    }

    const avgTempDay = Math.floor((sumTempDay / nDayHours) * 10) / 10;
    const avgTempNight = Math.floor((sumTempNight / nNightHours) * 10) / 10;

    const hasDays = weatherCodesDay.size > 0;
    const hasNights = weatherCodesNight.size > 0;

    // basic
    const basicInfo: JSX.Element[] = [];
    if (hasDays) {
      basicInfo.push(<Text style={styles.basicInfoTextTitle}>Day temperatures</Text>);
      basicInfo.push(
        <View style={styles.basicInfoRow}>
          <Text style={[styles.basicInfoRowText]}>Min: {minTempDay}</Text>
          <Text style={[styles.basicInfoRowText]}>Avg: {avgTempDay}</Text>
          <Text style={[styles.basicInfoRowText]}>Max: {maxTempDay}</Text>
        </View>
      );
    }
    if (hasNights) {
      basicInfo.push(<Text style={styles.basicInfoTextTitle}>Night temperatures</Text>);
      basicInfo.push(
        <View style={styles.basicInfoRow}>
          <Text style={[styles.basicInfoRowText]}>Min: {minTempNight}</Text>
          <Text style={[styles.basicInfoRowText]}>Avg: {avgTempNight}</Text>
          <Text style={[styles.basicInfoRowText]}>Max: {maxTempNight}</Text>
        </View>
      );
    }

    // specific
    const specificInfo: JSX.Element[] = [];
    let icon: JSX.Element;

    // WEATHERCODES
    // thunderstorm
    icon = <Ionicons name="thunderstorm-outline" size={18} color="black" />;
    let inDays = weatherCodesDay.has(95);
    let inNights = weatherCodesNight.has(95);
    if (inDays || inNights) {
      const text = "There might be a thunderstorm during your stay. Better stay inside.";
      specificInfo.push(
        <>
          {icon} {text}
        </>
      );
    }
    // rain shower
    icon = <Ionicons name="rainy-outline" size={18} color="black" />;
    inDays = weatherCodesDay.has(80);
    inNights = weatherCodesNight.has(80);
    if (inDays && inNights) {
      const text = "There will be huge rains during some days and nights. Make some indoor plans.";
      specificInfo.push(
        <>
          {icon} {text}
        </>
      );
    } else if (inDays) {
      const text = "Huge rains during daytime. Make some indoor plans or bring a backup umbrella.";
      specificInfo.push(
        <>
          {icon} {text}
        </>
      );
    } else if (inNights) {
      const text = "Huge rains during the nights.";
      specificInfo.push(
        <>
          {icon} {text}
        </>
      );
    } else {
      // normal rain
      inDays = weatherCodesDay.has(51);
      inNights = weatherCodesNight.has(51);
      if (inDays && inNights) {
        const text =
          "It will be raining during some days and nights. Make sure to bring an umbrella.";
        specificInfo.push(
          <>
            {icon} {text}
          </>
        );
      } else if (inDays) {
        const text = "The days might be rainy. An umbrella might come in handy.";
        specificInfo.push(
          <>
            {icon} {text}
          </>
        );
      } else if (inNights) {
        const text = "Rainy nights. It means better sleep, so maybe just stay inside.";
        specificInfo.push(
          <>
            {icon} {text}
          </>
        );
      }
    }
    // snow shower
    icon = <MaterialCommunityIcons name="weather-snowy-heavy" size={18} color="black" />;
    inDays = weatherCodesDay.has(85);
    inNights = weatherCodesNight.has(85);
    if (inDays && inNights) {
      const text = "Expect huge snowfall. It might cause traffic, try not to wander too far alone.";
      specificInfo.push(
        <>
          {icon} {text}
        </>
      );
    } else if (inDays) {
      const text =
        "A lot of snowfall during the days. It might cause traffic, try not to wander too far alone!";
      specificInfo.push(
        <>
          {icon} {text}
        </>
      );
    } else if (inNights) {
      const text = `Huge snowfall during the nights! Don't wander on your own!`;
      specificInfo.push(
        <>
          {icon} {text}
        </>
      );
    } else {
      // snow
      inDays = weatherCodesDay.has(71);
      inNights = weatherCodesNight.has(71);
      if (inDays && inNights) {
        const text = "It will be snowing during some days and nights. Hope you like winter sports!";
        specificInfo.push(
          <>
            {icon} {text}
          </>
        );
      } else if (inDays) {
        const text = "It might be snowing during some of the days.";
        specificInfo.push(
          <>
            {icon} {text}
          </>
        );
      } else if (inNights) {
        const text = "It might be snowing during some nights. Get ready for a white morning.";
        specificInfo.push(
          <>
            {icon} {text}
          </>
        );
      }
    }
    // snow grains
    icon = <MaterialIcons name="grain" size={18} color="black" />;
    inDays = weatherCodesDay.has(77);
    inNights = weatherCodesNight.has(77);
    if (inDays) {
      const text = "There might be snow grain rains! Be careful and seek shelter.";
      specificInfo.push(
        <>
          {icon} {text}
        </>
      );
    } else if (inNights) {
      const text = "There might be snow grain rains during the nights. Better stay inside.";
      specificInfo.push(
        <>
          {icon} {text}
        </>
      );
    }
    // fog
    icon = <Fontisto name="fog" size={18} color="black" />;
    if (hasDays && weatherCodesDay.has(45)) {
      const text = "Some days might be foggy, be careful on the road!";
      specificInfo.push(
        <>
          {icon} {text}
        </>
      );
    }

    // TEMPERATURE - days and nights
    // cold
    icon = <Fontisto name="snowflake" size={18} color="black" />;
    if (hasDays) {
      let text = "";
      if (minTempDay < 5)
        text = `Some of the days will be very cold. Make sure to bring warm clothes!`;
      else if (minTempDay < 15) text = `You might need some warmer clothes for chilly days`;
      if (text)
        specificInfo.push(
          <>
            {icon} {text} (min. {minTempDay}
            {locationData.weather.hourly_units.temperature_2m}).
          </>
        );
    }
    if (hasNights) {
      let text = "";
      if (minTempNight < 5)
        text = `Some of the nights will be very cold. Make sure to bring warm clothes for night adventures!`;
      else if (minTempNight < 15)
        text = `You might need some warmer clothes if you're planning to go outside during the nights`;
      if (text)
        specificInfo.push(
          <>
            {icon} {text} (min. {minTempNight}
            {locationData.weather.hourly_units.temperature_2m}).
          </>
        );
    }
    // warm
    icon = <Octicons name="sun" size={18} color="black" />;
    if (hasDays || hasNights) {
      let text = "";
      if (maxTempDay > 32 || maxTempNight > 32)
        text = `It will be extremely hot. Drink lots of water and apply lotion!`;
      else if (maxTempDay > 25 || maxTempNight > 25)
        text = `It should be warm outside. Enjoy within reasons.`;
      if (text)
        specificInfo.push(
          <>
            {icon} {text} (max. {maxTempDay > 0 ? maxTempDay : maxTempNight}
            {locationData.weather.hourly_units.temperature_2m}).
          </>
        );
    }

    // WIND
    icon = <Feather name="wind" size={18} color="black" />;
    if (hasDays) {
      let text = "";
      if (maxWindDay >= 60) text = `The wind during daytime might be very strong, be careful!`;
      else if (maxWindDay >= 30) text = `There might be some windy days.`;
      if (text)
        specificInfo.push(
          <>
            {icon} {text} (max. {maxWindDay}
            {locationData.weather.hourly_units.windspeed_10m}).
          </>
        );
    }
    if (hasNights) {
      let text = "";
      if (maxWindNight >= 60) text = `Very strong wind during the nights, better stay inside!`;
      else if (maxWindNight >= 30) text = `The nights might be windy.`;
      if (text)
        specificInfo.push(
          <>
            {icon} {text} (max. {maxWindNight}
            {locationData.weather.hourly_units.windspeed_10m}).
          </>
        );
    }

    if (specificInfo.length === 0) {
      const text = "No tips to show. Seems like the weather will be decent. Enjoy!";
      specificInfo.push(<>{text}</>);
    }

    setResults({
      basic: basicInfo,
      specific: specificInfo,
    });
  }, [selectedHour, selectedLength, locationData.weather]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerFix}>
        {results?.basic.map((element, i) => (
          <View key={i}>{element}</View>
        ))}
        {results?.specific.map((element, i) => (
          <Text style={styles.specificInfoText} key={i}>
            {element}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    overflow: "scroll",
  },
  containerFix: {
    padding: 15,
  },
  basicInfoTextTitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    alignItems: "center",
  },
  basicInfoRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  basicInfoRowText: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  specificInfoText: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default ResultsPanel;
