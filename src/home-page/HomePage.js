import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import styles from "./HomePage.style";
import BrowseStocks from "./parts/BrowseStocks";

const HomePage = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.appLogo}
          source={require("../../assets/app_logo.png")}
        />
        <Text style={styles.appName}>PortfolioPal</Text>
        <TouchableOpacity>
          <Image
            style={styles.modeIcon}
            source={require("../../assets/dark-mode-icon.png")}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <Text style={styles.header}>Explore</Text>

          <BrowseStocks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
