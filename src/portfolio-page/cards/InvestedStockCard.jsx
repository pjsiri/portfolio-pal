import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Cards.style";
import { useDarkMode } from "../../common/darkmode/DarkModeContext";

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

const InvestedStockCard = ({ item }) => {
  const navigation = useNavigation();
  let stockSymbol = item.symbol;
  let stockName = (item.name || "").split(" ");
  const [imageUri, setImageUri] = useState(null);

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

  // Get the dark mode state
  const { isDarkMode } = useDarkMode();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        // Conditionally set background and text color based on dark mode state
        {
          backgroundColor: isDarkMode ? "#5a5a5a" : "#FFF",
        },
      ]}
      onPress={() => {
        navigation.navigate("StockOverview", { item });
      }}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require("../../../assets/no-logo.png")
          }
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.nameContainer}>
        <Text
          style={[
            styles.stockName,
            // Conditionally set text color based on dark mode state
            {
              color: isDarkMode ? "white" : "black",
            },
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text
          style={[
            styles.stockSymbol,
            // Conditionally set text color based on dark mode state
            {
              color: isDarkMode ? "white" : "black",
            },
          ]}
          numberOfLines={1}
        >
          {stockSymbol}
        </Text>
      </View>

      <View style={styles.priceOuterContainer}>
        <View style={styles.priceContainer}>
          <Text
            style={[
              styles.stockPrice,
              // Conditionally set text color based on dark mode state
              {
                color: isDarkMode ? "white" : "black",
              },
            ]}
            numberOfLines={1}
          >
            {item.quantity}&nbsp;shares
          </Text>
          <Text
            style={[
              styles.stockPrice,
              // Conditionally set text color based on dark mode state
              {
                color: isDarkMode ? "white" : "black",
              },
            ]}
            numberOfLines={1}
          >
            ${formatNumber(item.totalPrice)}&nbsp;{item.currency || "USD"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InvestedStockCard;
