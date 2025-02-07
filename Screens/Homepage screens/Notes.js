import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Notes = () => {
  return (
    <View>
      <Image source={require("../../assets/empty.png")} style={styles.image} />

      {/* <Text style={styles.Notes}>
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  //   Notes: {
  //     marginTop: 20,
  //     textAlign: "center",
  //     fontSize: 20,
  //     borderBottomWidth: 2,
  //     borderColor: "blue",
  //     borderRadius: 50,
  //   },

  image: {
    height: "100%",
    width: "100%",
    top: 0,
  },
});
export default Notes;
