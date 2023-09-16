import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./Browse.style";
import StockCard from "../../common/cards/StockCard";
import CryptoCard from "../../common/cards/CryptoCard";
import useFetch from "../../../hook/useFetch";

const BrowseStocks = () => {
  const router = useRouter();
  const [trendType, setTrendType] = useState("MOST_ACTIVE");
  const [isStocks, setIsStocks] = useState(true);

  const { data, isLoading, error, refetch } = useFetch("market-trends", {
    trend_type: trendType,
    country: "us",
    language: "en",
  });

  const handleBrowseType = () => {
    setTrendType((prevTrendType) =>
      prevTrendType === "MOST_ACTIVE" ? "CRYPTO" : "MOST_ACTIVE"
    );
    setIsStocks(!isStocks);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [isStocks]);

  return (
    <View style={styles.container}>
      {isStocks ? (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Browse stocks</Text>
          <TouchableOpacity onPress={handleBrowseType}>
            <Text style={styles.headerBtn}>Browse cryptos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Browse cryptos</Text>
          <TouchableOpacity onPress={handleBrowseType}>
            <Text style={styles.headerBtn}>Browse stocks</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : isStocks ? (
          data?.trends
            ?.slice(0, 5)
            .map((item) => (
              <StockCard
                item={item}
                key={`browse-stock-${item?.google_mid}`}
                handleNavigate={() =>
                  router.push(`/browse-stocks${item?.google_mid}`)
                }
              />
            ))
        ) : (
          data?.trends
            ?.slice(0, 5)
            .map((item) => (
              <CryptoCard
                item={item}
                key={`browse-crypto-${item?.google_mid}`}
                handleNavigate={() =>
                  router.push(`/browse-cryptos${item?.google_mid}`)
                }
              />
            ))
        )}
      </View>
    </View>
  );
};

export default BrowseStocks;
