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

  const [isHeartFilled, setIsHeartFilled] = useState(false);

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              {data.name}
            </Text>
            <Text style={{ fontSize: 15 }}>({data.symbol})</Text>
            <Text style={{ fontSize: 60, fontWeight: "bold" }}>
              ${data.price}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                ${data.change}&nbsp;
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                ({data.change_percent}%)
              </Text>
            </View>
          </View>

          <View style={styles.graphContainer}>
            <Text>Stock chart work in progress</Text>
          </View>

          <TouchableOpacity style={styles.bookmarkContainer}>
            <Image
              source={
                isHeartFilled
                  ? require("../../assets/heart.png")
                  : require("../../assets/heart_hollow.png")
              }
              resizeMode="contain"
              style={styles.heartImage}
            />
            <Text>Add to watchlist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buyContainer}>
            <Text style={styles.buySellText}>Buy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sellContainer}>
            <Text style={styles.buySellText}>Sell</Text>
          </TouchableOpacity>

          <View style={styles.detailContainer}>
            <View style={styles.priceDetailContainer}>
              <Text>
                Open: <Text style={{ fontWeight: "bold" }}>${data.open}</Text>
              </Text>
              <Text>
                High: <Text style={{ fontWeight: "bold" }}>${data.high}</Text>
              </Text>
              <Text>
                Low: <Text style={{ fontWeight: "bold" }}>${data.low}</Text>
              </Text>
            </View>

            <View style={styles.priceDetailContainer}>
              <Text>
                Mkt cap:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  ${data.company_market_cap}
                </Text>
              </Text>
              <Text>
                P/E ratio:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {data.company_pe_ratio}
                </Text>
              </Text>
              <Text>
                Div yield:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {data.company_dividend_yield}%
                </Text>
              </Text>
            </View>
          </View>
          <Image
            source={{ uri: "https://api.twelvedata.com/logo/tesla.com" }}
            resizeMode="contain"
            style={styles.logoImage}
          />
          <Text style={styles.aboutText}>{data.about}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OverviewPage;
