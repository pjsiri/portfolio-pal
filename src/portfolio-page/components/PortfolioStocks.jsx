import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./PortfolioStocks.style";
import InvestedStockCard from "../cards/InvestedStockCard";
import { useDarkMode } from "../../common/darkmode/DarkModeContext";

const PortfolioStocks = ({ investments }) => {
  const { isDarkMode } = useDarkMode();

  const textStyles = {
    color: isDarkMode ? "white" : "black",
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {investments.map((item) => (
          <InvestedStockCard
            item={item}
            key={`invested-stock${item?.google_mid}`}
          />
        ))}
      </View>
    </View>
  );
};

export default PortfolioStocks;
