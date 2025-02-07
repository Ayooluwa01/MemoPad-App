import React from "react";
import { Button, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const Reanimated = () => {
  const width = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={[
          {
            height: 100,
            backgroundColor: "violet",
          },
          animatedStyle, // Apply animated styles here
        ]}
      />
      <Button onPress={handlePress} title="Click me" />
    </View>
  );
};

export default Reanimated; // Default export
