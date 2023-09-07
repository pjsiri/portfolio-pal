import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./Cards.style";

const TrendingStockCard = ({ item, selectedStock, handleCardPress }) => {
  return (
    <TouchableOpacity onPress={() => handleCardPress(item)}>
      <TouchableOpacity>
        <Image />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TrendingStockCard;
