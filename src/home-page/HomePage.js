import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./HomePage.style";
import BrowseStocks from "./components/BrowseStocks";
import { useDarkMode } from "../common/darkmode/DarkModeContext";

const HomePage = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleNavigateToBookmarks = () => {
    navigation.navigate("BookmarkPage");
  };

  const containerStyle = [
    styles.appContainer,
    isDarkMode && styles.darkModeContainer,
  ];

  return (
    <SafeAreaView
      style={[styles.appContainer, isDarkMode && styles.darkModeContainer]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.appLogo}
            source={require("../../assets/app_logo.png")}
          />
          <Text style={[styles.appName, isDarkMode && styles.darkModeText]}>
            PortfolioPal
          </Text>
        </View>

        <TouchableOpacity
          style={styles.bookmarkContainer}
          onPress={handleNavigateToBookmarks}
        >
          <Text style={styles.bookmarkText}>View Watch List</Text>
          <Image
            style={styles.bookmarkIcon}
            source={require("../../assets/heart.png")}
          />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          {/* <Text style={[styles.header, isDarkMode && styles.darkModeText]}>
            Explore
          </Text> */}

          <BrowseStocks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
