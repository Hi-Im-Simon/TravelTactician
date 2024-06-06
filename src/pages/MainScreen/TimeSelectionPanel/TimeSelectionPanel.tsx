import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

import { WeatherData } from "../../../models/openmeteo";
import TimeSelectionCell from "./TimeSelectionCell";
import { Divider } from "react-native-paper";
import LengthSelection from "./LengthSelection";

interface Props {
  weather: WeatherData;
  selectedHour: number;
  setSelectedHour: Dispatch<SetStateAction<number>>;
  selectedLength: number;
  setSelectedLength: Dispatch<SetStateAction<number>>;
}

const TimeSelection = ({
  weather,
  selectedHour,
  setSelectedHour,
  selectedLength,
  setSelectedLength,
}: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToCell = (i: number, animatedScroll: boolean = true) => {
    scrollViewRef.current?.scrollTo({
      x: i * styles.cell.width,
      animated: animatedScroll,
    });
    setSelectedHour(i);
  };

  useEffect(() => {
    const currentHourGMT = new Date(weather.current_weather.time).getHours();
    // timeout to prevent scrollToCell from being called before the component is rendered
    setTimeout(() => scrollToCell(currentHourGMT, false), 0);
  }, []);

  return (
    <View>
      <MaskedView
        style={styles.container}
        maskElement={
          <LinearGradient
            style={styles.gradient}
            colors={["transparent", "white", "transparent"]}
            locations={[0, 0.5, 1]}
            start={{ x: -0.3, y: 0 }}
            end={{ x: 1.3, y: 0 }}
          />
        }
      >
        <ScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          snapToOffsets={[...Array(weather.hourly.time.length)].map(
            (_, i) => i * styles.cell.width
          )}
          snapToAlignment="start"
          contentContainerStyle={{
            paddingHorizontal: useWindowDimensions().width / 2 - styles.cell.width / 2,
          }}
          onMomentumScrollEnd={
            // when scrolling stops, calculated which element will be displayed
            (e) => setSelectedHour(Math.round(e.nativeEvent.contentOffset.x / styles.cell.width))
          }
          horizontal
          pagingEnabled
        >
          {weather.hourly.time.map((_, i) => {
            if (
              weather.hourly.temperature_2m[i] !== null &&
              weather.hourly.weathercode[i] !== null
            ) {
              return (
                <TimeSelectionCell
                  key={i}
                  cellId={i}
                  scrollToCell={scrollToCell}
                  isCurrentCell={selectedHour == i}
                  time={weather.hourly.time[i]}
                  temperature={weather.hourly.temperature_2m[i]}
                  apparentTemperature={weather.hourly.apparent_temperature[i]}
                  temperatureUnits={weather.hourly_units.temperature_2m}
                  windspeedUnits={weather.hourly_units.windspeed_10m}
                  cellWidth={styles.cell.width}
                />
              );
            }
          })}
        </ScrollView>
      </MaskedView>

      <Divider bold />

      <LengthSelection
        weather={weather}
        selectedHour={selectedHour}
        selectedLength={selectedLength}
        setSelectedLength={setSelectedLength}
      />

      <Divider bold />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    paddingVertical: 10,
  },

  gradient: {
    flexDirection: "row",
    height: "100%",
    paddingVertical: 40,
  },
  cell: {
    width: 90,
  },
});

export default TimeSelection;
