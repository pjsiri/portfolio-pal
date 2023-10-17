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

  return (
    <SafeAreaView
      style={[styles.appContainer, isDarkMode && styles.darkModeContainer]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.headerContainer,
            isDarkMode && styles.darkModeContainer,
          ]}
        >
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
            // style={{
            //   width: 40,
            //   height: 40,
            //   marginTop: 10,
            //   marginRight: 10,
            //   tintColor: isDarkMode ? "white" : undefined,
            // }}
            // source={require("../../assets/heart_hollow.png")}
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
