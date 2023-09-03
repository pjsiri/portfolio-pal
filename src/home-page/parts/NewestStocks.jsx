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
import NewestStockCard from "../cards/NewestStockCard";

const NewestStocks = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Newest Stocks</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Expand</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewestStocks;
