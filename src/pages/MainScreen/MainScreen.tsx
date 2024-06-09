import { useEffect, useState } from "react";
import { View } from "react-native";

import { LocationCoords } from "../../models/APIs/deviceLocation";
import TimeSelectionPanel from "./WeatherPanel/WeatherPanel";
import TimeSelection from "./TimeSelectionPanel/TimeSelectionPanel";
import { useLoadingStore, useMapStore } from "../../utils/zustand";
import ResultsPanel from "./ResultsPanel/ResultsPanel";
import fetchLocationData from "../../utils/APIs/external/fetchLocationData";
import { LocationData } from "../../models/locationData";

interface Props {
  location: LocationCoords;
}

const MainScreen = ({ location }: Props) => {
  const { showMap } = useMapStore();
  const { setInfo } = useLoadingStore();
  const [locationData, setLocationData] = useState<LocationData | undefined>();
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedLength, setSelectedLength] = useState(3);

  const getLocationData = async () => {
    setInfo({
      loading: true,
      mainText: "Loading location's data...",
    });

    setLocationData(await fetchLocationData(location));

    setInfo({ loading: false });
  };

  useEffect(() => {
    getLocationData();
  }, [location.latitude, location.longitude]);

  return (
    <View style={{ display: showMap ? "none" : "flex", borderColor: "red", height: "100%" }}>
      {locationData && (
        <>
          <TimeSelectionPanel locationData={locationData} selectedHour={selectedHour} />

          <TimeSelection
            weather={locationData.weather}
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
            selectedLength={selectedLength}
            setSelectedLength={setSelectedLength}
          />

          <ResultsPanel
            locationData={locationData}
            selectedHour={selectedHour}
            selectedLength={selectedLength}
          />
        </>
      )}
    </View>
  );
};

export default MainScreen;
