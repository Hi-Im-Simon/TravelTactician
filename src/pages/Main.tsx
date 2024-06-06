import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { requestForegroundPermissionsAsync } from "expo-location";

import MainScreen from "./MainScreen/MainScreen";
import { LocationCoords } from "../models/common";
import MapScreen from "./MapScreen/MapScreen";
import { getLocation } from "../utils/getLocation";
import { useLoadingStore, useLocationStore, useMapStore } from "../utils/zustand";
import LoadingScreen from "./LoadingScreen/LoadingScreen";

const Main = () => {
  const { setLocationPermission } = useLocationStore();
  const { setInfo } = useLoadingStore();
  const { showMap, toggleMap } = useMapStore();
  // user's chosen location (automatically detected or selected on the map)
  const [location, setLocation] = useState<LocationCoords | undefined>(undefined);

  const tryGetLocationPermission = async () => {
    try {
      // ask for location permission
      setInfo({ loading: true });
      const locationStatus = await requestForegroundPermissionsAsync();
      setLocationPermission(locationStatus.granted);
      if (locationStatus.granted) {
        const loc = await getLocation();
        if (loc) {
          setLocation(loc);
        } else {
          toggleMap(true);
        }
      } else {
        toggleMap(true);
      }
      setInfo({ loading: false });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    tryGetLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <TouchableOpacity style={styles.buttonView} onPress={() => toggleMap()} activeOpacity={0.4}>
          <Image
            style={[styles.buttonImage, showMap && styles.buttonImageShowMenu]}
            source={require("../../assets/down-arrow.png")}
          />
        </TouchableOpacity>
      )}

      {showMap && <MapScreen location={location} setLocation={setLocation} />}

      {location && <MainScreen location={location} />}

      <LoadingScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  part: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 10,
  },
  buttonImage: {
    width: 40,
    height: 40,
  },
  buttonImageShowMenu: {
    transform: [{ rotate: "180deg" }],
  },
});

export default Main;
