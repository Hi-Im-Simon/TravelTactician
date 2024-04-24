import { useEffect, useState } from "react";
import { View } from "react-native";

import { LocationCoords } from "../../models/common";
import { getWeather } from "../../utils/getWeather";
import { WeatherData } from "../../models/openmeteo";
import WeatherPanel from "./WeatherPanel/WeatherPanel";
import TimeSelection from "./TimeSelection/TimeSelection";
import { Text } from "react-native-paper";

interface Props {
  location: LocationCoords;
}

const MainScreen = ({ location }: Props) => {
  const [weather, setWeather] = useState<WeatherData | undefined>();
  const [selectedHour, setSelectedHour] = useState(0);

  const fetchWeather = async () => getWeather(location).then(setWeather);

  useEffect(() => {
    fetchWeather();
  }, [location]);

  return (
    <View>
      {weather && (
        <>
          <WeatherPanel weather={weather} selectedHour={selectedHour} />
          <TimeSelection
            weather={weather}
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
          />
        </>
      )}

      {weather && (
        <>
          <Text>timezone: {weather.timezone}</Text>
          <Text>timezone_abbreviation: {weather.timezone_abbreviation}</Text>
          <Text>utc_offset_seconds: {weather.utc_offset_seconds}</Text>
          <Text>current_weather.time: {weather.current_weather.time}</Text>
        </>
      )}
    </View>
  );
};

export default MainScreen;
