import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Greeter from "./Homepage screens/Greeter";
import Buttombutton from "./Homepage screens/Bottombutton";

const Favourites = () => {
  return (
    <SafeAreaView style={{ marginTop: 5 }}>
      <View>
        <Greeter />
        <Text>hgfgggg</Text>

        <Buttombutton />
      </View>
    </SafeAreaView>
  );
};

export default Favourites;
