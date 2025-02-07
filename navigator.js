import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Stacknav from "./Screens/Navigators/Stacknav"; // Tab Navigator

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stacknav />
    </NavigationContainer>
  );
};

export default Navigator;
