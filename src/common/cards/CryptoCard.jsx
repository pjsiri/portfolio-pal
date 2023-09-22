import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./Cards.style";

const uriExists = async (uri) => {
  try {
    const response = await fetch(uri, { method: "GET" });
    return response.ok;
  } catch (error) {
    return false;
  }
};

function formatNumber(num) {
  return (num || 0).toFixed(2);
}

const CryptoCard = ({ item, handleNavigate }) => {
  let cryptoSymbol = (item.from_symbol || "").toLowerCase();
  let cryptoName = (item.from_currency_name || "").split(" ");
  const [imageUri, setImageUri] = useState(null);

  if (cryptoName.length > 0) {
    cryptoName = cryptoName[0].toLowerCase();
  }

  useEffect(() => {
    async function checkUris() {
      const cryptoUri = `https://cryptologos.cc/logos/${cryptoName}-${cryptoSymbol}-logo.png?v=026`;

      const symbolExists = await uriExists(cryptoUri);

      if (symbolExists) {
        setImageUri(cryptoUri);
      } else {
        setImageUri(false);
      }
    }

    checkUris();
  }, [cryptoSymbol, cryptoName]);

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
          {item.from_currency_name}
        </Text>
        <Text style={styles.stockSymbol} numberOfLines={1}>
          {item.from_symbol}
        </Text>
      </View>

      <View style={styles.priceOuterContainer}>
        <TouchableOpacity style={styles.heartContainer}>
          <Image
            source={require("../../../assets/heart_hollow.png")}
            resizeMode="contain"
            style={styles.heartImage}
          />
        </TouchableOpacity>
        <View style={styles.priceContainer}>
          <Text style={styles.stockPrice} numberOfLines={1}>
            ${formatNumber(item.exchange_rate)}&nbsp;{item.to_symbol}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CryptoCard;
