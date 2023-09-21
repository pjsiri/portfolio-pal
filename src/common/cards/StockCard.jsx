import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./Cards.style";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const uriExists = async (uri) => {
  try {
    const response = await fetch(uri, { method: "GET" });
    return response.ok;
  } catch (error) {
    return false;
  }
};

const StockCard = ({ item, handleNavigate, isBookedMarked }) => {
  let stockSymbol = item.symbol;
  let stockName = (item.name || "").split(" ");
  const [imageUri, setImageUri] = useState(null);
  const [isHeartFilled, setIsHeartFilled] = useState(isBookedMarked);

  const toggleBookmark = () => {
    setIsHeartFilled(prevState => !prevState);
  };

  if ((item.symbol || "").includes(":")) {
    const splittedSymbol = item.symbol.split(":");
    stockSymbol = splittedSymbol[0];
  }
  if (stockName.length > 0) {
    stockName = stockName[0];
  }

  useEffect(() => {
    async function checkUris() {
      const symbolUri = `https://api.twelvedata.com/logo/${stockSymbol}.com`;
      const nameUri = `https://api.twelvedata.com/logo/${stockName}.com`;

      const symbolExists = await uriExists(symbolUri);
      const nameExists = await uriExists(nameUri);

      if (symbolExists) {
        setImageUri(symbolUri);
      } else if (nameExists) {
        setImageUri(nameUri);
      } else {
        setImageUri(false);
      }
    }

    checkUris();
  }, [stockSymbol, stockName]);

  const bookmarkStock = async (name, symbol, price) => {
    const db = getFirestore();
    const stocksRef = collection(db, 'bookmarkedStocks');
  
    try {
      await addDoc(stocksRef, {
        name,
        symbol,
        price,
        timestamp: new Date(),
      });
      console.log('Stock bookmarked successfully!');
    } catch (error) {
      console.error('Error bookmarking stock:', error);
    }
  };
  
  const handleBookmark = () => {
    bookmarkStock(item.name, item.symbol, item.price); 
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require("../../../assets/no-logo.png")
          }
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.nameContainer}>
        <Text style={styles.stockName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.stockSymbol} numberOfLines={1}>
          {stockSymbol}
        </Text>
      </View>

      <View style={styles.priceOuterContainer}>
        <TouchableOpacity style={styles.heartContainer} onPress={() => { 
        toggleBookmark();
        handleBookmark();
        }}>
          <Image
            source={isHeartFilled ? require("../../../assets/heart.png") : require("../../../assets/heart_hollow.png")}
            resizeMode="contain"
            style={styles.heartImage}
          />
        </TouchableOpacity>
        <View style={styles.priceContainer}>
          <Text style={styles.stockPrice} numberOfLines={1}>
            ${item.price}&nbsp;{item.currency}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StockCard;
