import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, Text } from "react-native";

import { LocationCoords } from "../../models/common";
import { getWeather } from "../../utils/getWeather";
import { WeatherData } from "../../models/openmeteo";
import WeatherPanel from "./WeatherPanel/WeatherPanel";

interface Props {
  location: LocationCoords;
}

const MainScreen = ({ location }: Props) => {
  const [weather, setWeather] = useState<WeatherData | undefined>();

  const fetchWeather = async () => getWeather(location).then(setWeather);

  useEffect(() => {
    fetchWeather();
  }, [location]);

  return (
    <View>
      <WeatherPanel weather={weather} fetchWeather={fetchWeather} />
    </View>
  );
};

export default MainScreen;
