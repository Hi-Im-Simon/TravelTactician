import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import Main from "./src/pages/Main";

const App = () => {
  return (
    <SafeAreaView>
      <Main />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default App;
