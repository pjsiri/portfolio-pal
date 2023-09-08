import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

import styles from "./Cards.style";
import getLogo from "../../../hook/getLogo";

const TrendingStockCard = ({ item, selectedStock, handleCardPress }) => {
  const router = useRouter();
  let simpleSymbol = item.symbol;

  if (item.symbol.includes(":")) {
    const splittedSymbol = item.symbol.split(":");
    simpleSymbol = splittedSymbol[0];
  }

  const { data, isLoading, error } = getLogo(simpleSymbol);

  const isDataAvailable = data !== "";

  return (
    <TouchableOpacity
      style={styles.container(selectedStock, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedStock, item)}>
        {isDataAvailable ? (
          <Image
            source={{ uri: data }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        ) : (
          <Image
            source={require("../../../assets/no-logo.png")}
            resizeMode="contain"
            style={styles.logoImage}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.companySymbol} numberOfLines={1}>
        &nbsp;{simpleSymbol}
      </Text>
      <Text style={styles.companyPrice} numberOfLines={1}>
        ${item.price}&nbsp;{item.currency}
      </Text>
    </TouchableOpacity>
  );
};

export default TrendingStockCard;
