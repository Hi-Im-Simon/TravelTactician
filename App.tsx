import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Main from "./src/components/Main";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hi</Text>
      <Main />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
