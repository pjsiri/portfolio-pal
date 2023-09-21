import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import styles from "./Overview.style";
import useFetch from "../../hook/useFetch";
import { useDarkMode } from "../common/darkmode/DarkModeContext";

const OverviewPage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();

  const { data, isLoading, error, refetch } = useFetch("stock-overview", {
    symbol: item.symbol,
    language: "en",
  });

  const containerStyle = [
    styles.appContainer,
    isDarkMode && styles.darkModeContainer,
  ];

  return (
    <SafeAreaView
      style={[styles.appContainer, isDarkMode && styles.darkModeContainer]}
    >
      {/*<View style={styles.headerContainer}></View>*/}

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={{ fontSize: 50 }}>{data.name}</Text>
          <Text>{data.symbol}</Text>
          <Text>${data.price}</Text>
          <View>
            <Text>{data.change}</Text>
            <Text>{data.change_percent}</Text>
          </View>
          <View>
            <View>
              <Text>Open: {data.open}</Text>
              <Text>High: {data.high}</Text>
              <Text>Low: {data.low}</Text>
            </View>
            <View>
              <Text>Mkt cap: {data.company_market_cap}</Text>
              <Text>P/E ratio: {data.company_pe_ratio}</Text>
              <Text>Div yield: {data.company_dividend_yield}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OverviewPage;
