import { View, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useLoadingStore } from "../../utils/zustand";

const LoadingScreen = () => {
  const { info } = useLoadingStore();

  return (
    <View style={info.loading ? styles.container : styles.containerHidden}>
      {info.mainText && <Text style={styles.mainText}>{info.mainText}</Text>}
      <View>
        {info.subTexts?.map((text, i) => (
          <Text key={i} style={styles.subText}>
            {text}
          </Text>
        ))}
      </View>
      <ActivityIndicator size="large" color="#000" style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 9999999999,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  containerHidden: {
    display: "none",
  },
  spinner: {},
  mainText: {
    textAlign: "center",
    fontSize: 24,
  },
  subText: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default LoadingScreen;
