import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Searchbar = () => {
  const [text, setText] = useState("");
  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="Search....."
          onChangeText={(newText) => setText(newText)}
          value={text}
          style={{
            alignItems: "center",
            alignSelf: "center",
            textAlign: "left",
            fontSize: 20,
            borderColor: "blue",
            marginTop: 8,
            width: "100%",
            height: 40,
            backgroundColor: "whitesmoke",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Searchbar;
