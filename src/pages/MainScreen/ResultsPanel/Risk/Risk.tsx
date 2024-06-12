import { Text, View } from "react-native";

import { LocationData } from "../../../../models/locationData";

interface Props {
  locationData: LocationData;
}

const Risk = (props: Props) => {
  return (
    <View>
      <Text>Risks here</Text>
    </View>
  );
};

export default Risk;
