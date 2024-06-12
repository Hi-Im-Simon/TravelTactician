import { useEffect, useState } from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

import { LocationCoords } from "../../models/APIs/deviceLocation";
import SummaryPanel from "./SummaryPanel/SummaryPanel";
import TimeSelection from "./TimeSelectionPanel/TimeSelectionPanel";
import { useLoadingStore, useMapStore } from "../../utils/zustand";
import fetchLocationData from "../../utils/APIs/external/fetchLocationData";
import { LocationData } from "../../models/locationData";
import ResultsPanel from "./ResultsPanel/ResultsPanel";

interface Props {
  location: LocationCoords;
}

const MainScreen = ({ location }: Props) => {
  const { showMap } = useMapStore();
  const { setInfo } = useLoadingStore();
  const [locationData, setLocationData] = useState<LocationData | undefined>();
  const [selectedHour, setSelectedHour] = useState(0);

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
          <SummaryPanel locationData={locationData} selectedHour={selectedHour} />

          <TimeSelection
            weather={locationData.weather}
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
          />

          <Divider bold />

          <ResultsPanel locationData={locationData} selectedHour={selectedHour} />
        </>
      )}
    </View>
  );
};

export default MainScreen;
