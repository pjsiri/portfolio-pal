import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import styles from "./HomePage.style";
import BrowseStocks from "./components/BrowseStocks";
import { useDarkMode } from "../DarkModeContext";

const HomePage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); 

  const containerStyle = [
    styles.appContainer,
    isDarkMode && styles.darkModeContainer,
  ];

  return (
    <SafeAreaView
      style={[styles.appContainer, isDarkMode && styles.darkModeContainer]}
    >
      <View style={styles.headerContainer}>
        <Image
          style={styles.appLogo}
          source={require("../../assets/app_logo.png")}
        />
        <Text style={[styles.appName, isDarkMode && styles.darkModeText]}>
          PortfolioPal
        </Text>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Image
            style={styles.modeIcon}
            source={require("../../assets/dark-mode-icon.png")}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.header, isDarkMode && styles.darkModeText]}>
            Explore
          </Text>

          <BrowseStocks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
