import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Overview.style";
import useFetch from "../../hook/useFetch";
import { useDarkMode } from "../common/darkmode/DarkModeContext";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import QuantityInput from "./QuantityInput";
import { fakeBuyStock, fakeSellStock } from './stockActions';

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

function formatNumberToBillion(num) {
  if (Math.abs(num) >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  } else if (Math.abs(num) >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  } else {
    return num.toFixed(2);
  }
}

const StockOverview = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [quantity, setQuantity] = useState(0);
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const firestore = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;

  let stockSymbol = item.symbol;
  let stockName = (item.name || "").split(" ");

  if ((item.symbol || "").includes(":")) {
    const splittedSymbol = item.symbol.split(":");
    stockSymbol = splittedSymbol[0];
  }
  if (stockName.length > 0) {
    stockName = stockName[0];
  }

  const bookmarkStock = async (name, symbol, price) => {
    const db = getFirestore();
    const stocksRef = collection(db, "bookmarkedStocks");

    try {
      await addDoc(stocksRef, {
        name,
        symbol,
        price,
        timestamp: new Date(),
        userId: user.uid,
        type: "stock",
      });
      console.log("Stock bookmarked successfully!");
      setIsHeartFilled(true);
    } catch (error) {
      console.error("Error bookmarking stock:", error);
    }
  };

  const handleDelete = async (symbol) => {
    try {
      const db = getFirestore();
      const stocksRef = collection(db, "bookmarkedStocks");
      const q = query(
        stocksRef,
        where("symbol", "==", symbol),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      console.log("Stock bookmark removed!");
      setIsHeartFilled(false);
    } catch (error) {
      console.error("Error deleting bookmarked stock:", error);
    }
  };

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

    // Function to check if a stock is bookmarked
    const isStockBookmarked = async () => {
      try {
        const stocksRef = collection(firestore, "bookmarkedStocks");
        const q = query(stocksRef, where("userId", "==", userId), where("symbol", "==", item.symbol));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setIsHeartFilled(true);
        }
      } catch (error) {
        console.error("Error checking if stock is bookmarked:", error);
      }
    };

    isStockBookmarked(); // Call the function

    checkUris();
  }, [stockSymbol, stockName]);

  const handleBookmarkInOverview = () => {
    bookmarkStock(item.name, item.symbol, item.price);
  };

  const { data, isLoading, error, refetch } = useFetch("stock-overview", {
    symbol: item.symbol,
    language: "en",
  });

  const handleBuy = async () => {
    const success = await fakeBuyStock(userId, stockSymbol, quantity, data.price);
    
    if (success) {
      console.log('Buy successful!');
    } else {
      // Handle error
      console.log('Error buying stock');
    }
  };

  const handleSell = async () => {
    const success = await fakeSellStock(userId, stockSymbol, quantity, data.price);
    if (success) {
      console.log('Sell successful!');
    } else {
      // Handle error
      console.log('Error selling stock');
    }
  };

  const containerStyle = [
    styles.appContainer,
    isDarkMode && { backgroundColor: "#333" },
  ];

  const textColor = isDarkMode ? { color: "white" } : {};

  return (
    <SafeAreaView style={containerStyle}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.backButton,
            isDarkMode && { backgroundColor: '#404040' }, // Change background color in dark mode
          ]}
        >
          <Image
            source={{
              uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/back.png",
            }}
            style={styles.inputIcon}
          />
          <Text style={{ ...styles.backButtonText, ...textColor }}>Back</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={{ fontSize: 25, fontWeight: "bold", ...textColor }}>
              {data.name}
            </Text>
            <Text style={{ fontSize: 15, ...textColor }}>({data.symbol})</Text>
            <Text style={{ fontSize: 60, fontWeight: "bold", ...textColor }}>
              ${formatNumber(data.price)}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", ...textColor }}>
                ${formatNumber(data.change)}&nbsp;
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", ...textColor }}>
                ({formatNumber(data.change_percent)}%)
              </Text>
            </View>
          </View>

          <View style={styles.graphContainer}>
            <Text style={{ ...textColor }}>Stock chart work in progress</Text>
          </View>
          <TouchableOpacity
            style={styles.bookmarkContainer}
            onPress={() => {
              if (isHeartFilled) {
                handleDelete(item.symbol); // Delete only if it's heart-filled
              } else {
                handleBookmarkInOverview(); // Add to watchlist if it's not heart-filled
              }
            }}
          >
            <Image
              source={
                isHeartFilled
                  ? require("../../assets/heart.png")
                  : require("../../assets/heart_hollow.png")
              }
              resizeMode="contain"
              style={styles.heartImage}
            />
            <Text style={textColor}>Add to watchlist</Text>
          </TouchableOpacity>
          <QuantityInput quantity={quantity} setQuantity={setQuantity} />
          <TouchableOpacity onPress={handleBuy} style={styles.buyContainer}>
            <Text style={{ ...styles.buySellText, ...textColor }}>Buy</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSell} style={styles.sellContainer}>
            <Text style={{ ...styles.buySellText, ...textColor }}>Sell</Text>
          </TouchableOpacity>

          <View style={styles.detailContainer}>
            <View style={styles.priceDetailContainer}>
              <Text>
                Open:{" "}
                <Text style={{ fontWeight: "bold", ...textColor }}>
                  ${formatNumber(data.open)}
                </Text>
              </Text>
              <Text>
                High:{" "}
                <Text style={{ fontWeight: "bold", ...textColor }}>
                  ${formatNumber(data.high)}
                </Text>
              </Text>
              <Text>
                Low:{" "}
                <Text style={{ fontWeight: "bold", ...textColor }}>
                  ${formatNumber(data.low)}
                </Text>
              </Text>
            </View>

            <View style={styles.priceDetailContainer}>
              <Text>
                Mkt cap:{" "}
                <Text style={{ fontWeight: "bold", ...textColor }}>
                  ${formatNumberToBillion(data.company_market_cap || 0)}
                </Text>
              </Text>
              <Text>
                P/E ratio:{" "}
                <Text style={{ fontWeight: "bold", ...textColor }}>
                  {formatNumber(data.company_pe_ratio)}
                </Text>
              </Text>
              <Text>
                Div yield:{" "}
                <Text style={{ fontWeight: "bold", ...textColor }}>
                  {formatNumber(data.company_dividend_yield)}%
                </Text>
              </Text>
            </View>
          </View>
          <Text style={textColor}>All prices {data.currency || "CNY"}.</Text>
          <Image
            source={
              imageUri ? { uri: imageUri } : require("../../assets/no-logo.png")
            }
            resizeMode="contain"
            style={styles.logoImage}
          />
          <Text style={{ ...styles.aboutText, ...textColor }}>{data.about}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StockOverview;