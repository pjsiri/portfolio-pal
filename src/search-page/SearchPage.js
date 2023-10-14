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
  TouchableWithoutFeedback,
} from "react-native";

import styles from "./SearchPage.style";
import SearchStocks from "./components/SearchStocks";
import { FilterPopup } from "./components/FilterPopup";
import { useDarkMode } from "../common/darkmode/DarkModeContext";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [finalSearchQuery, setFinalSearchQuery] = useState(" ");
  const [currency, setCurrency] = useState("");
  const [priceOption, setPriceOption] = useState("");
  const [stockSelected, setStockSelected] = useState(true);
  const [sortType, setSortType] = useState(0);
  const [ascendOrder, setAscendOrder] = useState(true);
  const { isDarkMode } = useDarkMode();

  const filters = (currency, priceOption, stockSelected) => {
    setCurrency(currency);
    setPriceOption(priceOption);
    setStockSelected(stockSelected);
  };

  const containerStyle = [
    styles.appContainer,
    isDarkMode && styles.darkModeContainer,
  ];

  let popupRef = React.createRef();
  const onShowPopup = () => {
    popupRef.show();
  };
  const onClosePopup = () => {
    popupRef.close();
  };

  const handleSearch = (searchQuery) => {
    setFinalSearchQuery(searchQuery || " ");
    //console.log("Search query:", searchQuery);
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
    <SafeAreaView style={containerStyle}>
      <View style={styles.searchOuterContainer}>
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
        <TouchableOpacity style={styles.filterButton} onPress={onShowPopup}>
          <Image
            style={styles.filterIcon}
            source={require("../../assets/filter-icon3.png")}
          />
        </TouchableOpacity>
        <FilterPopup
          title="Filters"
          stockSelected={stockSelected}
          ref={(target) => (popupRef = target)}
          onTouchOutside={onClosePopup}
          applyFilters={filters}
        />
      </View>

      <View style={styles.sortContainer}>
        <View style={styles.sortBy}>
          <Text style={styles.sortText(false)}>Sort By:</Text>
        </View>
        <TouchableOpacity
          style={styles.sortButton(sortType === 0)}
          onPress={() => handleSort(0)}
        >
          <Text style={styles.sortText(sortType === 0)}>Relevent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortButton(sortType === 1)}
          onPress={() => handleSort(1)}
        >
          <Text style={styles.sortText(sortType === 1)}>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortButton(sortType === 2)}
          onPress={() => handleSort(2)}
        >
          <Text style={styles.sortText(sortType === 2)}>Price</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <SearchStocks
            inputQuery={finalSearchQuery}
            currency={currency}
            priceOption={priceOption}
            stockSelected={stockSelected}
            setStockSelected={setStockSelected}
            sortType={sortType}
            ascendOrder={ascendOrder}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchPage;
