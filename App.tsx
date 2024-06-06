import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

import Main from "./src/pages/Main";

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView>
        <Main />
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
