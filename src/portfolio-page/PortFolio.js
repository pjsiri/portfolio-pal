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
import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useDarkMode } from "../common/darkmode/DarkModeContext";
import randomcolor from "randomcolor";
import { Picker } from "@react-native-picker/picker";
import {
  getFirestore,
  collection,
  getDocs,
  query,
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
  const [assetsTotal, setAssetsTotal] = useState(0); // Use state for assetsTotal
  const screenWidth = Dimensions.get("window").width;
  const [sortType, setSortType] = useState(0);
  const [ascendOrder, setAscendOrder] = useState(true);
  const isFocused = useIsFocused();
  const [userStocks, setUserStocks] = useState([]);
  const [userCryptos, setUserCryptos] = useState([]);
  const [assets, setAssets] = useState([]); // Declare the 'assets' state variable
  let cryptos = []; // Declare 'cryptos' outside of the useEffect
  const [totalStocks, setTotalStocks] = useState(0);
  const [totalCryptos, setTotalCryptos] = useState(0);

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

            querySnapshot.forEach((doc) => {
              const assetData = doc.data();
              if (assetData.isStocks) {
                stocks.push({
                  price: assetData.totalPrice,
                  name: assetData.name,
                });
                totalStocks += assetData.totalPrice;
              } else {
                cryptos.push({
                  price: assetData.totalPrice,
                  name: assetData.name,
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
            
            setUserInvestments(stocks);
            setTotalCryptos(totalCryptos);
            setTotalStocks(totalStocks);
            setAssetsTotal(totalStocks + totalCryptos);
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
  let graphTypeText = "";

  if (graphType === "All") {
    data = assets.concat(cryptos),
    color = getRandomColor(),
    graphTypeText = "All";
  } else if (graphType === "Stock") {
    data = userStocks;
    graphTypeText = "Stock";
  } else if (graphType === "Crypto") {
    data = userCryptos;
    graphTypeText = "Crypto";
  } // Inside the useEffect where you set the data for the pie chart
  if (graphType === "S:C") {
    data = [
      { name: "Stocks", price: totalStocks, color: getRandomColor() },
      { name: "Cryptos", price: totalCryptos, color: getRandomColor() },
    ];
    graphTypeText = "S:C";
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
        <TouchableOpacity style={styles.walletButton}>
          <Text style={styles.walletButtonText}>My Wallet</Text>
          <Text style={styles.walletButtonText}>$50,000</Text>
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
          <Text style={styles.headerText}>
            Asset Overview - {graphTypeText}
          </Text>
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
              <Text style={styles.valueText}>
                Stocks: {percentageStocks}%
              </Text>
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