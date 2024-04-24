import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { requestForegroundPermissionsAsync } from "expo-location";

import MainScreen from "./MainScreen/MainScreen";
import { LocationCoords } from "../models/common";
import MapScreen from "./MapScreen/MapScreen";
import { getLocation } from "../utils/getLocation";
import { useLocationStore, useMapStore } from "../utils/zustand";

const Main = () => {
  const { locationPermission, setLocationPermission } = useLocationStore();
  const { showMap, toggleMap } = useMapStore();
  // user's chosen location (automatically detected or selected on the map)
  const [location, setLocation] = useState<LocationCoords | undefined>(undefined);

  const tryGetLocationPermission = async () => {
    try {
      // ask for location permission
      const locationStatus = await requestForegroundPermissionsAsync();
      setLocationPermission(locationStatus.granted);
      if (locationStatus.granted) {
        getLocation().then(setLocation);
      } else {
        toggleMap(true);
      }
    } catch (error) {
      setLocationPermission(false);
      console.error(`Error: ${error}`);
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
      {showMap ? (
        <MapScreen location={location} setLocation={setLocation} />
      ) : location ? (
        <MainScreen location={location} />
      ) : (
        locationPermission === true && (
          <View style={styles.part}>
            <Text>Finding your location...</Text>
            <Text>Make sure device's location is enabled.</Text>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
