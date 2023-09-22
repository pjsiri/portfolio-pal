import React, { useState } from "react";
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
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const OverviewPage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();

  const [isHeartFilled, setIsHeartFilled] = useState(false);

  /*const { data, isLoading, error, refetch } = useFetch("stock-overview", {
    symbol: item.symbol,
    language: "en",
  });*/

  const containerStyle = [
    styles.appContainer,
    isDarkMode && styles.darkModeContainer,
  ];

  return (
    <SafeAreaView
      style={[styles.appContainer, isDarkMode && styles.darkModeContainer]}
    >
      {/*<View style={styles.headerContainer}></View>*/}

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Tesla Inc</Text>
            <Text style={{ fontSize: 15 }}>(TSLA:NASDAQ)</Text>
            <Text style={{ fontSize: 60, fontWeight: "bold" }}>$255.7</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                -$6.89&nbsp;
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                (-2.6239%)
              </Text>
            </View>
          </View>

          <View style={styles.graphContainer}>
            <Text>Stock chart work in progress</Text>
          </View>

          <TouchableOpacity style={styles.bookmarkContainer}>
            <Image
              source={
                isHeartFilled
                  ? require("../../assets/heart.png")
                  : require("../../assets/heart_hollow.png")
              }
              resizeMode="contain"
              style={styles.heartImage}
            />
            <Text>Add to watchlist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buyContainer}>
            <Text style={styles.buySellText}>Buy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sellContainer}>
            <Text style={styles.buySellText}>Sell</Text>
          </TouchableOpacity>

          <View style={styles.detailContainer}>
            <View style={styles.priceDetailContainer}>
              <Text>
                Open: <Text style={{ fontWeight: "bold" }}>$257.85</Text>
              </Text>
              <Text>
                High: <Text style={{ fontWeight: "bold" }}>$260.86</Text>
              </Text>
              <Text>
                Low: <Text style={{ fontWeight: "bold" }}>$254.21</Text>
              </Text>
            </View>

            <View style={styles.priceDetailContainer}>
              <Text>
                Mkt cap: <Text style={{ fontWeight: "bold" }}>$801.23B</Text>
              </Text>
              <Text>
                P/E ratio: <Text style={{ fontWeight: "bold" }}>72.5874</Text>
              </Text>
              <Text>
                Div yield: <Text style={{ fontWeight: "bold" }}>0.00%</Text>
              </Text>
            </View>
          </View>
          <Image
            source={{ uri: "https://api.twelvedata.com/logo/tesla.com" }}
            resizeMode="contain"
            style={styles.logoImage}
          />
          <Text style={styles.aboutText}>
            Apple Inc. is an American multinational technology company
            headquartered in Cupertino, California, United States. Apple is the
            largest technology company by revenue and, as of June 2022, is the
            world's biggest company by market capitalization, the fourth-largest
            personal computer vendor by unit sales and second-largest mobile
            phone manufacturer. It is one of the Big Five American information
            technology companies, alongside Alphabet, Amazon, Meta, and
            Microsoft. Apple was founded as Apple Computer Company on April 1,
            1976, by Steve Jobs, Steve Wozniak and Ronald Wayne to develop and
            sell Wozniak's Apple I personal computer. It was incorporated by
            Jobs and Wozniak as Apple Computer, Inc. in 1977 and the company's
            next computer, the Apple II, became a best seller and one of the
            first mass-produced microcomputers. Apple went public in 1980 to
            instant financial success. The company developed computers featuring
            innovative graphical user interfaces, including the 1984 original
            Macintosh, announced that year in a critically acclaimed
            advertisement. By 1985, the high cost of its products and power
            struggles between executives caused problems.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OverviewPage;
