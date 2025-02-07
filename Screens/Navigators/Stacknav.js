import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabnav from "./Tabnav"; // Import Tab Navigator
import Createtext from "../Createtext";
// Other stack screens
import Edittext from "../Edittext";
import Search from "../Search"; // Other stack screens
import Homepage from "../Homepage";
import Settings from "../Settings";
const Stack = createNativeStackNavigator();
const Stacknav = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs" // Use the Tab Navigator as the initial route
      screenOptions={{ headerShown: false }}
    >
      {/* Add the Tab Navigator as a screen */}
      <Stack.Screen name="MainTabs" component={Tabnav} />
      {/* Additional Stack Screens */}
      <Stack.Screen name="Search" component={Search} />
      {/* <Stack.Screen name="Homepage" component={Homepage} /> */}

      <Stack.Screen name="Createtext" component={Createtext} />
      <Stack.Screen name="Edittext" component={Edittext} />
    </Stack.Navigator>
  );
};

export default Stacknav;
