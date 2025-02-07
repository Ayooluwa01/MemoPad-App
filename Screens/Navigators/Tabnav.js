import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import { Text, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Homepage from "../Homepage";
import Favourites from "../Favourites";
import Settings from "../Settings";
import { SettingsContext } from "../../Context/Settingscontext";

const Tabnav = () => {
  const Tab = createBottomTabNavigator();
  const { theme } = useContext(SettingsContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => {
        // Determine whether the tab bar should be visible
        const isTabBarVisible = !["Settings"].includes(
          state.routes[state.index].name
        );

        return (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            style={{
              height: isTabBarVisible ? 65 : 0, // Adjust height to 0 if hidden
              backgroundColor: theme === "light" ? "transparent" : "#333",
              borderTopWidth: isTabBarVisible ? 0 : 0,
              overflow: isTabBarVisible ? "visible" : "hidden",
            }}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
          />
        );
      }}
    >
      {theme === "light" ? (
        <Tab.Screen
          name="Home"
          component={Homepage}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
            // tabBarLabelStyle:{theme==='light' ? "white" : "#333"},
            tabBarLabelStyle: {
              color: theme === "light" ? "black" : "white", // Change label color based on theme
            },
          }}
        />
      ) : (
        <Tab.Screen
          name="Home"
          component={Homepage}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={"white"} />
            ),
            // tabBarLabelStyle:{theme==='light' ? "white" : "#333"},
            tabBarLabelStyle: {
              color: theme === "light" ? "black" : "white", // Change label color based on theme
            },
          }}
        />
      )}

      {theme === "light" ? (
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Icon name="cog" size={size} color={color} />
            ),
            tabBarLabelStyle: {
              color: theme === "light" ? "black" : "white", // Change label color based on theme
            },
          }}
        />
      ) : (
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Icon name="cog" size={size} color={"white"} />
            ),
            tabBarLabelStyle: {
              color: theme === "light" ? "black" : "white", // Change label color based on theme
            },
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default Tabnav;
