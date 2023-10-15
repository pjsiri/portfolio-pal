import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const QuantityInput = ({ quantity, setQuantity }) => {
    const handleInputChange = (text) => {
      if (text === '') {
        setQuantity(0);
      } else {
        // Ensure the input is a valid number before updating state
        const parsedQuantity = parseInt(text, 10);
        if (!isNaN(parsedQuantity)) {
          setQuantity(parsedQuantity);
        }
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Enter Quantity:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quantity.toString()}
          onChangeText={handleInputChange}
        />
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default QuantityInput;
