import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackSvg from "../assets/svgs/back.svg";
import SaveSvg from "../assets/svgs/save.svg";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { Appbar, Menu, Divider, Button } from "react-native-paper";
import { SettingsContext } from "../Context/Settingscontext";

const TextEdit = () => {
  const { theme } = useContext(SettingsContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [bodyHeight, setBodyHeight] = useState(50); // Initial height for the body TextInput
  const navigation = useNavigation();
  const [visible, setvisible] = React.useState(false);
  const [currentDateTime, setCurrentDateTime] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });

  const openmenu = () => {
    setvisible(true);
  };
  const closemenu = () => {
    setvisible(false);
  };

  const selectstate = () => {
    setvisible(!visible);
  };

  const saveNote = async () => {
    if (title.length > 0 || body.length > 0) {
      try {
        const db = await SQLite.openDatabaseAsync("notes");
        await db.runAsync(
          "INSERT INTO datas (title, body, date, time) VALUES (?, ?, ?, ?)",
          [title, body, currentDateTime.date, currentDateTime.time]
        );
        navigation.navigate("MainTabs", { screen: "Home" });
      } catch (error) {
        // console.error("Error inserting data:", error);
      }
    } else {
      console.log("empty");
    }
  };

  const goback = () => {
    saveNote();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SafeAreaView
      style={[
        { backgroundColor: theme === "light" ? "#fff" : "#333", flex: 1 },
      ]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust offset for iOS
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Header Section */}
          <View style={styles.container}>
            {/* <Appbar.BackAction
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: "transparent",
                justifyContent: "flex-start",
              }}
            /> */}
            <View
              style={{
                flexDirection: "row",
                columnGap: 10,
                position: "static",
              }}
            >
              <TouchableOpacity onPress={goback}>
                {theme === "light" ? (
                  <BackSvg width={30} height={30} />
                ) : (
                  <BackSvg
                    width={30}
                    height={30}
                    style={{ backgroundColor: "white" }}
                  />
                )}
              </TouchableOpacity>
              <Text
                style={[
                  {
                    fontWeight: "bold",
                    fontSize: 20,
                    color: theme === "light" ? "black" : "white",
                  },
                ]}
              >
                Notes
              </Text>
            </View>
            {/* <Text style={styles.JOT}>Jot Notes</Text> */}
            {/* <TouchableOpacity onPress={saveNote}>
              <SaveSvg width={30} height={30} />
            </TouchableOpacity> */}
            <View
              style={{
                position: "relative",
                flexDirection: "row",
                marginHorizontal: -25,
                justifyContent: "flex-end",
              }}
            >
              {theme === "light" ? (
                <TouchableOpacity onPress={saveNote}>
                  <SaveSvg width={30} height={30} fill="black" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={saveNote}>
                  <SaveSvg width={30} height={30} fill="white" />
                </TouchableOpacity>
              )}

              <Menu
                visible={visible}
                onDismiss={closemenu}
                anchorPosition="right"
                anchor={
                  <Button
                    onPress={openmenu}
                    icon="dots-vertical"
                    buttonColor="white"
                    rippleColor={"white"}
                    mode="elevated"
                    contentStyle={styles.menuAnchorButton}
                  />
                }
                style={styles.menuContainer} // Custom styling for the menu
              >
                <Menu.Item
                  title="Share"
                  leadingIcon="checkbox-marked-outline"
                  style={styles.menuItem}
                />
                <Divider />
                <Menu.Item
                  title="Export"
                  leadingIcon="cog-outline"
                  style={styles.menuItem}
                />
              </Menu>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                styles.Date,
                {
                  color: theme === "light" ? "black" : "white",
                },
              ]}
            >
              {currentDateTime.date} , {currentDateTime.time}
            </Text>
          </View>
          {/* Title Input */}
          <View style={styles.inputContainer}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
              placeholderTextColor={theme === "light" ? "" : "white"}
              style={[
                styles.Title,
                { color: theme === "light" ? "black" : "white" },
              ]}
            />
          </View>

          {/* Body Input */}
          <View style={styles.bodyContainer}>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Content"
              placeholderTextColor={theme === "light" ? "" : "white"}
              multiline
              style={[
                styles.Body,
                {
                  height: Math.max(50, bodyHeight),
                  color: theme === "light" ? "black" : "white",
                },
              ]}
              onContentSizeChange={(e) =>
                setBodyHeight(e.nativeEvent.contentSize.height)
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    marginTop: 20,
  },
  JOT: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1DA1F2",
    textAlign: "center",
    flex: 1,
  },
  icons: {
    flexDirection: "row",
  },
  Date: {
    fontSize: 16,
    color: "#333",
    fontWeight: "300",
    textAlign: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 3,
  },
  inputContainer: {
    marginHorizontal: 15,
  },
  Title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  bodyContainer: {
    flex: 1,
    marginHorizontal: 13,
  },
  Body: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 22,
    height: "auto",
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
});

export default TextEdit;
