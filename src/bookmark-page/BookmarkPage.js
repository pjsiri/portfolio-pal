import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import StockCard from "../common/cards/StockCard";
import CryptoCard from "../common/cards/CryptoCard";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
// import { useDarkMode } from '../common/darkmode/DarkModeContext';
import styles from "./BookmarkPage.style";
import { onSnapshot } from "firebase/firestore";

const BookmarkedStocksPage = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("stock");
  const filteredItems = bookmarkedItems.filter(
    (item) => item.type === activeTab
  );

  const handleBack = () => {
    navigation.navigate("HomeStack"); // Navigate back to the previous screen
  };

  useEffect(() => {
    const fetchBookmarkedItems = async () => {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const stocksRef = collection(db, "bookmarkedStocks");
        const cryptosRef = collection(db, "bookmarkedCryptos"); // Added reference for cryptos

        const stocksQuery = query(stocksRef, where("userId", "==", user.uid));
        const cryptosQuery = query(cryptosRef, where("userId", "==", user.uid));

        try {
          const stocksSnapshot = await getDocs(stocksQuery);
          const cryptosSnapshot = await getDocs(cryptosQuery);

          const stocks = stocksSnapshot.docs.map((doc) => ({
            ...doc.data(),
            type: "stock",
          }));
          const cryptos = cryptosSnapshot.docs.map((doc) => ({
            ...doc.data(),
            type: "crypto",
          }));

          setBookmarkedItems([...stocks, ...cryptos]);

          const unsubscribeStocks = onSnapshot(stocksRef, (snapshot) => {
            const updatedStocks = snapshot.docs
              .filter((doc) => doc.data().userId === user.uid) // Check if userId matches
              .map((doc) => ({ ...doc.data(), type: "stock" }));
            setBookmarkedItems((prevState) => [
              ...updatedStocks,
              ...prevState.filter((item) => item.type !== "stock"),
            ]);
          });

          const unsubscribeCryptos = onSnapshot(cryptosRef, (snapshot) => {
            const updatedCryptos = snapshot.docs
              .filter((doc) => doc.data().userId === user.uid) // Check if userId matches
              .map((doc) => ({ ...doc.data(), type: "crypto" }));
            setBookmarkedItems((prevState) => [
              ...updatedCryptos,
              ...prevState.filter((item) => item.type !== "crypto"),
            ]);
          });

          return () => {
            unsubscribeStocks();
            unsubscribeCryptos();
          };
        } catch (error) {
          console.error("Error fetching bookmarked items:", error);
        }
      } else {
        console.log("No authenticated user found");
      }
    };

    fetchBookmarkedItems();
  }, []);

  return (
    <SafeAreaView style={[styles.appContainer]}>
      <View style={styles.container}>
        <Text style={[styles.title, { fontSize: 28, fontWeight: "900" }]}>
          Bookmark Page
        </Text>
      </View>
      <View style={styles.tabButtons}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "stock" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("stock")}
        >
          <Text style={styles.tabButtonText}>Stocks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "crypto" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("crypto")}
        >
          <Text style={styles.tabButtonText}>Cryptos</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Image
              source={{
                uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/back.png",
              }}
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.stocks}
          data={filteredItems}
          keyExtractor={(item) =>
            item.type + "-" + (item.symbol || item.from_symbol)
          }
          renderItem={({ item }) => {
            return item.type === "crypto" ? (
              <CryptoCard
                item={item}
                isBookedMarked={true}
                handleNavigate={() => {
                  navigation.navigate("CryptoOverview", { item });
                }}
              />
            ) : (
              <StockCard
                item={item}
                isBookedMarked={true}
                handleNavigate={() => {
                  navigation.navigate("StockOverview", { item });
                }}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default BookmarkedStocksPage;
