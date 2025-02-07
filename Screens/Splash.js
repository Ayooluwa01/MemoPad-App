import React from "react";
import { Image, ImageBackground, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Splash = () => {
  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../assets/img.png")}
        style={styles.background}
      ></ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    resizeMode: "center",
    top: "-5",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
});
export default Splash;
