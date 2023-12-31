import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import styles from "./Overview.style";
import useFetch from "../../hook/useFetch";
import { useDarkMode } from "../common/darkmode/DarkModeContext";
import {
  getFirestore,
  collection,
  setDoc,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import StockChart from "./components/StockChart";
import QuantityInputWithConfirmation from "./components/QuantityInputWithConfirmation";
import { fakeBuyStock, fakeSellStock } from "./components/stockActions";

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
  const [period, setPeriod] = useState("1D");
  const [isQuantityModalVisible, setIsQuantityModalVisible] = useState(false);
  const [isBuying, setIsBuying] = useState(true);
  const [balance, setBalance] = useState(50000);
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

  const fetchUserBalance = async (userId) => {
    try {
      const userDocRef = doc(firestore, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const userBalance = userData.balance;

        if (userBalance === undefined) {
          await setDoc(userDocRef, { balance: 50000 }, { merge: true });
          setBalance(50000);
        } else {
          setBalance(userBalance);
        }
      } else {
        await setDoc(userDocRef, { balance: 50000 }, { merge: true });
        setBalance(50000);
      }
    } catch (error) {
      console.error("Error fetching user balance:", error);
    }
  };

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
        const q = query(
          stocksRef,
          where("userId", "==", userId),
          where("symbol", "==", item.symbol)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setIsHeartFilled(true);
        }
      } catch (error) {
        console.error("Error checking if stock is bookmarked:", error);
      }
    };

    isStockBookmarked(); // Call the function
    fetchUserBalance(userId);
    checkUris();
  }, [stockSymbol, stockName]);

  const handleBookmarkInOverview = () => {
    bookmarkStock(item.name, item.symbol, data.price);
  };

  const { data, isLoading, error, refetch } = useFetch("stock-overview", {
    symbol: item.symbol,
    language: "en",
  });

  const handleBuy = () => {
    setIsBuying(true);
    setIsQuantityModalVisible(true);
  };

  const handleSell = () => {
    setIsBuying(false);
    setIsQuantityModalVisible(true);
  };

  const handleConfirmQuantity = async (quantity) => {
    setIsQuantityModalVisible(false);

    const defaultGoogleMid = 'DEFAULT_VALUE'; 

    if (!item.google_mid) {
      item.google_mid = defaultGoogleMid;
    }
    
    if (quantity > 0) {
      if (isBuying) {
        const success = await fakeBuyStock(
          userId,
          stockSymbol,
          quantity,
          data.price,
          item.google_mid,
          item.name,
          item.currency,
          true
        );

        if (success) {
          const totalPrice = quantity * data.price;
          const newBalance = balance - totalPrice;
          setBalance(newBalance);
          console.log("Buy successful!");
          Alert.alert(
            "Buy Successful",
            `You have successfully bought ${quantity} shares of ${stockSymbol} for a total of $${totalPrice.toFixed(
              2
            )}.`
          );
          // Update the user's balance in Firestore
          const userDocRef = doc(firestore, "users", userId);
          await updateDoc(userDocRef, {
            balance: newBalance,
          });
        } else {
          // Handle error
          console.log("Error buying stock");
        }
      } else {
        //Selling
        // Check if the user has this stock in their portfolio
        const hasStockInPortfolio = await fakeSellStock(
          userId,
          stockSymbol,
          quantity,
          data.price
        );

        if (hasStockInPortfolio) {
          const totalPrice = quantity * data.price;
          const newBalance = balance + totalPrice;
          setBalance(newBalance);
          console.log("Sell successful!");
          Alert.alert(
            "Sell Successful",
            `You have successfully sold ${quantity} shares of ${stockSymbol} for a total of $${totalPrice.toFixed(
              2
            )}.`
          );
          // Update the user's balance in Firestore
          const userDocRef = doc(firestore, "users", userId);
          await updateDoc(userDocRef, {
            balance: newBalance,
          });
        } else {
          // Display error message for insufficient quantity or not owning the stock
          Alert.alert(
            "Unable to Sell",
            "You either do not own this stock or do not have enough quantity to sell."
          );
        }
      }
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
            isDarkMode && { backgroundColor: "#404040" }, // Change background color in dark mode
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

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <View style={styles.container}>
            <View style={styles.container}>
              <Text style={{ fontSize: 25, fontWeight: "bold", ...textColor }}>
                {data.name}
              </Text>
              <Text style={{ fontSize: 15, ...textColor }}>
                ({data.symbol})
              </Text>
              <Text style={{ fontSize: 60, fontWeight: "bold", ...textColor }}>
                ${formatNumber(data.price)}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", ...textColor }}
                >
                  ${formatNumber(data.change)}&nbsp;
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", ...textColor }}
                >
                  ({formatNumber(data.change_percent)}%)
                </Text>
              </View>
            </View>

            <View style={styles.graphContainer}>
              <StockChart
                endpoint={"stock-time-series"}
                query={{ symbol: item.symbol, period: period }}
              />
              <View style={styles.graphButtonsContainer}>
                <TouchableOpacity
                  style={styles.graphButton(period === "1D")}
                  onPress={() => setPeriod("1D")}
                >
                  <Text style={styles.graphButtonText(period === "1D")}>
                    1d
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.graphButton(period === "5D")}
                  onPress={() => setPeriod("5D")}
                >
                  <Text style={styles.graphButtonText(period === "5D")}>
                    5d
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.graphButton(period === "1M")}
                  onPress={() => setPeriod("1M")}
                >
                  <Text style={styles.graphButtonText(period === "1M")}>
                    1m
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.graphButton(period === "6M")}
                  onPress={() => setPeriod("6M")}
                >
                  <Text style={styles.graphButtonText(period === "6M")}>
                    6m
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.graphButton(period === "1Y")}
                  onPress={() => setPeriod("1Y")}
                >
                  <Text style={styles.graphButtonText(period === "1Y")}>
                    1y
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.graphButton(period === "5Y")}
                  onPress={() => setPeriod("5Y")}
                >
                  <Text style={styles.graphButtonText(period === "5Y")}>
                    5y
                  </Text>
                </TouchableOpacity>
              </View>
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
            <TouchableOpacity onPress={handleBuy} style={styles.buyContainer}>
              <Text style={{ ...styles.buySellText, ...textColor }}>Buy</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSell} style={styles.sellContainer}>
              <Text style={{ ...styles.buySellText, ...textColor }}>Sell</Text>
            </TouchableOpacity>

            <QuantityInputWithConfirmation
              isVisible={isQuantityModalVisible}
              onCancel={() => setIsQuantityModalVisible(false)}
              onConfirm={handleConfirmQuantity}
              balance={balance}
              data={data.price}
            />

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
                imageUri
                  ? { uri: imageUri }
                  : require("../../assets/no-logo.png")
              }
              resizeMode="contain"
              style={styles.logoImage}
            />
            <Text style={{ ...styles.aboutText, ...textColor }}>
              {data.about}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StockOverview;
