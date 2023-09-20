import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import styles from "./SearchPage.style";
import SearchStocks from "./components/SearchStocks";
import { useDarkMode } from "../DarkModeContext"; 

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [finalSearchQuery, setFinalSearchQuery] = useState("hi");
  const { isDarkMode } = useDarkMode();

  const containerStyle = [
    styles.appContainer,
    isDarkMode && styles.darkModeContainer,
  ];

  const handleSearch = (searchQuery) => {
    setFinalSearchQuery(searchQuery);
    //console.log("Search query:", searchQuery);
  };

  return (
    <SafeAreaView style={containerStyle}>
      <View style={styles.searchContainer}>
        <Image
          style={styles.searchIcon}
          source={require("../../assets/search.png")}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search all investments"
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={() => handleSearch(searchQuery)}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
        <SearchStocks inputQuery={finalSearchQuery} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default SearchPage;