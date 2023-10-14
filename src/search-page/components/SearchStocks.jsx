import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

import styles from "./Search.style";
import StockCard from "../../common/cards/StockCard";
import CryptoCard from "../../common/cards/CryptoCard";
import useFetch from "../../../hook/useFetch";

const SearchStocks = ({
  inputQuery,
  currency,
  priceOption,
  stockSelected,
  setStockSelected,
  sortType,
  ascendOrder,
}) => {
  const navigation = useNavigation();
  const { data, isLoading, error, refetch } = useFetch("search", {
    query: inputQuery,
    language: "en",
  });

  const filterStockData = (data) => {
    let filteredData = [...data];

    if (currency !== "") {
      filteredData = filteredData.filter((item) => item.currency === currency);
    }

    if (priceOption !== "0") {
      filteredData = filteredData.filter((item) => {
        switch (priceOption) {
          case "1":
            return item.price <= 50;
          case "2":
            return item.price >= 50 && item.price <= 100;
          case "3":
            return item.price >= 100 && item.price <= 200;
          case "4":
            return item.price >= 200 && item.price <= 400;
          case "5":
            return item.price >= 400 && item.price <= 800;
          case "6":
            return item.price >= 800;
          default:
            return true;
        }
      });
    }

    if (sortType === 1) {
      filteredData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 2) {
      filteredData.sort((a, b) => a.price - b.price);
    }

    if (sortType !== 0 && !ascendOrder) {
      filteredData.reverse(); // Reverse the order to make it descending
    }

    return filteredData;
  };

  const filterCryptoData = (data) => {
    let filteredData = [...data];
    let excludedSymbols = [
      "AUD",
      "CAD",
      "EUR",
      "GBP",
      "GBX",
      "HKD",
      "INR",
      "MXN",
      "NZD",
      "THB",
      "USD",
    ];

    filteredData = filteredData.filter(
      (item) => !excludedSymbols.includes(item.from_symbol)
    );

    if (currency !== "") {
      filteredData = filteredData.filter((item) => item.to_symbol === currency);
    }

    if (priceOption !== "0") {
      filteredData = filteredData.filter((item) => {
        switch (priceOption) {
          case "1":
            return item.exchange_rate <= 50;
          case "2":
            return item.exchange_rate >= 50 && item.exchange_rate <= 100;
          case "3":
            return item.exchange_rate >= 100 && item.exchange_rate <= 200;
          case "4":
            return item.exchange_rate >= 200 && item.exchange_rate <= 400;
          case "5":
            return item.exchange_rate >= 400 && item.exchange_rate <= 800;
          case "6":
            return item.exchange_rate >= 800;
          default:
            return true;
        }
      });
    }

    if (sortType === 1) {
      filteredData.sort((a, b) => a.from_symbol.localeCompare(b.from_symbol));
    } else if (sortType === 2) {
      filteredData.sort((a, b) => a.exchange_rate - b.exchange_rate);
    }

    if (sortType !== 0 && !ascendOrder) {
      filteredData.reverse(); // Reverse the order to make it descending
    }

    return filteredData;
  };

  const filteredStockData = filterStockData(data?.stock || []);
  const filteredCryptoData = filterCryptoData(data?.currency || []);
  const stockItems = filteredStockData?.slice(0, 5);
  const cryptoItems = filteredCryptoData?.slice(0, 5);

  const handleBrowseType = () => {
    setStockSelected(!stockSelected);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [inputQuery, stockSelected]);

  return (
    <View style={styles.container}>
      {stockSelected ? (
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
        ) : stockSelected ? (
          filteredStockData?.length === 0 ? (
            <View style={styles.notFoundContainer}>
              <Image
                style={styles.notFoundIcon}
                source={require("../../../assets/not-found-icon.png")}
              />
              <Text>No Results Found</Text>
            </View>
          ) : (
            stockItems.map((item) => (
              <StockCard
                item={item}
                key={`browse-stock-${item?.google_mid}`}
                handleNavigate={() =>
                  navigation.navigate("StockOverview", { item })
                }
              />
            ))
          )
        ) : filteredCryptoData?.length === 0 ? (
          <View style={styles.notFoundContainer}>
            <Image
              style={styles.notFoundIcon}
              source={require("../../../assets/not-found-icon.png")}
            />
            <Text>No Results Found</Text>
          </View>
        ) : (
          cryptoItems.map((item) => (
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
