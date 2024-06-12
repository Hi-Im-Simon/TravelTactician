import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabView, SceneRendererProps, Route, TabBar } from "react-native-tab-view";
import { LinearGradient } from "expo-linear-gradient";

import { LocationData } from "../../../models/locationData";
import Weather from "./Weather/Weather";
import Risk from "./Risk/Risk";
import { Divider } from "react-native-paper";

const routes: Route[] = [
  { key: "weather", title: "Weather" },
  { key: "risk", title: "Risk" },
];

interface Props {
  locationData: LocationData;
  selectedHour: number;
}

const ResultsPanel = (props: Props) => {
  const [index, setIndex] = useState<number>(0);
  const [tabSwipeEnabled, setTabSwipeEnabled] = useState<boolean>(true);

  const renderScene = ({ route }: SceneRendererProps & { route: Route }) => {
    switch (route.key) {
      case "weather":
        return <Weather {...props} setTabSwipeEnabled={setTabSwipeEnabled} />;
      case "risk":
        return <Risk {...props} />;
      default:
        return <Weather {...props} setTabSwipeEnabled={setTabSwipeEnabled} />;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      swipeEnabled={tabSwipeEnabled}
      renderTabBar={(tabProps) => (
        <TabBar
          {...tabProps}
          style={styles.tabBar}
          indicatorStyle={styles.indicator}
          renderLabel={({ route }) => <Text style={[styles.tabBarText]}>{route.title}</Text>}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    color: "black",
  },
  tabBarText: {
    fontSize: 18,
  },
  indicator: {
    backgroundColor: "gray",
  },
  gradient: {
    height: "100%",
    width: "100%",
  },
});

export default ResultsPanel;
