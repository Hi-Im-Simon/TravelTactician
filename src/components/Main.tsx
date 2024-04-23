import { useEffect, useState } from "react";
import { Button, Pressable, Text } from "react-native";
import * as Location from "expo-location";

const Main = () => {
  const [clicks, setClicks] = useState(0);
  // console.log(Location);

  const a = () => {
    setClicks((old) => old + 1);
    setTimeout(a, 500);
  };

  useEffect(() => {
    // a();
  }, []);

  return (
    <>
      <Pressable onPress={() => setClicks((old) => old + 1)}>
        <Text>XDEEEEEEEEEE</Text>
        <Text>XDEEEEEEEEEE</Text>
      </Pressable>
      <Text>meh</Text>

      <Text>{clicks}</Text>
    </>
  );
};

export default Main;
