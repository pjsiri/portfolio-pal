import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { Image } from 'react-native';

const portFolio = () => {
    let originalTotalPrice = 10;
    let changedTotalPrice = 9.6;
    const result = (originalTotalPrice, changedTotalPrice) => {
        return changedTotalPrice - originalTotalPrice;
    }
    const resultValue = result(originalTotalPrice, changedTotalPrice);
    let moneyText = null;
    if (resultValue > 0) {
        moneyText = <Text style={styles.earnedMoney}>result: +{resultValue}</Text>;
    } else {
        moneyText = <Text style={styles.losesMoney}>result: {resultValue}</Text>;
    }

    let percentage = (resultValue / originalTotalPrice) * 100;

    return (
        <View style={styles.container}>
            <Text>Original money: {originalTotalPrice}</Text>
            <Text>Changed money: {changedTotalPrice}</Text>
            {moneyText}
            <Text>{percentage}%</Text>
            <StatusBar style="auto" />
        </View>
    );
}

export default portFolio;