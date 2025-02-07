import React from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

const SwipeableListItem = ({ item, onEdit, onDelete, onCopy, onExport }) => {
  const renderRightActions = () => (
    <View style={styles.swipeActions}>
      <Pressable
        style={[styles.actionButton, { backgroundColor: "red" }]}
        onPress={() => onDelete(item)}
      >
        <Text style={styles.actionText}>Delete</Text>
      </Pressable>
      <Pressable
        style={[styles.actionButton, { backgroundColor: "blue" }]}
        onPress={() => onCopy(item)}
      >
        <Text style={styles.actionText}>Copy</Text>
      </Pressable>
      <Pressable
        style={[styles.actionButton, { backgroundColor: "green" }]}
        onPress={() => onExport(item)}
      >
        <Text style={styles.actionText}>Export</Text>
      </Pressable>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Pressable
        onPress={() => onEdit(item)}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <View style={styles.list}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>
            {item.title || "No Title"}
          </Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 4 }}>
            {item.body || "No Body"}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12, color: "#aaa" }}>
              {item.date || "No Date"}
            </Text>
            <Text style={{ fontSize: 12, color: "#aaa" }}>
              {item.time || "No Time"}
            </Text>
          </View>
        </View>
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  swipeActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SwipeableListItem;
