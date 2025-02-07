import React, { useContext, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  Animated,
} from "react-native";
import PenSvg from "../../assets/svgs/pen2.svg";
import PenSvg2 from "../../assets/svgs/pen.svg";
import Cancel from "../../assets/svgs/cancel.svg";
import { useNavigation } from "@react-navigation/native"; // Use the hook
import { SettingsContext } from "../../Context/Settingscontext";
import Delete from "../../assets/svgs/delete2.svg";
import { Button } from "react-native-paper";

const { height } = Dimensions.get("window");

const Bottombutton = ({ selectstate }) => {
  const navigation = useNavigation(); // Access the navigation object
  const { theme, multitoggle, multi } = useContext(SettingsContext);
  const [icon_1] = useState(new Animated.Value(60));
  const [icon_2] = useState(new Animated.Value(60));
  const [icon_3] = useState(new Animated.Value(60));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 110,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 60,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 60,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 60,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const ciclepressed = () => {
    pop === false ? popIn() : popOut();
  };

  const selecting = () => {
    multi();
    selectstate();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* {theme === "light" ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Createtext")} // Navigate to the TextEdit screen within the Home tab
        >
          <PenSvg width={70} height={70} fill="#1DA1F2" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate("Createtext")} // Navigate to the TextEdit screen within the Home tab
        >
          <PenSvg width={85} height={85} fill="white" />
        </TouchableOpacity>
      )} */}
      <Animated.View
        style={[styles.circle, { bottom: icon_1, position: "absolute" }]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Createtext")} // Navigate to the TextEdit screen within the Home tab
        >
          <PenSvg width={70} height={70} fill="#1DA1F2" />
        </TouchableOpacity>
      </Animated.View>
      {/* 
      <Animated.View style={[styles.circle, { bottom: icon_2, right: icon_2 }]}>
        <TouchableOpacity>
          <PenSvg width={70} height={70} fill="#240A3BFF" />
        </TouchableOpacity>
      </Animated.View> */}
      <Animated.View
        style={[styles.circle, { right: icon_3, position: "absolute" }]}
      >
        <TouchableOpacity onPress={selecting}>
          <Delete width={70} height={70} fill="#21DA1F" />
          {pop === true && (
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                backgroundColor: "#A01919FF",
                padding: 2,
              }}
            >
              Multi Delete
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity style={styles.circle} onPress={ciclepressed}>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("Createtext")} // Navigate to the TextEdit screen within the Home tab
        > */}

        {pop === true ? (
          <Cancel width={70} height={70} fill="#1DA1F2" />
        ) : (
          <PenSvg2 width={70} height={70} fill="#1DA1F2" />
        )}
        {/* </TouchableOpacity> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: height * 0.75,
    right: 10,
    zIndex: 20,
    padding: 10,
  },
  circle: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 60,
    right: 55,
    borderRadius: 50,
    justifyContent: "center",
    zIndex: 5,
    shadowColor: "red",
    shadowOffset: 44,
    alignItems: "center",
  },
});

export default Bottombutton;
