import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Greeter from "./Homepage screens/Greeter";
import Bottombutton from "./Homepage screens/Bottombutton";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import Delete2 from "../assets/svgs/delete2.svg";
import Copy from "../assets/svgs/copy.svg";
import SwipeableFlatList from "rn-gesture-swipeable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";
import Deletelist from "./Homepage screens/Deletelist";
import * as Clipboard from "expo-clipboard";
import { Button, Snackbar } from "react-native-paper";
import { SettingsContext } from "../Context/Settingscontext";
import RBSheet from "react-native-raw-bottom-sheet";
import Sortlist from "./Components/Sortlist";
const Homepage = () => {
  const { theme, numColumns, sortvalue, multi } = useContext(SettingsContext);
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const [datas, setdatas] = useState([]);
  const [longselect, setlongselect] = useState([]);
  const [selected, setSelected] = React.useState(false);
  const swipeableRefs = useRef({});
  const [checked, setChecked] = React.useState(false);
  const [selectstate, setSelectstate] = useState(false); // Now a boolean value
  const [copiedText, setCopiedText] = useState("");
  const [visible, setVisible] = React.useState(false);
  const { width } = Dimensions.get("window");
  const onDismissSnackBar = () => setVisible(false);
  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getStringAsync();
  //   setCopiedText(text);
  // };

  const selecting = () => {
    setSelectstate((prev) => !prev); // This will properly toggle the state
    multi();
  };

  const initdb = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("notes");
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS datas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          body TEXT,
          date TEXT,
          time TEXT
        );
      `);
      // console.log("Db connected");
    } catch (error) {
      // console.error("Error connecting database:", error);
    }
  };

  const select = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("notes");
      const re = await db.getAllAsync(
        "SELECT * FROM datas ORDER BY date DESC, time DESC"
      );
      const formattedata = re.map((row) => ({
        id: row.id,
        title: row.title,
        body: row.body,
        date: row.date,
        time: row.time,
      }));

      setdatas(formattedata);
    } catch (error) {
      console.error("Error selecting data:", error);
    }
  };

  const sort = async () => {
    // console.log(sortval);
    if (sortvalue === "latest") {
      try {
        const db = await SQLite.openDatabaseAsync("notes");
        const re = await db.getAllAsync(
          "SELECT * FROM datas ORDER BY date DESC, time DESC"
        );
        const formattedata = re.map((row) => ({
          id: row.id,
          title: row.title,
          body: row.body,
          date: row.date,
          time: row.time,
        }));

        setdatas(formattedata);
      } catch (error) {
        console.error("Error selecting data:", error);
      }
    } else if (sortvalue === "oldest") {
      try {
        const db = await SQLite.openDatabaseAsync("notes");
        const re = await db.getAllAsync(
          "SELECT * FROM datas ORDER BY date ASC, time ASC"
        );
        const formattedata = re.map((row) => ({
          id: row.id,
          title: row.title,
          body: row.body,
          date: row.date,
          time: row.time,
        }));

        setdatas(formattedata);
      } catch (error) {
        console.error("Error selecting data:", error);
      }
    } else if (sortvalue === "alphabetically") {
      try {
        const db = await SQLite.openDatabaseAsync("notes");
        const re = await db.getAllAsync(
          "SELECT * FROM datas ORDER BY title ASC"
        );
        const formattedata = re.map((row) => ({
          id: row.id,
          title: row.title,
          body: row.body,
          date: row.date,
          time: row.time,
        }));

        setdatas(formattedata);
      } catch (error) {
        console.error("Error selecting data:", error);
      }
    }
  };

  useEffect(() => {
    initdb();
    select();
    sort();
  }, [sortvalue]);

  const opensheet = () => {
    refRBSheet.current.open();
  };

  const multiselect = (id, item) => {
    if (longselect.includes(id)) {
      setlongselect(longselect.filter((k) => k !== id));
    } else {
      setlongselect([...longselect, id]);
    }
  };

  const renderRightActions = (item) => (
    <View style={styles.actionsContainer}>
      <Pressable style={styles.deleteButton} onPress={() => handleDelete(item)}>
        <Delete2 width={30} height={30} />
      </Pressable>

      <Pressable style={styles.copyButton}>
        <Copy width={30} height={30} onPress={() => copyToClipboard(item)} />
      </Pressable>
    </View>
  );

  const copyToClipboard = async (item) => {
    const data = `${item.title}\n${item.body}`;
    // console.log(data);
    await Clipboard.setStringAsync(data);
    setVisible(!visible);
    // console.log("copied");
  };

  const deleting = async () => {
    try {
      const db = await SQLite.openDatabaseAsync("notes");
      for (const id of longselect) {
        await db.runAsync(`DELETE FROM datas WHERE id = ?`, [id]);
      }
      setlongselect([]); // Clear the selection after deleting
      select(); // Refresh the list after deletion
      setSelectstate(false); // Reset select mode
      // console.log("deleted selected items");
    } catch (error) {
      // console.error("Error deleting data:", error);
    }
  };

  const handleDelete = async (item) => {
    try {
      const db = await SQLite.openDatabaseAsync("notes");
      await db.runAsync(`DELETE FROM datas WHERE id = ?`, [item.id]);
      select();
      if (swipeableRefs.current[item.id]) {
        swipeableRefs.current[item.id].close();
      }
      // console.log("deleted");
    } catch (error) {
      // console.error("Error deleting data:", error);
    }
  };

  const renderItem = ({ item }) => {
    const titled = item.title;
    const bodyed = item.body;
    const cdated = item.date;
    const ctimed = item.time;
    const id = item.id;
    const sent = { titled, bodyed, cdated, ctimed };

    return (
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Edittext", { Data: [sent] })}
          onLongPress={selecting}
        >
          {numColumns === "2" ? (
            <View
              style={[
                styles.horizontallist,
                {
                  backgroundColor: theme === "light" ? "white" : "#333",
                  lineHeight: 20,
                  width: width / 2.2,
                  marginHorizontal: 2,
                },
              ]}
            >
              <View
                style={[
                  {
                    color: theme === "light" ? "#333" : "white",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 4,
                    color: theme === "light" ? "#333" : "white",
                    lineHeight: 23,

                    overflow: "hidden",
                  }}
                  ellipsizeMode="tail"
                >
                  {titled.length > 10 && numColumns == 2
                    ? titled.slice(0, 10)
                    : titled || "No title"}
                </Text>

                {selectstate && (
                  <Checkbox
                    status={longselect.includes(id) ? "checked" : "unchecked"}
                    onPress={() => multiselect(id)}
                    style={{ color: "red", backgroundColor: "red" }}
                  />
                )}
              </View>

              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 20,
                  color: theme === "light" ? "#666" : "white",
                  marginHorizontal: 1,
                }}
                ellipsizeMode="tail"
                numberOfLines={3 || 8}
              >
                {bodyed}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#aaa",
                    flex: 1,
                  }}
                >
                  {cdated || "No Date"}
                </Text>
                <Text style={{ fontSize: 12, color: "#aaa" }}>
                  {ctimed || "No Time"}
                </Text>
              </View>
            </View>
          ) : (
            //for listview
            <View
              style={[
                styles.list,
                {
                  backgroundColor: theme === "light" ? "#fff" : "#333",
                },
              ]}
            >
              <View
                style={[
                  {
                    color: theme === "light" ? "#333" : "white",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                  },
                ]}
              >
                {numColumns === 2 ? (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 4,
                      color: theme === "light" ? "#333" : "white",
                      lineHeight: 30,
                    }}
                    ellipsizeMode="tail"
                  >
                    {titled.length > 10 && numColumns == 2
                      ? titled.slice(0, 20) + "...."
                      : titled || "No title"}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 4,
                      color: theme === "light" ? "#333" : "white",
                    }}
                  >
                    {titled || "No Title"}
                  </Text>
                )}

                {selectstate && (
                  <Checkbox
                    status={longselect.includes(id) ? "checked" : "unchecked"}
                    onPress={() => multiselect(id)}
                    style={{ color: "red", backgroundColor: "red" }}
                  />
                )}
              </View>

              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 20,
                  color: theme === "light" ? "#666" : "white",
                }}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {bodyed}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12, color: "#aaa" }}>
                  {cdated || "No Date"}
                </Text>
                <Text style={{ fontSize: 12, color: "#aaa" }}>
                  {ctimed || "No Time"}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme === "light" ? "white" : "#333",
        }}
      >
        <Greeter sort={opensheet} selectstate={selecting} />

        {datas.length > 0 ? (
          selectstate ? (
            <FlatList
              data={datas}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ padding: 16 }}
              numColumns={numColumns}
              key={numColumns}
              extraData={longselect}
            />
          ) : (
            <SwipeableFlatList
              data={datas}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ padding: 16 }}
              numColumns={numColumns}
              key={numColumns}
              extraData={longselect}
              renderRightActions={(item) => renderRightActions(item)}
            />
          )
        ) : (
          <Text style={{ textAlign: "center", fontSize: 14, top: 250 }}>
            Nothing Yet
          </Text>
        )}

        <RBSheet
          ref={refRBSheet}
          draggable="true"
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },

            container: {
              backgroundColor: theme === "light" ? "white" : "#333",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
          customModalProps={{
            animationType: "slide",
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: false,
          }}
        >
          <Sortlist />
        </RBSheet>
        <Snackbar
          style={{ backgroundColor: "#1DA1F2" }}
          theme={{ colors: { primary: "#1DA1F2" } }}
          visible={visible}
          duration={500}
          onDismiss={onDismissSnackBar}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Text copied to clipboard
          </Text>
        </Snackbar>
        {selectstate ? (
          <Deletelist deleting={deleting} />
        ) : (
          <Bottombutton selectstate={selecting} />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  horizontallist: {
    padding: 9,
    marginBottom: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    marginTop: 7,
    lineHeight: 20,
    gap: 1,
    left: 0,
    right: 0,

    justifyContent: "space-between",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  list: {
    padding: 9,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    marginHorizontal: 3,
    marginTop: 7,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flex: 1,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    marginRight: 10,
  },
  copyButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
  },
});

export default Homepage;
