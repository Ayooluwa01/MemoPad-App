import React, { useEffect, useState } from "react";
import { Text, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Splash from "./Screens/Splash";
import Navigator from "./navigator"; // Import the navigator correctly
import Onboarding from "react-native-onboarding-swiper";
import PenSvg from "./assets/svgs/pen.svg";
import Delete2 from "./assets/svgs/delete2.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider } from "react-native-paper";
import { SettingsProvider } from "./Context/Settingscontext";

const App = () => {
  const [splash, setSplash] = useState(false); // Initially no splash screen
  const [showOnboarding, setShowOnboarding] = useState(false); // Initially show onboarding

  // Function to check if onboarding has been shown before from AsyncStorage
  const checkOnboardingStatus = async () => {
    try {
      const onboardingShown = await AsyncStorage.getItem("onboardingShown");
      // console.log("onboardingShown value:", onboardingShown);
      if (onboardingShown === "true") {
        setSplash(true); // Show splash if onboarding was completed previously
        setShowOnboarding(false); // Skip onboarding
      } else {
        setShowOnboarding(true); // Show onboarding if not completed
        setSplash(false); // No splash screen
      }
    } catch (error) {}
  };

  // Function to update the onboarding state in AsyncStorage after it is shown
  const updateOnboardingState = async () => {
    try {
      // console.log("Updating onboarding status to true...");
      await AsyncStorage.setItem("onboardingShown", "true");
    } catch (error) {
      // console.error("Error updating onboarding state:", error);
    }
  };

  useEffect(() => {
    // Run checkOnboardingStatus to determine whether to show splash or onboarding
    checkOnboardingStatus();
    // Show splash for 5 seconds before transitioning to onboarding or navigator if not skipped
    if (!showOnboarding) {
      setTimeout(() => {
        // console.log("Hiding splash after timeout...");
        setSplash(false); // After 5 seconds, hide splash screen
      }, 5000);
    }
  }, []); // Runs again when `showOnboarding` changes

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <SettingsProvider>
        <PaperProvider>
          {splash ? (
            <Splash /> // Show splash screen if splash is true
          ) : showOnboarding ? (
            <Onboarding
              pages={[
                {
                  backgroundColor: "#fff",
                  image: (
                    <ImageBackground
                      source={require("./assets/img.png")}
                      style={styles.background} // Correct background style
                    />
                  ),
                  title: "Welcome",
                  subtitle:
                    "Jot with ease, organize your thoughts, keep everything in one place, and enhance your productivity. Stay organized with our intuitive tools designed to help you succeed.",
                  titleStyles: styles.title,
                  subtitleStyles: styles.subtitle,
                },
                {
                  backgroundColor: "#fff",
                  image: (
                    <ImageBackground
                      source={require("./assets/empty.png")}
                      style={styles.background} // Correct background style
                    />
                  ), // Replace with an image if needed
                  title: "Don't Know How to Use the App?",
                  subtitle:
                    "No worries! Follow the step-by-step instructions and get up to speed in no time. Our easy-to-follow guide will help you master all the features, Let’s get started and make the most of the app!",
                  titleStyles: styles.title,
                  subtitleStyles: styles.subtitle,
                },
                {
                  backgroundColor: "#fff",
                  image: <PenSvg width={85} height={85} fill="#1DA1F2" />,
                  // Replace with an image if needed
                  title: "Creating a Note",
                  subtitle:
                    "To create a new note, simply click the Plus (+) sign. It's quick, easy, and the perfect way to jot down your ideas, tasks, or anything you want to remember. Get started now!",
                  titleStyles: styles.title,
                  subtitleStyles: styles.subtitle,
                },

                {
                  backgroundColor: "#fff",
                  image: <Delete2 width={85} height={85} />,
                  // Replace with an image if needed
                  title: "Deleting a Note",
                  subtitle:
                    "To delete a note, simply swipe the note you want to remove, and click the delete button that appears. It’s that simple to keep your notes organized and clutter-free. Try it now!",
                  titleStyles: styles.title,
                  subtitleStyles: styles.subtitle,
                },
              ]}
              transitionAnimationDuration={1000}
              bottomBarColor="white"
              showSkip={true}
              showNext={false} // This will show the Skip button
              onSkip={() => {
                updateOnboardingState(); // Update state when skipping onboarding
                setShowOnboarding(false); // Skip onboarding after it's done
              }}
              onDone={() => {
                updateOnboardingState(); // Update state when onboarding is completed
                setShowOnboarding(false); // Skip onboarding after it's done
              }}
            />
          ) : (
            <Navigator /> // Show the main app navigator after onboarding or splash
          )}
        </PaperProvider>
      </SettingsProvider>
    </SafeAreaView>
  );
};

// Style for background image and text
const styles = StyleSheet.create({
  background: {
    width: 200, // Set your desired width
    height: 200, // Set your desired height
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1DA1F2", // A nice blue color for the title
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333", // Dark color for the subtitle
    textAlign: "center",
    marginTop: 5, // Slightly smaller margin for subtitle
    paddingHorizontal: 30,
  },
});

export default App;
