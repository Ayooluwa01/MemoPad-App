import React, { useEffect, useRef, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";
import Searching from "../assets/svgs/search3.svg"; // SVG Search icon
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import { SettingsContext } from "../Context/Settingscontext";
const Search = () => {
  const { theme, numColumns } = useContext(SettingsContext);
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [body, setBody] = useState("");
  const [datas, setdatas] = useState([]);
  const [text, setText] = useState("");
  const inputfocus = useRef();
  const search = async () => {
    if (body.trim() === "") {
      setdatas([]);
      setText("Search for your notes");
      // Clear the data if search input is empty
      return;
    }

    try {
      const db = await SQLite.openDatabaseAsync("notes");
      const re = await db.getAllAsync(
        `SELECT * FROM datas WHERE title LIKE ? OR body LIKE ? ORDER BY date DESC, time DESC`,
        [`%${body}%`, `%${body}%`]
      );
      if (re.length > 0) {
        const formattedata = re.map((row) => ({
          id: row.id,
          title: row.title,
          body: row.body,
          date: row.date,
          time: row.time,
        }));
        setdatas(formattedata);
      } else {
        setText("No results found");
      }
    } catch (error) {
      // console.error("Error selecting data:", error);
    }
  };

  useEffect(() => {
    search();
  }, [body]);

  useEffect(() => {
    inputfocus.current.focus();
  });
  const renderItem = ({ item }) => {
    const { title, body, date, time } = item;
    const titled = item.title;
    const bodyed = item.body;
    const cdated = item.date;
    const ctimed = item.time;
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("Edittext", {
            Data: [{ titled, bodyed, cdated, ctimed }],
          })
        }
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        {numColumns === "2" ? (
          <View
            style={[
              {
                backgroundColor: theme === "light" ? "#f0f0f0" : "#33333",
                borderRadius: theme === "light" ? 0 : 8,
                borderWidth: theme === "light" ? 0 : 1,
                borderColor: theme === "light" ? "none" : "#ddd",
                shadowColor: theme === "light" ? "none" : "#000",
                lineHeight: 20,
                width: width / 2.2,
                marginHorizontal: 2,
              },
              styles.list,
            ]}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 4,
                color: theme === "light" ? "black" : "white",
              }}
              numberOfLines={3}
            >
              {titled || "No Title"}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme === "light" ? "black" : "white",
                marginBottom: 4,
              }}
              numberOfLines={2}
            >
              {bodyed || "No Body"}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: theme === "light" ? "black" : "white",
                }}
              >
                {date || "No Date"}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: theme === "light" ? "black" : "white",
                }}
              >
                {time || "No Time"}
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={[
              {
                backgroundColor: theme === "light" ? "#f0f0f0" : "#33333",
                borderRadius: theme === "light" ? 0 : 8,
                borderWidth: theme === "light" ? 0 : 1,
                borderColor: theme === "light" ? "none" : "#ddd",
                shadowColor: theme === "light" ? "none" : "#000",
                lineHeight: 20,
                marginHorizontal: 2,
              },
              styles.list,
            ]}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 4,
                color: theme === "light" ? "black" : "white",
              }}
              numberOfLines={3}
            >
              {titled || "No Title"}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme === "light" ? "black" : "white",
                marginBottom: 4,
              }}
              numberOfLines={2}
            >
              {bodyed || "No Body"}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: theme === "light" ? "black" : "white",
                }}
              >
                {date || "No Date"}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: theme === "light" ? "black" : "white",
                }}
              >
                {time || "No Time"}
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View
      style={[
        { backgroundColor: theme === "light" ? "white" : "#333" },
        styles.container,
      ]}
    >
      <View
        style={[
          { backgroundColor: theme === "light" ? "white" : "#333" },
          styles.inputContainer,
        ]}
      >
        <TextInput
          ref={inputfocus}
          value={body}
          onChangeText={(text) => setBody(text)} // Update `body`
          placeholder="Search"
          placeholderTextColor={theme === "light" ? "black" : "white"}
          style={[
            { color: theme === "light" ? "#333" : "white" },
            styles.input,
          ]}
        />

        <Searching
          style={styles.icon}
          width={20}
          height={20}
          fill={theme === "light" ? "black" : "white"}
        />
        <View>
          <Pressable onPress={() => navigation.goBack()}>
            <Text
              style={[
                { color: theme === "light" ? "#007AFF" : "white" },
                styles.cancelText,
              ]}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>

      <SafeAreaView
        style={[
          { backgroundColor: theme === "light" ? "white" : "#333", flex: 1 },
        ]}
      >
        {datas.length > 0 ? (
          <FlatList
            data={datas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} // Ensure unique keys
            contentContainerStyle={{ padding: 16 }}
            numColumns={numColumns}
            key={numColumns}
          />
        ) : (
          <Text
            style={[
              { color: theme === "light" ? "black" : "white" },
              styles.noDataText,
            ]}
          >
            {text}
          </Text>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  list: {
    marginBottom: 16,
    padding: 9,
    borderRadius: 8,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 250,
  },
  cancelText: {
    marginLeft: 10,
    // iOS default blue for buttons
    fontSize: 16,
  },
});

export default Search;
