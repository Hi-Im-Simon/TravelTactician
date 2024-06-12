import { ScrollView, Text, View, StyleSheet, Linking, FlatList } from "react-native";
import dayjs from "dayjs";

import { LocationData } from "../../../../models/locationData";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFaceFrownOpen } from "@fortawesome/free-regular-svg-icons";

interface Props {
  locationData: LocationData;
}

const getColor = (risk: number) => {
  if (risk <= 2.5) {
    return "#d0e9c6";
  } else if (risk <= 3.5) {
    return "#c4e3f3";
  } else if (risk <= 4.5) {
    return "#faf2cd";
  } else {
    return "#ebcdcd";
  }
};

const Risk = (props: Props) => {
  const advisory = props.locationData.advisory;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.section}>
        {advisory && props.locationData.country ? (
          <>
            <View style={styles.scoreBox}>
              <View
                style={[
                  styles.scoreCircle,
                  {
                    backgroundColor: getColor(advisory.score),
                  },
                ]}
              >
                <Text style={styles.scoreText}>{advisory.score}</Text>
              </View>
            </View>

            <View style={styles.messageBox}>
              <Text style={styles.messageText}>
                <Text style={styles.bold}>{props.locationData.country}</Text> has a current risk
                level of <Text style={styles.bold}>{advisory.score}</Text> (out of 5).
              </Text>
              <Text style={styles.messageText}>
                Our advice: {advisory.message.split(": ").pop()}
              </Text>
            </View>

            <View>
              <Text>
                Source:{" "}
                <Text style={styles.link} onPress={() => Linking.openURL(advisory.source)}>
                  {advisory.source}
                </Text>
              </Text>
              <Text>Last source update: {dayjs(advisory.updated).format("DD-MM-YYYY HH:mm")}</Text>
            </View>
          </>
        ) : (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>
              No information about travel risk for selected location.
            </Text>
            <View style={{ flex: 1 }}>
              <Text>
                It usually means that you have selected a location that does not to belong to any
                country or the Risk Assessment service is currently offline.
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noData: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  noDataText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    maxWidth: 280,
  },
  noDataList: {
    marginLeft: 20,
  },
  scrollView: {
    alignSelf: "stretch",
    overflow: "scroll",
  },
  section: {
    padding: 10,
    paddingTop: 25,
    gap: 25,
  },
  bold: {
    fontWeight: "bold",
  },
  link: {
    textDecorationLine: "underline",
    color: "blue",
  },
  scoreBox: {
    display: "flex",
    alignItems: "center",
  },
  scoreCircle: {
    width: 90,
    height: 90,
    borderRadius: 75,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  messageBox: {
    gap: 5,
  },
  messageText: {
    fontSize: 16,
  },
});

export default Risk;
