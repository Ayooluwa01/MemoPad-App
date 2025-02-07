import React, { useContext } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Switch,
  FlatList,
  Linking,
} from "react-native";
import Back from "../assets/svgs/back.svg";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { SettingsContext } from "../Context/Settingscontext";
const Settings = () => {
  const { toggleDarkMode, theme, isDarkMode } = useContext(SettingsContext);
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  console.log(theme);
  console.log(isDarkMode);

  const toggleNotifications = () =>
    setNotificationsEnabled(!notificationsEnabled);

  const data = [
    {
      section: "General",
      options: [
        {
          label: "Notifications",
          type: "switch",
          value: notificationsEnabled,
          onChange: toggleNotifications,
        },
        {
          label: "Dark Mode",
          type: "switch",
          value: isDarkMode,
          onChange: toggleDarkMode,
        },
      ],
    },
    {
      section: "About",
      options: [
        {
          label: "App Information",
          type: "link",
          onPress: () => Linking.openURL("https://github.com/Ayooluwa01"),
        },
        {
          label: "Version",
          type: "text",
          value: "1.0.0",
        },
        {
          label: "Privacy Policy",
          type: "link",
          onPress: () => Linking.openURL("https://github.com/Ayooluwa01"),
        },
        {
          label: "Terms of Service",
          type: "link",
          onPress: () => Linking.openURL("https://github.com/Ayooluwa01"),
        },
        {
          label: "App Credits",
          type: "link",
          onPress: () => Linking.openURL("https://github.com/Ayooluwa01"),
        },
      ],
    },
    {
      section: "Contact",
      options: [
        {
          label: "Contact Support",
          type: "link",
          onPress: () => Linking.openURL("https://github.com/Ayooluwa01"),
        },
        {
          label: "Share App",
          type: "link",
          onPress: () => Linking.openURL("https://github.com/Ayooluwa01"),
        },
      ],
    },
  ];
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme === "light" ? "black" : "white" },
          ]}
        >
          {item.section}
        </Text>
        {item.options.map((option, idx) => (
          <View key={idx} style={[styles.optionContainer]}>
            <Pressable onPress={option.onPress}>
              <Text
                style={[
                  styles.optionText,
                  { color: theme === "light" ? "gray" : "white" },
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
            {option.type === "switch" ? (
              <Switch
                value={option.value}
                onValueChange={option.onChange}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={option.value ? "#f5dd4b" : "#f4f3f4"}
              />
            ) : option.type === "link" ? (
              <Pressable onPress={option.onPress}></Pressable>
            ) : (
              <Text
                style={[
                  styles.versionText,
                  { color: theme === "light" ? "black" : "white" },
                ]}
              >
                {option.value}
              </Text>
            )}
          </View>
        ))}
        {/* Line after each section */}
        <View style={styles.sectionLine} />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === "light" ? "#fff" : "#333" },
      ]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: theme === "light" ? "white" : "#333" },
        ]}
      >
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          style={[
            { backgroundColor: theme === "light" ? "transparent" : "white" },
          ]}
        />
        <Appbar.Header
          style={[
            { backgroundColor: theme === "light" ? "transparent" : "#333" },
          ]}
        >
          {/* Add other header elements here */}
        </Appbar.Header>
        <Appbar.Content
          title="Settings"
          titleStyle={{ color: theme === "light" ? "black" : "white" }}
        />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />

      {/* Jot with Ayo Text */}
      <View style={styles.footer}>
        <Text
          style={[
            styles.footerText,
            { color: theme === "light" ? "black" : "white" },
          ]}
        >
          Jot with Ayo
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "500",
    marginLeft: 10,
  },
  sectionContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  optionContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600", // Bold text for options
    flex: 1,
  },
  linkText: {
    color: "#1E90FF", // Blue color for links
    fontSize: 14,
    fontWeight: "500",
  },
  versionText: {
    fontSize: 14,
    // Soft gray for version text
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "400",
    position: "relative",
  },
  sectionLine: {
    marginVertical: 15,
    height: 1,
    backgroundColor: "#dcdcdc", // Light gray line
  },
});

export default Settings;
