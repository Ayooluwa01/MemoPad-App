import * as React from "react";
import { View } from "react-native";
import { useContext, useState } from "react";
import { SettingsContext } from "../../Context/Settingscontext";
import { RadioButton } from "react-native-paper";
const Sortlist = () => {
  const { sortvalue, setsortvalue, theme } = useContext(SettingsContext);
  // const [items, setItems] = useState([
  //   { label: "Newest Creation first", value: "newest" },
  //   { label: "Oldest Creation first", value: "oldest" },
  //   { label: "Sort Alphabetically", value: "Alphabetically" },
  // ]);
  return (
    <View
      style={{
        marginTop: 30,
        rowGap: "15%",
        alignContent: "center",
        alignItems: "center",
        paddiing: 15,
        justifyContent: "space-between",
      }}
    >
      <View>
        <RadioButton.Group
          onValueChange={(sortvalue) => setsortvalue(sortvalue)}
          value={sortvalue}
          style={{ flexDirection: "row" }}
        >
          <RadioButton.Item
            label="Sort by latest (Newest first)"
            value="latest"
            position="leading"
            labelStyle={{
              textAlign: "left",
              color: theme === "light" ? "black" : "white",
            }}
          />
          <RadioButton.Item
            label="Sort by oldest (Oldest first)"
            value="oldest"
            position="leading"
            labelStyle={{
              textAlign: "left",
              color: theme === "light" ? "black" : "white",
            }}
          />
          <RadioButton.Item
            label="Sort alphabetically (A-Z)"
            value="alphabetically"
            position="leading"
            labelStyle={{
              textAlign: "left",
              color: theme === "light" ? "black" : "white",
            }}
          />
        </RadioButton.Group>
      </View>
    </View>
  );
};

export default Sortlist;
