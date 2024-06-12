import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Slider from "@react-native-community/slider";

import { WeatherData } from "../../../models/APIs/openmeteo";
import { useMapStore } from "../../../utils/zustand";

const DEFAULT_SLIDER_VALUE = 3;

interface Props {
  weather: WeatherData;
  selectedHour: number;
  selectedLength: number;
  setSelectedLength: Dispatch<SetStateAction<number>>;
}

const LengthSelection = ({ weather, selectedHour, selectedLength, setSelectedLength }: Props) => {
  const { showMap } = useMapStore();
  const [sliderVal, setSliderVal] = useState<{ [name: string]: number | string }>();
  const [periodWarningMsg, setPeriodWarningMsg] = useState<string | false>("");

  const handleSliderValue = (i: number, set: boolean = false) => {
    let top = 0;
    let topTail = "";
    let bottom = 0;
    let bottomTail = "";
    // 1
    if (i == 1) {
      top = 1;
      topTail = "hour";
    }
    // 2 - 12 / step = 1
    else if (i <= 12) {
      top = i;
      topTail = "hours";
    }
    // 14 - 22 / step = 2 (13 - 17)
    else if (i <= 17) {
      top = 12 + (i - 12) * 2;
      topTail = "hours";
    }
    // 24
    else if (i <= 18) {
      top = 1;
      topTail = "day";
    }
    // 28 - 47 / step = 4 (19 - 23)
    else if (i <= 23) {
      top = 1;
      topTail = "day";
      bottom = (i - 18) * 4;
      bottomTail = "hours";
    }
    // 48
    else if (i <= 24) {
      top = 2;
      topTail = "days";
    }
    // 49 - 6.5day / step = 12 (25 - 33)
    else if (i <= 33) {
      top = 2 + Math.floor((i - 24) / 2);
      topTail = "days";
      bottom = ((i - 24) % 2) * 12;
      bottomTail = "hours";
    } else if (i <= 42) {
      top = i - 33 + 6;
      topTail = "days";
    } else {
      top = 16;
      topTail = "days+";
    }

    setSliderVal({
      top: top,
      topTail: topTail,
      bottom: bottom,
      bottomTail: bottomTail,
    });

    if (set) {
      let days = 0;
      let hours = 0;

      if (i <= 17) {
        hours = top;
      } else {
        days = top;
        hours = bottom;
      }

      setSelectedLength(days * 24 + hours);
    }
  };

  useEffect(() => {
    const nCells = weather.hourly.weathercode.filter((code) => code !== null).length;
    if (selectedHour + selectedLength > nCells) {
      if (periodWarningMsg !== false) {
        const nHours = nCells - selectedHour;
        const days = Math.floor(nHours / 24);
        const hours = nHours % 24;
        setPeriodWarningMsg(
          `Selected period exceeds available forecast.\nUsing max available (${
            days ? `${days}d` : ""
          }${days && hours ? " " : ""}${hours ? `${hours}h` : ""}) instead.`
        );
      }
    } else {
      setPeriodWarningMsg("");
    }
  }, [selectedHour, selectedLength]);

  useEffect(() => {
    handleSliderValue(DEFAULT_SLIDER_VALUE, true);
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={styles.sliderTextAll}>
        <View style={styles.sliderTextEdge}></View>
        <Text style={styles.sliderTextCenter}>Trip length:</Text>
        <Text style={styles.sliderTextEdge}>
          {sliderVal?.top ? `${sliderVal?.top} ${sliderVal?.topTail}` : ""}
        </Text>
      </View>

      <View style={styles.sliderTextAll}>
        <View style={styles.sliderTextEdge}></View>
        <View style={styles.sliderTextCenter}></View>
        <Text style={[styles.sliderTextEdge, styles.sliderTextEdgeSecondary]}>
          {sliderVal?.bottom ? `${sliderVal?.bottom} ${sliderVal?.bottomTail}` : ""}
        </Text>
      </View>

      <Slider
        style={[styles.slider, { opacity: showMap ? 0 : 1 }]} // opacity is used to hide slider when map is shown (bugged dismounting)
        minimumValue={1}
        maximumValue={43}
        step={1}
        value={3}
        onValueChange={handleSliderValue}
        onSlidingComplete={(i: number) => handleSliderValue(i, true)}
      />

      {periodWarningMsg && (
        <Text
          style={styles.warningMsg}
          numberOfLines={2}
          onPress={() => setPeriodWarningMsg(false)}
        >
          {periodWarningMsg} TAP TO HIDE
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  sliderTextAll: {
    flexDirection: "row",
    alignItems: "center",
  },
  sliderTextCenter: {
    flex: 1,
    textAlign: "center",
  },
  sliderTextEdge: {
    flex: 1,
    textAlign: "left",
  },
  sliderTextEdgeSecondary: {
    fontSize: 11,
  },
  slider: {
    width: "90%",
  },
  warningMsg: {
    overflow: "hidden",
    color: "#d40f0f",
    textAlign: "center",
    fontSize: 11,
  },
});

export default LengthSelection;
