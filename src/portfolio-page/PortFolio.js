import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Modal,
  Button,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDarkMode } from "../common/darkmode/DarkModeContext";
import randomcolor from "randomcolor";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import styles from "./Portfolio.style";
import PortfolioStocks from "./components/PortfolioStocks";

const getRandomColor = () => randomcolor();

// Define the calculateTotalPrice function
function calculateTotalPrice(price, quantity) {
  return price * quantity;
}

const Portfolio = () => {
  const { isDarkMode } = useDarkMode();
  const [graphType, setGraphType] = useState("All"); //graph type
  const [userInvestments, setUserInvestments] = useState([]);
  const [balance, setBalance] = useState(0);
  const screenWidth = Dimensions.get("window").width;
  const [sortType, setSortType] = useState(0);
  const [ascendOrder, setAscendOrder] = useState(true);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [userStocks, setUserStocks] = useState([]);
  const [userCryptos, setUserCryptos] = useState([]);
  const [assets, setAssets] = useState([]); // Declare the 'assets' state variable
  let cryptos = []; // Declare 'cryptos' outside of the useEffect
  const [totalStocks, setTotalStocks] = useState(0);
  const [totalCryptos, setTotalCryptos] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;
  const firestore = getFirestore();

  const handleNavigateToWallet = () => {
    navigation.navigate("Wallet");
  };

  const fetchUserBalance = async (userId) => {
    try {
      const userDocRef = doc(firestore, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const userBalance = userData.balance;

        if (userBalance === undefined) {
          await setDoc(userDocRef, { balance: 0 }, { merge: true });
          setBalance(0);
        } else {
          setBalance(userBalance);
        }
      } else {
        await setDoc(userDocRef, { balance: 0 }, { merge: true });
        setBalance(0);
      }
    } catch (error) {
      console.error("Error fetching user balance:", error);
    }
  };

  useEffect(() => {
    fetchUserBalance(userId);
  }, [userId]);

  //Stocks
  useEffect(() => {
    if (isFocused) {
      const fetchUserAssets = async () => {
        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          try {
            const holdingsRef = collection(db, `users/${user.uid}/holdings`);
            const q = query(holdingsRef);
            const querySnapshot = await getDocs(q);
            const companies = {};
            const stocks = [];
            const cryptos = [];
            let totalStocks = 0;
            let totalCryptos = 0;
            let investments = [];

            querySnapshot.forEach((doc) => {
              const assetData = doc.data();
              investments.push(assetData);
              if (assetData.isStocks) {
                stocks.push({
                  price: assetData.totalPrice,
                  name: assetData.name,
                  color: getRandomColor(),
                });
                totalStocks += assetData.totalPrice;
              } else {
                cryptos.push({
                  price: assetData.totalPrice,
                  name: assetData.name,
                  color: getRandomColor(),
                });
                totalCryptos += assetData.totalPrice;
              }

              if (companies[assetData.name]) {
                companies[assetData.name] += assetData.totalPrice;
              } else {
                companies[assetData.name] = assetData.totalPrice;
              }
            });

            const companyChartData = Object.entries(companies).map(
              ([name, price], index) => ({
                name,
                price,
                color: getRandomColor(index),
              })
            );

            setUserInvestments(investments);
            setTotalCryptos(totalCryptos);
            setTotalStocks(totalStocks);
            setAssets(companyChartData); // Update the 'assets' state variable
            setUserStocks(stocks);
            setUserCryptos(cryptos);
          } catch (error) {
            console.error("Error fetching user assets from Firestore:", error);
          }
        } else {
          console.log("No authenticated user found");
        }
      };

      fetchUserAssets();
    }
  }, [isFocused]);

  const userTotalAssets = totalStocks + totalCryptos;
  const percentageStocks = ((totalStocks / userTotalAssets) * 100).toFixed(2);
  const percentageCryptos = ((totalCryptos / userTotalAssets) * 100).toFixed(2);

  // Modify the data sources based on graphType
  let data = [];

  if (graphType === "All") {
    data = assets.concat(cryptos);
  } else if (graphType === "Stock") {
    data = userStocks;
  } else if (graphType === "Crypto") {
    data = userCryptos;
  } // Inside the useEffect where you set the data for the pie chart
  if (graphType === "S:C") {
    data = [
      { name: "Stocks", price: totalStocks, color: getRandomColor() },
      { name: "Cryptos", price: totalCryptos, color: getRandomColor() },
    ];
  }

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => color,
  };

  const handleSort = (selectedSortType) => {
    if (sortType === selectedSortType) {
      setAscendOrder(!ascendOrder);
    } else {
      setAscendOrder(true);
      setSortType(selectedSortType);
    }
  };

  return (
    <SafeAreaView
      style={[styles.appContainer, isDarkMode && styles.darkModeContainer]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.walletButton}
          onPress={handleNavigateToWallet}
        >
          <Text style={styles.walletButtonText}>My Wallet (USD)</Text>
          <Text style={styles.walletButtonText}>${balance.toFixed(2)}</Text>
        </TouchableOpacity>

        <View style={styles.portfolioTitleContainer}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            PORTFOLIO VALUE (USD)
          </Text>
          <Text style={{ fontSize: 44, fontWeight: "bold" }}>
            ${userTotalAssets.toFixed(2)}
          </Text>
        </View>

        <View style={styles.graphContainer}>
          <PieChart
            data={data}
            width={screenWidth - 20}
            height={220}
            chartConfig={chartConfig}
            accessor="price"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <View style={styles.graphButtonsContainer}>
            <TouchableOpacity
              style={styles.graphButton(graphType === "All")}
              onPress={() => setGraphType("All")}
            >
              <Text style={styles.graphButtonText(graphType === "All")}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.graphButton(graphType === "Stock")}
              onPress={() => setGraphType("Stock")}
            >
              <Text style={styles.graphButtonText(graphType === "Stock")}>
                Stock
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.graphButton(graphType === "Crypto")}
              onPress={() => setGraphType("Crypto")}
            >
              <Text style={styles.graphButtonText(graphType === "Crypto")}>
                Crypto
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.graphButton(graphType === "S:C")}
              onPress={() => setGraphType("S:C")}
            >
              <Text style={styles.graphButtonText(graphType === "S:C")}>
                S:C
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.assetContainer}>
          <Text style={styles.headerText}>Asset Overview - {graphType}</Text>
          {graphType === "All" && (
            <View style={styles.sectionContainer}>
              <Text style={styles.valueText}>Total Assets Value</Text>
              <Text style={styles.valueText}>
                ${userTotalAssets.toFixed(2)}
              </Text>
            </View>
          )}

          {graphType === "Stock" && (
            <View style={styles.sectionContainer}>
              <Text style={styles.valueText}>Total Stock Assets Value</Text>
              <Text style={styles.valueText}>${totalStocks.toFixed(2)}</Text>
            </View>
          )}

          {graphType === "Crypto" && (
            <View style={styles.sectionContainer}>
              <Text style={styles.valueText}>Total Crypto Assets Value</Text>
              <Text style={styles.valueText}>${totalCryptos.toFixed(2)}</Text>
            </View>
          )}

          {graphType === "S:C" && (
            <View style={styles.sectionContainer}>
              <Text style={styles.valueText}>
                Total Stock and Crypto Assets Value
              </Text>
              <Text style={styles.valueText}>Stocks: {percentageStocks}%</Text>
              <Text style={styles.valueText}>
                Cryptos: {percentageCryptos}%
              </Text>
            </View>
          )}
        </View>
        <View style={styles.investmentCardsContainer}>
          <Text style={styles.headerText}>Current Investments</Text>
          <PortfolioStocks investments={userInvestments} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Portfolio;
