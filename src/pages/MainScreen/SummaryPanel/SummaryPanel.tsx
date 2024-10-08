import { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";

import { dateToUserTimeZone } from "../../../utils/timezone";
import { getTimeFromNow } from "../../../utils/timezone";
import { getImageOfWeather } from "../../../utils/APIs/local/getImageOfWeather";
import { LocationData } from "../../../models/locationData";

interface Props {
  locationData: LocationData;
  selectedHour: number;
}

const SummaryPanel = ({ locationData, selectedHour }: Props) => {
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const locationName = [locationData.locality, locationData.country].filter(Boolean).join(", ");

  useEffect(() => {
    setSelectedDay(Math.floor(selectedHour / 24));
  }, [selectedHour]);

  return (
    <ImageBackground
      style={styles.container}
      source={getImageOfWeather(locationData.weather, selectedDay, selectedHour)}
    >
      <View style={styles.containerLeft}>
        {/* display currently selected weather data */}
        <View style={styles.dataPairs}>
          {/* apparent_temperature */}
          <Text style={[styles.dataLeftText, styles.text]}>Feels like</Text>
          <Text style={[styles.dataRightText, styles.text]}>
            {locationData.weather.hourly.apparent_temperature[selectedHour]}
            {locationData.weather.hourly_units.apparent_temperature}
          </Text>
        </View>
        <View style={styles.dataPairs}>
          {/* temperature_2m */}
          <Text style={[styles.dataLeftText, styles.text]}>Actual</Text>
          <Text style={[styles.dataRightText, styles.text]}>
            {locationData.weather.hourly.temperature_2m[selectedHour]}
            {locationData.weather.hourly_units.temperature_2m}
          </Text>
        </View>
        <View style={styles.dataPairs}>
          {/* windspeed_10m */}
          <Text style={[styles.dataLeftText, styles.text]}>Wind</Text>
          <Text style={[styles.dataRightText, styles.text]}>
            {locationData.weather.hourly.windspeed_10m[selectedHour]}
            {locationData.weather.hourly_units.windspeed_10m}
          </Text>
        </View>
        {locationData.weather.hourly.precipitation_probability[selectedHour] !== null && (
          <View style={styles.dataPairs}>
            {/* precipitation_probability */}
            <Text style={[styles.dataLeftText, styles.text]}>Precipitation</Text>
            <Text style={[styles.dataRightText, styles.text]}>
              {locationData.weather.hourly.precipitation_probability[selectedHour]}
              {locationData.weather.hourly_units.precipitation_probability}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.containerCenter}>
        {/* display currently selected date */}
        <Text style={[styles.addressText, styles.text]}>
          {locationName !== "" ? locationName : "Unknown location"}
        </Text>
        <Text style={[styles.dayNameText, styles.text]}>
          {dateToUserTimeZone(locationData.weather.hourly.time[selectedHour])?.toFormat("EEEE")}
        </Text>
        <Text style={[styles.hourText, styles.text]}>
          {dateToUserTimeZone(locationData.weather.hourly.time[selectedHour])?.toFormat("hh:mm a")}
        </Text>
        <Text style={[styles.dateText, styles.text]}>
          {dateToUserTimeZone(locationData.weather.hourly.time[selectedHour])?.toFormat(
            "dd MMM yyyy"
          )}
        </Text>
      </View>

      <View style={styles.containerRight}>
        {/* display time difference from now */}
        <View style={styles.dataPairs}>
          <Text style={[styles.dataLeftText, styles.text]}>Due</Text>
          <Text style={[styles.dataRightText, styles.text]}>
            {getTimeFromNow(locationData.weather, selectedHour)}
          </Text>
        </View>

        {/* display currently selected weather sunset, sunrise... */}
        <View style={styles.dataPairs}>
          {/* sunrise */}
          <Text style={[styles.dataLeftText, styles.text]}>Sunrise</Text>

          <Text style={[styles.dataRightText, styles.text]}>
            {dateToUserTimeZone(locationData.weather.daily.sunrise[selectedDay])?.toFormat(
              "hh:mm a"
            ) ?? "Not available"}
          </Text>
        </View>

        <View style={styles.dataPairs}>
          {/* sunset */}
          <Text style={[styles.dataLeftText, styles.text]}>Sunset</Text>

          <Text style={[styles.dataRightText, styles.text]}>
            {dateToUserTimeZone(locationData.weather.daily.sunset[selectedDay])?.toFormat(
              "hh:mm a"
            ) ?? "Not available"}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 240,
    flexDirection: "row",
  },

  // basic tags
  text: {
    alignSelf: "stretch",
    textShadowRadius: 3,
    color: "#fff",
    textShadowColor: "#000",
  },

  // data pairs
  dataPairs: {
    flex: 1,
    justifyContent: "center",
  },
  dataLeftText: {
    fontStyle: "italic",
    textAlign: "center",
  },
  dataRightText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  // left side
  containerLeft: {
    flex: 1,
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
  },

  // center
  containerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addressText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  dayNameText: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  hourText: {
    fontSize: 16,
    textAlign: "center",
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  // right side
  containerRight: {
    flex: 1,
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
  },
});

export default SummaryPanel;
