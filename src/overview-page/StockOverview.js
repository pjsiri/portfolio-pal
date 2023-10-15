import React, { useState, useEffect } from "react";
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

const uriExists = async (uri) => {
  try {
    const response = await fetch(uri, { method: "GET" });
    return response.ok;
  } catch (error) {
    return false;
  }
};

function formatNumber(num) {
  return (num || 0).toFixed(2);
}

function formatNumberToBillion(num) {
  if (Math.abs(num) >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  } else if (Math.abs(num) >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  } else {
    return num.toFixed(2);
  }
}

const StockOverview = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  let stockSymbol = item.symbol;
  let stockName = (item.name || "").split(" ");

  if ((item.symbol || "").includes(":")) {
    const splittedSymbol = item.symbol.split(":");
    stockSymbol = splittedSymbol[0];
  }
  if (stockName.length > 0) {
    stockName = stockName[0];
  }

  useEffect(() => {
    async function checkUris() {
      const symbolUri = `https://api.twelvedata.com/logo/${stockSymbol}.com`;
      const nameUri = `https://api.twelvedata.com/logo/${stockName}.com`;

      const symbolExists = await uriExists(symbolUri);
      const nameExists = await uriExists(nameUri);

      if (symbolExists) {
        setImageUri(symbolUri);
      } else if (nameExists) {
        setImageUri(nameUri);
      } else {
        setImageUri(false);
      }
    }

    checkUris();
  }, [stockSymbol, stockName]);

  const { data, isLoading, error, refetch } = useFetch("stock-overview", {
    symbol: item.symbol,
    language: "en",
  });

  const containerStyle = [
    styles.appContainer,
    isDarkMode && { backgroundColor: "#333" },
  ];

  const textColor = isDarkMode ? { color: "white" } : {};

  return (
    <SafeAreaView style={containerStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.backButton,
            isDarkMode && { backgroundColor: '#404040' }, // Change background color in dark mode
          ]}
        >
          <Image
            source={{
              uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/back.png",
            }}
            style={styles.inputIcon}
          />
          <Text style={{ ...styles.backButtonText, ...textColor }}>Back</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={{ fontSize: 25, fontWeight: "bold", ...textColor }}>
              {data.name}
            </Text>
            <Text style={{ fontSize: 15, ...textColor }}>({data.symbol})</Text>
            <Text style={{ fontSize: 60, fontWeight: "bold", ...textColor }}>
              ${formatNumber(data.price)}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", ...textColor }}>
                ${formatNumber(data.change)}&nbsp;
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", ...textColor }}>
                ({formatNumber(data.change_percent)}%)
              </Text>
            </View>
          </View>

          <View style={styles.graphContainer}>
            <Text style={{ ...textColor }}>Stock chart work in progress</Text>
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
            <Text style={textColor}>Add to watchlist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buyContainer}>
            <Text style={{ ...styles.buySellText, ...textColor }}>Buy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sellContainer}>
            <Text style={{ ...styles.buySellText, ...textColor }}>Sell</Text>
          </TouchableOpacity>

          <View style={styles.detailContainer}>
            <View style={styles.priceDetailContainer}>
              <Text>
                Open:{" "}
                <Text style={{ fontWeight: "bold", ...textColor }}>
                  ${formatNumber(data.open)}
                </Text>
              </Text>
              <Text>
                High:{" "}
                <Text style={{ fontWeight: "bold", ...textColor }}>
                  ${formatNumber(data.high)}
                </Text>
              </Text>
              <Text>
                Low:{" "}
                <Text style={{ fontWeight: "bold", ...textColor }}>
                  ${formatNumber(data.low)}
                </Text>
              </Text>
            </View>

            <View style={styles.priceDetailContainer}>
              <Text>
                Mkt cap:{" "}
                <Text style={{ fontWeight: "bold", ...textColor }}>
                  ${formatNumberToBillion(data.company_market_cap || 0)}
                </Text>
              </Text>
              <Text>
                P/E ratio:{" "}
                <Text style={{ fontWeight: "bold", ...textColor }}>
                  {formatNumber(data.company_pe_ratio)}
                </Text>
              </Text>
              <Text>
                Div yield:{" "}
                <Text style={{ fontWeight: "bold", ...textColor }}>
                  {formatNumber(data.company_dividend_yield)}%
                </Text>
              </Text>
            </View>
          </View>
          <Text style={textColor}>All prices {data.currency || "CNY"}.</Text>
          <Image
            source={
              imageUri ? { uri: imageUri } : require("../../assets/no-logo.png")
            }
            resizeMode="contain"
            style={styles.logoImage}
          />
          <Text style={{ ...styles.aboutText, ...textColor }}>{data.about}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StockOverview;