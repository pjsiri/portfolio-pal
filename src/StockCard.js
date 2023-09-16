import React from 'react';
import { StyleSheet } from "react-native";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from "./home-page/cards/Cards.style";
import { COLORS, FONT, SHADOWS, SIZES } from "../constants/theme";

const StockCard = ({ name, price, color }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={[styles.logoContainer, { backgroundColor: color }]}>
        {/* add an image or an icon here */}
        {/* <Image source={...} style={styles.logoImage} /> */}
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.stockName}>{name}</Text>
        <Text style={styles.stockPrice}>${price}</Text>
      </View>
      {/* Add any other components you need in the card */}
    </TouchableOpacity>
  );
};

export default StockCard;
