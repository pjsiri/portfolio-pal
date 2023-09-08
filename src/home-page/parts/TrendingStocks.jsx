import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./Parts.style";
import TrendingStockCard from "../cards/TrendingStockCard";
import useFetch from "../../../hook/useFetch";

const TrendingStocks = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("market-trends", {
    trend_type: "MOST_ACTIVE",
    country: "us",
    language: "en",
  });

  //console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trending Stocks</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Expand</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data.slice(0, 3)}
            renderItem={({ item }) => <TrendingStockCard item={item} />}
            keyExtractor={(item) => item?.google_mid}
            contentContainerStyle={{ columnGap: 20 }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default TrendingStocks;
