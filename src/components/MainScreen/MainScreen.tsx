import { useState } from "react";
import { View } from "react-native";

import { LocationCoords } from "../../models/common";
import { getWeather } from "../../utils/getWeather";
import { WeatherData } from "../../models/openmeteo";
import WeatherPanel from "./WeatherPanel/WeatherPanel";

interface Props {
  location: LocationCoords;
}

const MainScreen = ({ location }: Props) => {
  const [weather, setWeather] = useState<WeatherData | undefined>();

  return (
    <View>
      <WeatherPanel
        selectedHour={0}
        location={location}
        weather={weather}
        fetchWeather={async () => getWeather(location).then(setWeather)}
      />
    </View>
  );
};

export default MainScreen;
