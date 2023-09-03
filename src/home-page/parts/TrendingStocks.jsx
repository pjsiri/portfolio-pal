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

const TrendingStocks = () => {
  const router = useRouter();
  const isLoading = false;
  const error = false;

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
            data={[1, 2, 3, 4]}
            renderItem={({ item }) => <TrendingStockCard item={item} />}
            keyExtractor={(item) => item?.stock_id}
            contentContainerStyle={{ columnGap: 20 }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default TrendingStocks;
