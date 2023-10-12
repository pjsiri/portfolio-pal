import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

import styles from "./Search.style";
import StockCard from "../../common/cards/StockCard";
import CryptoCard from "../../common/cards/CryptoCard";
import useFetch from "../../../hook/useFetch";

const SearchStocks = ({ inputQuery, currency, priceOption, stockSelected }) => {
  const router = useRouter();
  const [isStocks, setIsStocks] = useState(true);
  const { data, isLoading, error, refetch } = useFetch("search", {
    query: inputQuery,
    language: "en",
  });
  const navigation = useNavigation();

  const handleBrowseType = () => {
    setIsStocks(!isStocks);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [isStocks, inputQuery]);

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
          data?.stock?.length === 0 ? (
            <Text>No stock data available</Text>
          ) : (
            data?.stock
              //?.filter((item) => item.price >= 100)
              ?.slice(0, 5)
              .map((item) => (
                <StockCard
                  item={item}
                  key={`browse-stock-${item?.google_mid}`}
                  handleNavigate={() =>
                    navigation.navigate("StockOverview", { item })
                  }
                />
              ))
          )
        ) : data?.currency?.length === 0 ? (
          <Text>No crypto data available</Text>
        ) : (
          data?.currency?.slice(0, 5).map((item) => (
            <CryptoCard
              item={item}
              key={`browse-crypto-${item?.google_mid}`}
              //handleNavigate={() => navigation.navigate("Overview", { item })}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default SearchStocks;
