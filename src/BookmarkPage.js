import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { getFirestore, collection, getDocs, query, orderBy, where, deleteDoc } from 'firebase/firestore';
import StockCard from './common/cards/StockCard'; 
import cardStyles from './common/cards/Cards.style'; 
import { useNavigation } from '@react-navigation/native';
import Homestyles from "./home-page/HomePage.style";

import { getAuth } from 'firebase/auth';

const BookmarkedStocksPage = () => {
  const [bookmarkedStocks, setBookmarkedStocks] = useState([]);
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('HomeStack'); // Navigate back to the previous screen
  };

  useEffect(() => {
    const fetchBookmarkedStocks = async () => {
      const db = getFirestore();
      const stocksRef = collection(db, 'bookmarkedStocks');
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        const q = query(stocksRef, where('userId', '==', user.uid));
        try {
          const querySnapshot = await getDocs(q);

          const stocks = querySnapshot.docs.map(doc => doc.data());
          setBookmarkedStocks(stocks);
        } catch (error) {
          console.error('Error fetching bookmarked stocks:', error);
        }
      } 
       else {
         console.log('No authenticated user found');
         }
        };
  
    fetchBookmarkedStocks();
  }, []);

  const styles = {
    container: {
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
    title: {
      fontSize: 24,
      marginBottom: 15,
    },
    appContainer: {
      flex: 1,
      padding: 15,
      paddingTop: 50,
      width: "100%",
      backgroundColor: "#F0F0F0",
    },
    header: {
      fontWeight: "bold",
      fontSize: 30,
      paddingTop: 20,
      paddingBottom: 20,
      color: "black",
      left: 20,
    },
    stocks: {
      paddingTop: 20,
      paddingBottom: 20,
    },
  };

  return (
    <SafeAreaView style={[styles.appContainer]}>
      <View style={styles.container}>
        <Text style={[styles.title, { fontSize: 28, fontWeight: "900"}]}>Bookmark Page</Text>
      </View>
      <View>
      <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Image
              source={{
                uri: 'https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/back.png',
              }}
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>
        <FlatList style={styles.stocks}
          data={bookmarkedStocks}
          keyExtractor={(item) => item.symbol}
          renderItem={({ item }) => (
            <StockCard
              item={item}
              handleNavigate={() => {}}
              isBookedMarked={true}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default BookmarkedStocksPage;