import { Dispatch, SetStateAction, useRef, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import MapView, { Marker, MapPressEvent, PoiClickEvent, PROVIDER_GOOGLE } from "react-native-maps";
import { Button, Icon } from "react-native-paper";

import { LocationCoords } from "../../models/locationData";
import { getLocation } from "../../utils/APIs/local/getLocation";
import { useLocationStore, useMapStore } from "../../utils/zustand";

const DEFAULT_ZOOM = 20;
const DEFAULT_ZOOM_WITH_LOCATION = 3;
const DEFAULT_LATITUDE = 50;
const DEFAULT_LONGITUDE = 24;

interface Props {
  location: LocationCoords | undefined;
  setLocation: Dispatch<SetStateAction<LocationCoords | undefined>>;
}

const MapScreen = ({ location, setLocation }: Props) => {
  const { locationPermission } = useLocationStore();
  const { toggleMap } = useMapStore();
  const [selectedLocation, setSelectedLocation] = useState<LocationCoords | undefined>(location);
  const mapRef = useRef<MapView>(null);

  const handleMapClick = (e: MapPressEvent | PoiClickEvent) => {
    e.stopPropagation();
    setSelectedLocation(e.nativeEvent.coordinate);
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: useWindowDimensions().height,
          width: useWindowDimensions().width,
        },
      ]}
    >
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude ?? DEFAULT_LATITUDE,
          longitude: location?.longitude ?? DEFAULT_LONGITUDE,
          latitudeDelta: location ? DEFAULT_ZOOM_WITH_LOCATION : DEFAULT_ZOOM,
          longitudeDelta: location ? DEFAULT_ZOOM_WITH_LOCATION : DEFAULT_ZOOM,
        }}
        onPress={handleMapClick}
        onPoiClick={handleMapClick}
        provider={PROVIDER_GOOGLE}
      >
        {/* marker */}
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>

      {/* menu */}
      <View style={styles.dropdownMenu}>
        <View style={styles.dropdownMenuEdgeItem}></View>

        <Button
          labelStyle={{ fontSize: 20 }}
          style={styles.dropdownMenuItem}
          onPress={() => {
            setLocation(selectedLocation);
            toggleMap(false);
          }}
          mode="elevated"
          disabled={!selectedLocation}
        >
          Confirm
        </Button>

        <Button
          style={[styles.dropdownMenuItem, styles.dropdownMenuEdgeItem]}
          onPress={async () => {
            const curL = await getLocation();
            if (curL) {
              setSelectedLocation((old) => ({ ...old, ...curL }));
              mapRef.current?.animateToRegion({
                ...curL,
                latitudeDelta: DEFAULT_ZOOM_WITH_LOCATION,
                longitudeDelta: DEFAULT_ZOOM_WITH_LOCATION,
              });
            }
          }}
          mode="elevated"
          disabled={!locationPermission}
        >
          <Icon source="map-marker-outline" size={24} />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#fff",
    alignSelf: "stretch",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  dropdownMenu: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 1,
    zIndex: 10,
  },
  dropdownMenuItem: {
    width: 150,
    justifyContent: "center",
    height: 50,
  },
  dropdownMenuEdgeItem: {
    width: 80,
  },
});

export default MapScreen;
