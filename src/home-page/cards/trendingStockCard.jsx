import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

import styles from "./Cards.style";
import getLogo from "../../../hook/getLogo";

const TrendingStockCard = ({ item, selectedStock, handleCardPress }) => {
  const router = useRouter();
  const { data, isLoading, error } = getLogo(item.symbol);

  const isDataAvailable = data !== "";

  return (
    <TouchableOpacity
      style={styles.container(selectedStock, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedStock, item)}>
        {isDataAvailable && (
          <Image
            source={{ uri: data }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TrendingStockCard;
