import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Cards.style";
import { useDarkMode } from "../../common/darkmode/DarkModeContext";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const uriExists = async (uri) => {
  try {
    const response = await fetch(uri, { method: "GET" });
    return response.ok;
  } catch ( error) {
    return false;
  }
}

function formatNumber(num) {
  return (num || 0).toFixed(2);
}

const CryptoCard = ({ item, handleNavigate, isBookedMarked }) => {
  let cryptoSymbol = (item.from_symbol || "").toLowerCase();
  let cryptoName = (item.from_currency_name || "").split(" ");
  const [isBookmarked, setIsBookmarked] = useState(isBookedMarked);
  const [imageUri, setImageUri] = useState(null);

  if (cryptoName.length > 0) {
    cryptoName = cryptoName[0].toLowerCase();
  }

  const auth = getAuth();
  const user = auth.currentUser;

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

  useEffect(() => {
    async function checkBookmarkStatus() {
      if (user) {
        const db = getFirestore();
        const stocksRef = collection(db, "bookmarkedCryptos");
        const q = query(
          stocksRef,
          where("symbol", "==", cryptoSymbol),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        setIsBookmarked(querySnapshot.size > 0);
      }
    }

    checkBookmarkStatus();
  }, [user, cryptoSymbol]);

  const toggleBookmark = async () => {
    if (user) {
      const db = getFirestore();
      const stocksRef = collection(db, "bookmarkedCryptos");
      const q = query(
        stocksRef,
        where("symbol", "==", cryptoSymbol),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      console.log("Crypto bookmark removed!");
      setIsBookmarked(false);
    }
  };

  const handleBookmark = async () => {
    if (user) {
      const db = getFirestore();
      const stocksRef = collection(db, "bookmarkedCryptos");
      try {
        await addDoc(stocksRef, {
          name: item.from_currency_name,
          symbol: cryptoSymbol,
          price: item.exchange_rate,
          timestamp: new Date(),
          userId: user.uid,
          type: "crypto",
        });
        console.log("Crypto bookmarked successfully!");
        setIsBookmarked(true);
      } catch (error) {
        console.error("Error bookmarking crypto:", error);
      }
    }
  };

  // Get the dark mode state
  const { isDarkMode } = useDarkMode();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        // Conditionally set background and text color based on dark mode state
        {
          backgroundColor: isDarkMode ? "#5a5a5a" : "#FFF",
        }
      ]}
      onPress={handleNavigate}
    >
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
        <Text
          style={[
            styles.stockName,
            // Conditionally set text color based on dark mode state
            {
              color: isDarkMode ? "white" : "black",
            }
          ]}
          numberOfLines={1}
        >
          {item.from_currency_name}
        </Text>
        <Text
          style={[
            styles.stockSymbol,
            // Conditionally set text color based on dark mode state
            {
              color: isDarkMode ? "white" : "black",
            }
          ]}
          numberOfLines={1}
        >
          {item.from_symbol}
        </Text>
      </View>

      <View style={styles.priceOuterContainer}>
        <TouchableOpacity
          style={styles.heartContainer}
          onPress={isBookmarked ? toggleBookmark : handleBookmark}
        >
          <Image
            source={
              isBookmarked
                ? require("../../../assets/heart.png")
                : require("../../../assets/heart_hollow.png")
            }
            resizeMode="contain"
            style={styles.heartImage}
          />
        </TouchableOpacity>
        <View style={styles.priceContainer}>
          <Text
            style={[
              styles.stockPrice,
              // Conditionally set text color based on dark mode state
              {
                color: isDarkMode ? "white" : "black",
              }
            ]}
            numberOfLines={1}
          >
            ${formatNumber(item.exchange_rate)}&nbsp;{item.to_symbol}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CryptoCard;