import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

import Main from "./src/components/Main";

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Main />
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default App;
