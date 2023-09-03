import React, { useState } from "react";
import { Text, View, ScrollView, Image, SafeAreaView } from "react-native";
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
        <View style={{ flex: 1 }}>
          <Text style={styles.header}>PortfolioPal</Text>

          <TrendingStocks />
          <NewestStocks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
