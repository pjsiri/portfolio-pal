import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert, Dimensions, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { StatusBar } from 'react-native';

const PortFolio = () => {
    let randomOriginalTotalPrice = Math.floor(Math.random()*10000) +1;
    let randomChangedTotalPrice = Math.floor(Math.random()*10000) +1;

    let originalTotalPrice = randomOriginalTotalPrice;
    let changedTotalPrice = randomChangedTotalPrice;

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const result = (originalTotalPrice, changedTotalPrice) => {
        return (changedTotalPrice - originalTotalPrice);
    }
    const resultValue = result(originalTotalPrice, changedTotalPrice);
    let percentage = ((resultValue / originalTotalPrice) * 100).toFixed(2);

    let moneyText = null;
    let percentageText = null;
    if (resultValue > 0) {
        moneyText = <Text style={styles.earnedMoney}>result: +{resultValue.toFixed(2)}</Text>;
        percentageText = <Text style={styles.earnedMoney}>{percentage}%</Text>
    } else {
        moneyText = <Text style={styles.losesMoney}>result: {resultValue.toFixed(2)}</Text>;
        percentageText = <Text style={styles.losesMoney}>{percentage}%</Text>
    }

    const pieData = [
        {
            name: 'Apple',
            price: 10324,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Tesla',
            price: 8220,
            color: 'orange',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Alphabet',
            price: 4435,
            color: 'red',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Microsoft',
            price: 4200,
            color: 'yellow',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'BNZ',
            price: 2200,
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
            <Text>Original money: ${originalTotalPrice}</Text>
            <Text>Changed money: ${changedTotalPrice}</Text>
            {moneyText}
            <Text>{percentageText}</Text>
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


export default PortFolio;
