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
  const [graphType, setGraphType] = useState("All");
  const [userAssets, setUserAssets] = useState([]);
  const [coinAssets, setCoinAssets] = useState([]);
  const [userCrypto, setUserCrypto] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [cryptoTotal, setCryptoTotal] = useState(0);
  const [assetsTotal, setAssetsTotal] = useState(0); // Use state for assetsTotal
  const screenWidth = Dimensions.get("window").width;
  const [assetName, setAssetName] = useState("");
  const [assetPrice, setAssetPrice] = useState("");
  const [assetQuantity, setAssetQuantity] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortType, setSortType] = useState(0);
  const [ascendOrder, setAscendOrder] = useState(true);
  const [companyData, setCompanyData] = useState([]);
  const isFocused = useIsFocused();

  const showModal = () => {
    // console.log("Add button pressed");
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleSave = async () => {
    const newAsset = {
      name: assetName,
      price: parseFloat(assetPrice),
      quantity: parseInt(assetQuantity),
    };

    newAsset.totalPrice = calculateTotalPrice(
      newAsset.price,
      newAsset.quantity
    );

    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      let userCryptoRef = collection(db, `users/${user.uid}/Crypto`); // Change the collection name to "Crypto"
      try {
        // Use addDoc to add a document to the "Crypto" collection
        await addDoc(userCryptoRef, newAsset);
      } catch (error) {
        console.error("Error adding asset to Firestore:", error);
      }
    } else {
      console.log("No authenticated user found");
    }

    setUserCrypto([...userCrypto, newAsset]); // Update userCrypto state
    setAssetName("");
    setAssetPrice("");
    setAssetQuantity("");
    hideModal();
  };

  useEffect(() => {
    if (isFocused) {
      const fetchUserAssets = async () => {
        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          try {
            const holdingsRef = collection(db, `users/${user.uid}/holdings`); // Change collection to "holdings"
            const q = query(holdingsRef);
            const querySnapshot = await getDocs(q);
            const companies = {};
            const assets = [];
            let total = 0;

            querySnapshot.forEach((doc) => {
              const asset = doc.data();
              const companyName = asset.symbol; // Assuming there's a 'name' field for company names
              const totalValue = asset.totalPrice;

              if (companies[companyName]) {
                companies[companyName] += totalValue;
              } else {
                companies[companyName] = totalValue;
              }
              total += asset.totalPrice;
            });

            const companyChartData = Object.entries(companies).map(
              ([name, price], index) => ({
                name,
                price,
                color: getRandomColor(index), // Assuming you have a function to generate colors
              })
            );

            setAssetsTotal(total);
            setCompanyData(companyChartData);
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

  //Cryptos
  useEffect(() => {
    const fetchUserAssets = async () => {
      const db = getFirestore(); // Initialize Firestore
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const cryptoRef = collection(db, `users/${user.uid}/Crypto`);
          const q = query(cryptoRef);
          const querySnapshot = await getDocs(q);
          const cts = [];
          let total = 0; // Initialize a total variable

          querySnapshot.forEach((doc) => {
            const cryptoData = doc.data();
            cts.push({
              price: cryptoData.totalPrice,
            });
            total += cryptoData.totalPrice; // Accumulate the total
          });

          setCryptoTotal(total); // Update assetsTotal state
          setCoinAssets(cts);
        } catch (error) {
          console.error("Error fetching user assets from Firestore: ", error);
        }
      } else {
        console.log("No authenticated user found");
      }
    };

    fetchUserAssets();
  }, []);

  const chartData = [
    // Create chart data based on fetched data
    { name: "Stocks", price: assetsTotal, color: "#FFD700" },
    { name: "Cryptos", price: cryptoTotal, color: "#008000" },
  ];

  //   console.log("chartData:", chartData);

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const handleSort = (selectedSortType) => {
    if (sortType === selectedSortType) {
      setAscendOrder(!ascendOrder);
    } else {
      setAscendOrder(true);
      setSortType(selectedSortType);
    }
  };

  const percentageStocks = (assetsTotal / (assetsTotal + cryptoTotal)) * 100;
  const percentageCryptos = (cryptoTotal / (assetsTotal + cryptoTotal)) * 100;
  const userTotalAssets = assetsTotal + cryptoTotal;
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
            data={companyData}
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
          <Text style={styles.headerText}>Asset Overview</Text>

          <View style={styles.sectionContainer}>
            <Text style={styles.valueText}>Total Assets Value</Text>
            <Text style={styles.valueText}>${userTotalAssets.toFixed(2)}</Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.valueText}>
              Total Stock Assets: {percentageStocks.toFixed(0)}%
            </Text>
            <Text style={styles.valueText}>
              Total Crypto Assets: {percentageCryptos.toFixed(0)}%
            </Text>
          </View>
        </View>

        <View style={styles.investmentCardsContainer}>
          <Text style={styles.headerText}>Current Investments</Text>
          <PortfolioStocks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Portfolio;
