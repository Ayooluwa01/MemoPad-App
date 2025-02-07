import React, { useContext } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Delete from "../../assets/svgs/delete2.svg";
import { useNavigation } from "@react-navigation/native"; // Use the hook
import { SettingsContext } from "../../Context/Settingscontext";
const { height } = Dimensions.get("window");

const Bottombutton = ({ deleting }) => {
  const { theme, multitoggle, multi, setmultitoggle } =
    useContext(SettingsContext);
  const navigation = useNavigation(); // Access the navigation object

  const deleted = () => {
    deleting();
    if (multitoggle === true) {
      setmultitoggle(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {theme === "light" ? (
        <TouchableOpacity
          onPress={deleted} // Navigate to the TextEdit screen within the Home tab
        >
          <Delete width={85} height={85} fill="#1DA1F2" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={deleted} // Navigate to the TextEdit screen within the Home tab
        >
          <Delete width={85} height={85} fill="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
