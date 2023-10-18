import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

import styles from "./Browse.style";
import StockCard from "../../common/cards/StockCard";
import CryptoCard from "../../common/cards/CryptoCard";
import useFetch from "../../../hook/useFetch";
import { useDarkMode } from "../../common/darkmode/DarkModeContext";

// Define a functional component called BrowseStocks
const BrowseStocks = () => {
  // Initialize state variables for trendType and isStocks
  const [trendType, setTrendType] = useState("MOST_ACTIVE");
  const [isStocks, setIsStocks] = useState(true);
  // Access the navigation object from a custom hook (useNavigation)
  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();

  // Fetch data, loading state, and error from an API using a custom hook (useFetch)
  const { data, isLoading, error, refetch } = useFetch("market-trends", {
    trend_type: trendType,
  });

  // Define a function to toggle between stock and crypto trends
  const handleBrowseType = () => {
    // Update trendType and isStocks based on the current values
    setTrendType((prevTrendType) =>
      prevTrendType === "MOST_ACTIVE" ? "CRYPTO" : "MOST_ACTIVE"
    );
    setIsStocks(!isStocks);
  };

  // Trigger a data refetch when the component mounts
  useEffect(() => {
    refetch();
  }, []);

  // Trigger a data refetch when the isStocks state changes
  useEffect(() => {
    refetch();
  }, [isStocks]);

  const textStyles = {
    color: isDarkMode ? "white" : "black",
  };

  // Return the JSX for the BrowseStocks component
  return (
    <View style={styles.container}>
      {isStocks ? (
        // Display trending stocks section
        <View style={styles.header}>
          <Text style={{ ...styles.headerTitle, ...textStyles }}>
            Trending stocks
          </Text>
          <TouchableOpacity onPress={handleBrowseType}>
            <Text style={{ ...styles.headerBtn, ...textStyles }}>
              Browse cryptos
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Display trending cryptos section
        <View style={styles.header}>
          <Text style={{ ...styles.headerTitle, ...textStyles }}>
            Trending cryptos
          </Text>
          <TouchableOpacity onPress={handleBrowseType}>
            <Text style={{ ...styles.headerBtn, ...textStyles }}>
              Browse stocks
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={isDarkMode ? "white" : "black"}
          />
        ) : error ? (
          <Text style={textStyles}>Something went wrong</Text>
        ) : isStocks ? (
          // Display stock cards when isStocks is true
          data?.trends?.slice(0, 5).map((item) => (
            <StockCard
              item={item}
              key={`stock-browse${item?.google_mid}`}
              handleNavigate={() => {
                navigation.navigate("StockOverview", { item });
              }}
            />
          ))
        ) : (
          // Display crypto cards when isStocks is false
          data?.trends?.slice(0, 5).map((item) => (
            <CryptoCard
              item={item}
              key={`crypto-browse-${item?.google_mid}`}
              handleNavigate={() => {
                navigation.navigate("CryptoOverview", { item });
              }}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default BrowseStocks;
