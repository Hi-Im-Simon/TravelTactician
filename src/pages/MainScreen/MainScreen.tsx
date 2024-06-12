import { useEffect, useState } from "react";
import { View, Text } from "react-native";
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
  const [error, setError] = useState(false);

  const getLocationData = async () => {
    setInfo({
      loading: true,
      mainText: "Loading location's data...",
    });

    try {
      const data = await fetchLocationData(location);
      setLocationData(data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setInfo({ loading: false });
    }
  };

  useEffect(() => {
    getLocationData();
  }, [location.latitude, location.longitude]);

  return (
    <View style={{ display: showMap ? "none" : "flex", height: "100%" }}>
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
      {error && !locationData && (
        <View
          onTouchStart={() => {
            setError(false);
            getLocationData();
          }}
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text>
            An error has occured and the application is unable to start. Check your internet
            connection or contact us for support.
          </Text>
          <Text>Tap to try again.</Text>
        </View>
      )}
    </View>
  );
};

export default MainScreen;
