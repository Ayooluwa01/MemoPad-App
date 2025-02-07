import React, { useState, useContext, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchSvg from "../../assets/svgs/search3.svg";
import SortSvg from "../../assets/svgs/sort.svg";
import { useNavigation } from "@react-navigation/native";
import { SettingsContext } from "../../Context/Settingscontext";
import Backsvg from "../../assets/svgs/back2.svg";
import Backsvg2 from "../../assets/svgs/back2light.svg";

import Categorysvg from "../../assets/svgs/category.svg";

import { Pressable } from "react-native-gesture-handler";

const Greeter = ({ sort, selectstate }) => {
  const navigation = useNavigation();
  const [daytext, setDayText] = useState("");
  const { theme, gridtoggle, multitoggle, multi, setmultitoggle } =
    useContext(SettingsContext);
  const refRBSheet = useRef();
  // const openmenu = () => {
  //   setvisible(true);
  // };
  // const closemenu = () => {
  //   setvisible(false);
  // };

  // const data = [
  //   { key: "1", value: "Mobiles", disabled: true },
  //   { key: "2", value: "Appliances" },
  //   { key: "3", value: "Cameras" },
  //   { key: "4", value: "Computers", disabled: true },
  //   { key: "5", value: "Vegetables" },
  //   { key: "6", value: "Diary Products" },
  //   { key: "7", value: "Drinks" },
  // ];

  // const [quote, setQuote] = useState("");

  // const quotesByDay = {
  //   Sunday: ["Relax and recharge! 🌞"],
  //   Monday: [, "Hello, Monday! 🌟"],
  //   Tuesday: ["Tuesday vibes! 🌈"],
  //   Wednesday: ["Midweek motivation! 💼"],
  //   Thursday: ["Thankful Thursday! 🙏"],
  //   Friday: ["Feel the Friday fun! 🎶"],
  //   Saturday: [
  //     "Weekend vibes! 🥳",
  //     "Time to unwind! 🌴",
  //     "Enjoy the moment! 🍹",
  //   ],
  // };

  // const checkDay = () => {
  //   const dayChecker = new Date().getDay();
  //   let dayName = "";

  //   switch (dayChecker) {
  //     case 0:
  //       dayName = "Sunday";
  //       break;
  //     case 1:
  //       dayName = "Monday";
  //       break;
  //     case 2:
  //       dayName = "Tuesday";
  //       break;
  //     case 3:
  //       dayName = "Wednesday";
  //       break;
  //     case 4:
  //       dayName = "Thursday";
  //       break;
  //     case 5:
  //       dayName = "Friday";
  //       break;
  //     case 6:
  //       dayName = "Saturday";
  //       break;
  //     default:
  //       dayName = "Unknown";
  //   }

  //   setDayText(dayName);

  //   // Select a random quote for the day
  //   const quotes = quotesByDay[dayName];
  //   setQuote(quotes);
  // };

  // useEffect(() => {
  //   checkDay();
  // }, []);

  const handlePress = (icon) => {
    console.log(`${icon} icon pressed`);
  };

  const back = () => {
    setmultitoggle(false);
    selectstate();
  };
  return (
    <SafeAreaView style={{ marginTop: 5 }}>
      <View style={styles.container}>
        {multitoggle === true ? (
          <Pressable onPress={back}>
            {theme === "light" ? (
              <Backsvg width={40} height={30} />
            ) : (
              <Backsvg2 width={40} height={30} />
            )}
          </Pressable>
        ) : (
          <Text
            style={[
              styles.welcome,
              { color: theme === "light" ? "#1DA1F2" : "white" },
            ]}
          >
            MEMOPAD
          </Text>
        )}

        <View style={styles.svgContainer}>
          {theme === "light" ? (
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <SearchSvg width={25} height={25} fill="#1C274C" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <SearchSvg width={25} height={25} fill="white" />
            </TouchableOpacity>
          )}

          {/*  */}
          {theme === "light" ? (
            <TouchableOpacity onPress={sort}>
              <SortSvg width={27} height={25} fill="#1C274C" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={sort}>
              <SortSvg width={27} height={25} fill="white" />
            </TouchableOpacity>
          )}

          {theme === "light" ? (
            <TouchableOpacity onPress={gridtoggle}>
              <Categorysvg width={25} height={25} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={gridtoggle}>
              <Categorysvg width={25} height={25} fill="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  welcome: {
    fontSize: 14,
    fontWeight: "900",
    flex: 1, // Allow text to take as much space as needed
    marginRight: 20,
    marginHorizontal: 15,
  },
  svgContainer: {
    flexDirection: "row",
    rowGap: 20,
    columnGap: 5,
    marginRight: 17,
  },
  menuContainer: {
    backgroundColor: "white", // White background
    borderRadius: 8, // Rounded corners for aesthetics
    paddingVertical: 10, // Reduce vertical padding
    paddingHorizontal: 5, // Reduce horizontal padding
    minWidth: 150, // Optional: Adjust the menu width
  },
  menuItem: {
    height: 35, // Reduce item height
    justifyContent: "center", // Center align text and icon
  },
  menuAnchorButton: {
    padding: 0, // Reduce padding for the anchor button
    margin: 0, // Remove margin for compact design
  },
});

export default Greeter;
