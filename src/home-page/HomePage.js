import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import styles from "./HomePage.style";
import TrendingStocks from "./parts/TrendingStocks";
import NewestStocks from "./parts/NewestStocks";

const HomePage = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.appContainer}>
      <View>
        <Image
          style={styles.appLogo}
          source={require("../../assets/app_logo.png")}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>PortfolioPal</Text>

        <View style={styles.componentContainer}>
          <Text style={styles.subtitle}>Trending Stocks</Text>
          <View style={styles.trendingStocks}>
            <TrendingStocks />
          </View>
        </View>

        <View style={styles.componentContainer}>
          <Text style={styles.subtitle}>Newest Stocks</Text>
          <View style={styles.newestStocks}>
            <NewestStocks />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
