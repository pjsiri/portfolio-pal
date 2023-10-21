import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./PortfolioStocks.style";
import StockCard from "../../common/cards/StockCard";
import CryptoCard from "../../common/cards/CryptoCard";
import useFetch from "../../../hook/useFetch";
import { useDarkMode } from "../../common/darkmode/DarkModeContext";

const PortfolioStocks = ({ investments }) => {
  const [trendType, setTrendType] = useState("MOST_ACTIVE");
  const [isStocks, setIsStocks] = useState(true);
  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();

  const { data, isLoading, error, refetch } = useFetch("market-trends", {
    trend_type: trendType,
  });

  useEffect(() => {
    refetch();
  }, []);

  //   useEffect(() => {
  //     refetch();
  //   }, [isStocks]);

  //   const handleBrowseType = () => {
  //     setTrendType((prevTrendType) =>
  //       prevTrendType === "MOST_ACTIVE" ? "CRYPTO" : "MOST_ACTIVE"
  //     );
  //     setIsStocks(!isStocks);
  //   };

  const textStyles = {
    color: isDarkMode ? "white" : "black",
  };

  return (
    <View style={styles.container}>
      {/* {isStocks ? (
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
      )} */}

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={isDarkMode ? "white" : "black"}
          />
        ) : error ? (
          <Text style={textStyles}>Something went wrong</Text>
        ) : isStocks ? (
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

export default PortfolioStocks;
