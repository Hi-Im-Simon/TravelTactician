import { Dispatch, SetStateAction } from "react";
import { View, Text } from "react-native";

import { LocationCoords } from "../../models/common";

interface Props {
  location: LocationCoords;
}

const MainScreen = ({ location }: Props) => {
  return (
    <View>
      <Text>CurrentWeatherPanel</Text>
      <Text>
        {location.latitude} {location.longitude}
      </Text>
    </View>
  );
};

export default MainScreen;
