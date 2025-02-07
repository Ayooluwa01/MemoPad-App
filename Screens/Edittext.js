import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackSvg from "../assets/svgs/back.svg";
import SaveSvg from "../assets/svgs/save.svg";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { Appbar, Menu, Divider, Button } from "react-native-paper";
import { SettingsContext } from "../Context/Settingscontext";

const TextEdit = ({ route }) => {
  // console.log("route.params:", route.params);
  const { theme } = useContext(SettingsContext);
  const { Data } = route.params;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [newBody, setNewBody] = useState(""); // New state to track the updated body
  const navigation = useNavigation();
  const [visible, setvisible] = React.useState(false);

  const [bodyHeight, setBodyHeight] = useState(50); // Initial height for the body TextInput
  const [currentDateTime, setCurrentDateTime] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });
  const cdate = currentDateTime.date;
  const ctime = currentDateTime.time;
  const cbody = body;
  // const noteData = { title, body, cdate, ctime }; // Create a single note object
  // const datatitle = title;
  // const databody = body;

  useEffect(() => {
    for (const datas of Data) {
      setTitle(datas.titled);
      setBody(datas.bodyed);
      setNewBody(datas.bodyed);
    }
  }, []);

  const openmenu = () => {
    setvisible(true);
  };
  const closemenu = () => {
    setvisible(false);
  };
  //connect to database
  useEffect(() => {
    const initdb = async () => {
      try {
        const db = await SQLite.openDatabaseAsync("notes");
      } catch (error) {
        // console.error("Error initializing database:", error);
      }
    };

    initdb();
  }, []);

  // getting time everyseconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log("focused");

  //     return () => {
  //       console.log(title);
  //     };
  //   }, [])
  // );

  const saveNote = () => {
    const update = async () => {
      try {
        const db = await SQLite.openDatabaseAsync("notes"); // Open the database

        // Ensure you're passing the correct parameters, using `body` as the condition
        await db.runAsync(
          `UPDATE datas 
           SET title = ?, body = ?, date = ?, time = ? 
           WHERE body = ?`, // Use `body` to match the specific note
          [title, newBody, cdate, ctime, body] // Matching the current `body` value
        );
        // console.log("Updated data successfully");

        // Navigate to Home after the update
        navigation.navigate("MainTabs", {
          screen: "Home",
        });
      } catch (error) {
        // console.error("Error updating data:", error);
      }
    };

    update();
  };

  const goback = () => {
    saveNote();
  };

  return (
    <SafeAreaView
      style={[
        { backgroundColor: theme === "light" ? "#fff" : "#333", flex: 1 },
      ]}
    >
      <View style={styles.container}>
        {/* <Appbar.BackAction
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: "transparent",
                justifyContent: "flex-start",
              }}
            /> */}
        <View style={{ flexDirection: "row", columnGap: 10 }}>
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
            anchor={
              <Button
                onPress={openmenu}
                icon="dots-vertical"
                rippleColor={"white"}
                mode="contained-tonal"
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
      <View style={styles.inputContainer}>
        <KeyboardAvoidingView
          behavior={Platform.os === "ios" ? "padding" : "height"}
          style={{ padding: 0, margin: 0 }}
        >
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
        </KeyboardAvoidingView>
      </View>

      {/* Body Input */}

      <View style={styles.bodyContainer}>
        <ScrollView>
          <TextInput
            value={newBody}
            onChangeText={(text) => setNewBody(text)}
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
        </ScrollView>
      </View>
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
  menuAnchorButton: {
    padding: 0, // Reduce padding for the anchor button
    margin: 0, // Remove margin for compact design
  },
});

export default TextEdit;
