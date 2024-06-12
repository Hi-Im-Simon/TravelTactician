import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { StyleSheet, View, useWindowDimensions, Text } from "react-native";
import MapView, { Marker, MapPressEvent, PoiClickEvent, PROVIDER_GOOGLE } from "react-native-maps";
import { Button } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { LocationCoords } from "../../models/APIs/deviceLocation";
import { getLocation } from "../../utils/APIs/local/getLocation";
import { useLocationStore, useMapStore } from "../../utils/zustand";
import getLocationAddress from "../../utils/APIs/external/getLocationAddress";
import { faMapMarkerAlt, faTimes, faStreetView } from "@fortawesome/free-solid-svg-icons";

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
  const [address, setAddress] = useState<string[]>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const mapRef = useRef<MapView>(null);

  const handleMapClick = (e: MapPressEvent | PoiClickEvent) => {
    e.stopPropagation();
    setAddress(undefined);
    setSelectedLocation(e.nativeEvent.coordinate);
  };

  useEffect(() => {
    if (selectedLocation) {
      getLocationAddress(selectedLocation).then(setAddress);
    }
  }, [selectedLocation]);

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
        {selectedLocation && (
          <Marker coordinate={selectedLocation} tracksViewChanges={false}>
            <View style={styles.markerArea}>
              {address && (
                <View style={styles.markerLabelArea}>
                  {address.map((name, index) => (
                    <Text key={index} style={styles.markerLabelText}>
                      {name}
                    </Text>
                  ))}
                </View>
              )}
              <FontAwesomeIcon icon={faMapMarkerAlt} color="#e64b3b" size={30} />
            </View>
          </Marker>
        )}
      </MapView>

      {/* menu */}
      <View style={styles.menu}>
        <Button
          style={[styles.menuItem, styles.menuEdgeItem]}
          onPress={() => toggleMap(false)}
          mode="elevated"
          disabled={!locationPermission}
        >
          <FontAwesomeIcon icon={faTimes} color="black" size={24} />
        </Button>

        <Button
          labelStyle={styles.confirmButtonLabel}
          style={styles.menuItem}
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
          style={[styles.menuItem, styles.menuEdgeItem]}
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
          <FontAwesomeIcon icon={faStreetView} color="black" size={24} />
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
  markerArea: {
    gap: 8,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  markerImage: {
    width: 20,
    height: 33,
  },
  markerImageLoading: {
    display: "none",
  },
  markerLabelArea: {
    backgroundColor: "#ffffffcc",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderColor: "#00000055",
    borderWidth: 1.5,
    borderRadius: 8,
    maxWidth: 200,
  },
  markerLabelText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  menu: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 1,
    zIndex: 10,
  },
  menuItem: {
    width: 150,
    justifyContent: "center",
    height: 50,
  },
  menuEdgeItem: {
    width: 80,
  },
  confirmButtonLabel: {
    fontSize: 20,
    color: "black",
  },
});

export default MapScreen;
