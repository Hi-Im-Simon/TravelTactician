import { useEffect, useState } from "react";
import { Alert, Button, Linking, Pressable, Text } from "react-native";
import {
  LocationObjectCoords,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

const Main = () => {
  const [userLocationPermission, setUserLocationPermission] = useState(false);
  // actual location, only changed on app init or when user sets it
  const [userLocation, setUserLocation] = useState<LocationObjectCoords | null>(
    null
  );
  // temp location, buf between getLocation without setting and Map component init
  const [mapRefreshLocation, setMapRefreshLocation] =
    useState<LocationObjectCoords | null>(null);

  const getLocation = async (set: boolean = false) => {
    const retryGetLocation = async (set: boolean) => {
      getCurrentPositionAsync().then((loc) => {
        if (loc !== null) {
          if (set) {
            setUserLocation(loc.coords);
          } else {
            setMapRefreshLocation(loc.coords);
          }
        } else {
          setTimeout(() => retryGetLocation(set), 500);
        }
      });
    };

    try {
      // ask for location permission
      let locationStatus = await requestForegroundPermissionsAsync();

      // check if user granted the permission
      if (locationStatus.granted) {
        // if they did, proceed to get user's location
        setUserLocationPermission(true);
        retryGetLocation(set);
      } else {
        // if not, try to get it again
        setUserLocationPermission(false);

        // if can't ask again, ask the user to enable it manually
        // and ask for permission again in 5 seconds
        if (!locationStatus.canAskAgain) {
          Alert.alert(
            "Location Permission Required",
            "Please enable location permission in your device settings to use this app.",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Open Settings",
                onPress: () => {
                  Linking.openSettings();
                  setTimeout(getLocation, 5000);
                },
              },
            ]
          );
        }
        // if can ask again, prompt user again
        else {
          getLocation();
        }
      }
    } catch (error) {
      Alert.alert(`Error: ${error}`);
    }
  };

  useEffect(() => {
    getLocation(true);
  }, []);

  return (
    <>
      <Pressable>
        <Text>XDEEEEEEEEEE</Text>
      </Pressable>
      <Text>meh</Text>

      <Text>
        {userLocation?.latitude} {userLocation?.longitude}
      </Text>
    </>
  );
};

export default Main;
