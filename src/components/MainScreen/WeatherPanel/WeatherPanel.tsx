import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, ImageBackground } from "react-native";

import { WeatherData } from "../../../models/openmeteo";
import dateToUserTimeZone from "../../../utils/dateToUserTimeZone";
import { LocationCoords } from "../../../models/common";
import { getTimeFromNow } from "../../../utils/getTimeFromNow";
import { getImageOfWeather } from "../../../utils/getImageOfWeather";

interface Props {
  selectedHour: number;
  location: LocationCoords;
  weather: WeatherData | undefined;
  fetchWeather: () => Promise<void>;
}

const WeatherPanel = ({ selectedHour, location, weather, fetchWeather }: Props) => {
  const [selectedDay, setSelectedDay] = useState<number>(0);

  useEffect(() => {
    setSelectedDay(Math.floor(selectedHour / 24));
  }, [selectedHour]);

  useEffect(() => {
    fetchWeather();
  }, [location]);

  return (
    <View style={styles.container}>
      {weather ? (
        <ImageBackground
          style={styles.image}
          source={getImageOfWeather(weather, selectedDay, selectedHour)}
        >
          <View style={styles.containerLeft}>
            {/* display currently selected weather data */}
            <View style={styles.dataPairs}>
              {/* apparent_temperature */}
              <Text style={[styles.dataLeftText, styles.text]}>Feels like</Text>
              <Text style={[styles.dataRightText, styles.text]}>
                {weather.hourly.apparent_temperature[selectedHour]}
                {weather.hourly_units.apparent_temperature}
              </Text>
            </View>
            <View style={styles.dataPairs}>
              {/* temperature_2m */}
              <Text style={[styles.dataLeftText, styles.text]}>Actual</Text>
              <Text style={[styles.dataRightText, styles.text]}>
                {weather.hourly.temperature_2m[selectedHour]}
                {weather.hourly_units.temperature_2m}
              </Text>
            </View>
            <View style={styles.dataPairs}>
              {/* windspeed_10m */}
              <Text style={[styles.dataLeftText, styles.text]}>Wind</Text>
              <Text style={[styles.dataRightText, styles.text]}>
                {weather.hourly.windspeed_10m[selectedHour]}
                {weather.hourly_units.windspeed_10m}
              </Text>
            </View>
            {weather.hourly.precipitation_probability[selectedHour] !== null && (
              <View style={styles.dataPairs}>
                {/* precipitation_probability */}
                <Text style={[styles.dataLeftText, styles.text]}>Precipitation</Text>
                <Text style={[styles.dataRightText, styles.text]}>
                  {weather.hourly.precipitation_probability[selectedHour]}
                  {weather.hourly_units.precipitation_probability}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.containerCenter}>
            {/* display currently selected date */}
            <Text style={[styles.text, styles.dayNameText]}>
              {dateToUserTimeZone(weather.hourly.time[selectedHour]).toFormat("EEEE")}
            </Text>
            <Text style={[styles.text, styles.hourText]}>
              {dateToUserTimeZone(weather.hourly.time[selectedHour]).toFormat("hh:mm a")}
            </Text>
            <Text style={[styles.text, styles.dateText]}>
              {dateToUserTimeZone(weather.hourly.time[selectedHour]).toFormat("dd MMM yyyy")}
            </Text>
          </View>

          <View style={styles.containerRight}>
            {/* display time difference from now */}
            <View style={styles.dataPairs}>
              <Text style={[styles.dataLeftText, styles.text]}>Due</Text>
              <Text style={[styles.dataRightText, styles.text]}>
                {getTimeFromNow(weather, selectedHour)}
              </Text>
            </View>

            {/* space filler */}
            {/* <View style={styles.dataPairs}></View> */}

            {/* display currently selected weather sunset, sunrise... */}
            <View style={styles.dataPairs}>
              {/* sunrise */}
              <Text style={[styles.dataLeftText, styles.text]}>Sunrise</Text>

              <Text style={[styles.dataRightText, styles.text]}>
                {dateToUserTimeZone(weather.daily.sunrise[selectedDay]).toFormat("hh:mm a") !==
                "Invalid DateTime"
                  ? dateToUserTimeZone(weather.daily.sunrise[selectedDay]).toFormat("hh:mm a")
                  : "Not available"}
              </Text>
            </View>

            <View style={styles.dataPairs}>
              {/* sunset */}
              <Text style={[styles.dataLeftText, styles.text]}>Sunset</Text>

              <Text style={[styles.dataRightText, styles.text]}>
                {dateToUserTimeZone(weather.daily.sunset[selectedDay]).toFormat("hh:mm a") !==
                "Invalid DateTime"
                  ? dateToUserTimeZone(weather.daily.sunset[selectedDay]).toFormat("hh:mm a")
                  : "Not available"}
              </Text>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <Pressable style={styles.error} onPress={fetchWeather}>
          <Text>Loading your weather details.</Text>
          <Text>Tap here to retry.</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  error: {
    flex: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // basic tags
  text: {
    alignSelf: "stretch",
    textShadowRadius: 15,
    textShadowColor: "#000",
    color: "#fff",
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

export default WeatherPanel;
