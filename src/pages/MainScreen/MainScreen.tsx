import { useEffect, useState } from "react";
import { View } from "react-native";

import { LocationCoords } from "../../models/APIs/location";
import { getWeather } from "../../utils/APIs/external/getWeather";
import { WeatherData } from "../../models/APIs/openmeteo";
import TimeSelectionPanel from "./WeatherPanel/WeatherPanel";
import TimeSelection from "./TimeSelectionPanel/TimeSelectionPanel";
import { useLoadingStore, useMapStore } from "../../utils/zustand";
import ResultsPanel from "./ResultsPanel/ResultsPanel";

interface Props {
  location: LocationCoords;
}

const MainScreen = ({ location }: Props) => {
  const { showMap } = useMapStore();
  const { setInfo } = useLoadingStore();
  const [weather, setWeather] = useState<WeatherData | undefined>();
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedLength, setSelectedLength] = useState(3);

  const fetchLocationData = async () => {
    setInfo({
      loading: true,
      mainText: "Loading location's data...",
    });

    setWeather(await getWeather(location));

    setInfo({ loading: false });
  };

  useEffect(() => {
    setWeather(undefined);
    fetchLocationData();
  }, [location.latitude, location.longitude]);

  return (
    <View style={{ display: showMap ? "none" : "flex", borderColor: "red", height: "100%" }}>
      {weather && (
        <>
          <TimeSelectionPanel weather={weather} selectedHour={selectedHour} />

          <TimeSelection
            weather={weather}
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
            selectedLength={selectedLength}
            setSelectedLength={setSelectedLength}
          />

          <ResultsPanel
            weather={weather}
            selectedHour={selectedHour}
            selectedLength={selectedLength}
          />
        </>
      )}
    </View>
  );
};

export default MainScreen;
