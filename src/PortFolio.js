import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert, Dimensions, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const portFolio = () => {
    let originalTotalPrice = 10;
    let changedTotalPrice = 9.6;

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

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

    const pieData = [
        {
            name: 'Stock 1',
            price: 215,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Stock 2',
            price: 280,
            color: 'orange',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Stock 3',
            price: 52,
            color: 'red',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Stock 4',
            price: 853,
            color: 'yellow',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Stock 5',
            price: 11,
            color: 'green',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];

    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };


    return (
        <View style={styles.container}>
            <PieChart
                data={pieData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="price"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
            <Text>Original money: {originalTotalPrice}</Text>
            <Text>Changed money: {changedTotalPrice}</Text>
            {moneyText}
            <Text>{percentage}%</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    earnedMoney: {
        color: 'blue',
    },
    losesMoney: {
        color: 'red',
    },
});


export default portFolio;
