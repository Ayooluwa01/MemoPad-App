import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [numColumns, setNumColumns] = useState("1");
  const [sortvalue, setsortvalue] = React.useState("");
  const [multitoggle, setmultitoggle] = React.useState(false);

  useEffect(() => {
    // const getvalue = async () => {
    //   try {
    //     const newselect = await AsyncStorage.getItem("sort");
    //     if (newselect) {
    //       // setValue(newselect);
    //       console.log(newselect);
    //     }
    //   } catch (error) {
    //     console.log("nothing");
    //   }
    // };

    const createvalue = async () => {
      try {
        await AsyncStorage.setItem("sort", sortvalue);
        setsortvalue(sortvalue);
        console.log(sortvalue);
      } catch (error) {
        console.log(error, "error");
      }
    };
    // getvalue();
    createvalue();
  });

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      }
    };

    const loadgrid = async () => {
      const storedgrid = await AsyncStorage.getItem("grid");
      if (storedgrid) {
        setNumColumns(storedgrid);
      }
    };

    loadTheme();
    loadgrid();
  }, []);

  const toggleDarkMode = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  const gridtoggle = async () => {
    const toggled = numColumns === "1" ? "2" : "1";
    setNumColumns(toggled);

    await AsyncStorage.setItem("grid", toggled);
  };

  const multi = () => {
    setmultitoggle(!multitoggle);
  };

  // Derive isDarkMode dynamically
  const isDarkMode = theme === "dark";
  // console.log(multitoggle);
  return (
    <SettingsContext.Provider
      value={{
        theme,
        sortvalue,
        setsortvalue,
        isDarkMode,
        toggleDarkMode,
        numColumns,
        gridtoggle,
        numColumns,
        multitoggle,
        multi,
        setmultitoggle,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
