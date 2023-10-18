import React, { useState } from "react";
import { Modal, View, TextInput, Button, Text, Alert } from "react-native";

const QuantityInputWithConfirmation = ({ isVisible, onCancel, onConfirm, balance, data }) => {
  const [quantity, setQuantity] = useState("");

  const handleConfirm = () => {
    const enteredQuantity = Number(quantity);
    
    if (enteredQuantity > 0 && enteredQuantity * data.price <= balance) {
      onConfirm(enteredQuantity);
      setQuantity("");
    } else {
      Alert.alert(
        "Invalid Quantity or Insufficient Balance",
        "Please enter a valid quantity and make sure you have sufficient balance.",
        [{ text: "OK", onPress: () => {} }]
      );
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ backgroundColor: "white", padding: 30, borderRadius: 10, width: 240, height: 240 }}>
        <Text >Your Balance:</Text>
        <Text style={{ backgroundColor: "#F0F0F0", borderRadius: 5, padding: 5 }}>${balance.toFixed(2)}</Text>
          <Text >Enter Quantity:</Text>
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={{ backgroundColor: "#F0F0F0", borderRadius: 4, padding: 4 }}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between", top: 45 }}>
            <Button title="Cancel" onPress={onCancel}/>
            <Button title="Confirm" onPress={handleConfirm} />
           </View>

        </View>
      </View>
    </Modal>
  );
};

export default QuantityInputWithConfirmation;
