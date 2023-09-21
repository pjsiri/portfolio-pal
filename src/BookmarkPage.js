import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import StockCard from './common/cards/StockCard'; // Assuming StockCard is in the same directory
import cardStyles from './common/cards/Cards.style'; // Assuming card.style.js is in the same directory
import { useNavigation } from '@react-navigation/native';

const BookmarkedStocksPage = () => {
  const [bookmarkedStocks, setBookmarkedStocks] = useState([]);
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  useEffect(() => {
    const fetchBookmarkedStocks = async () => {
      const db = getFirestore();
      const stocksRef = collection(db, 'bookmarkedStocks');

      const q = query(stocksRef, orderBy('timestamp', 'desc'));

      const querySnapshot = await getDocs(q);

      const stocks = [];
      querySnapshot.forEach((doc) => {
        stocks.push(doc.data());
      });

      setBookmarkedStocks(stocks);
    };

    fetchBookmarkedStocks();
  }, []);

  const styles = {
    container: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    inputIcon: {
      width: 24,
      height: 24,
      marginRight: 8,
    },
    backButtonContainer: {
      position: 'absolute',
      top: 80,
      left: 20,
    },
    backButton: {
      width: 30,
      height: 30,
    },
  };

  return (
    <View style={cardStyles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={{
              uri: 'https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/back.png',
            }}
            style={styles.inputIcon}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={bookmarkedStocks}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <StockCard
            item={item}
            handleNavigate={() => {}}
            showBookmark={false} // Assuming you want to hide the bookmark icon
          />
        )}
      />
    </View>
  );
};

export default BookmarkedStocksPage;
