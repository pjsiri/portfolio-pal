import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, Button, Modal, Alert, Dimensions, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { StatusBar } from 'react-native';
import StockCard from './StockCard';
import { useDarkMode } from "./DarkModeContext"; // Import the hook
import RNPickerSelect from "react-native-picker-select";


const PortFolio = () => {
    const { isDarkMode } = useDarkMode(); // Use the hook to access dark mode state

    // Apply dark mode styles conditionally
    const containerStyle = [
        styles.container,
        isDarkMode && styles.darkModeContainer,
    ];

    const earnedMoneyStyle = isDarkMode ? styles.darkModeEarnedMoney : styles.earnedMoney;
    const losesMoneyStyle = isDarkMode ? styles.darkModeLosesMoney : styles.losesMoney;

    const pieData = [
        {
            name: 'Apple',
            price: Math.floor(Math.random() * 10000) + 1,
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Tesla',
            price: Math.floor(Math.random() * 10000) + 1,
            color: 'orange',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Alphabet',
            price: Math.floor(Math.random() * 10000) + 1,
            color: 'red',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Microsoft',
            price: Math.floor(Math.random() * 10000) + 1,
            color: 'yellow',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'BNZ',
            price: Math.floor(Math.random() * 10000) + 1,
            color: 'green',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];

    // Initialize a variable to store the total sum of prices
    let totalSum = 0;

    // Calculate to get the sum of prices from the pie chart
    for (let i = 0; i < pieData.length; i++) {
        totalSum += pieData[i].price;
    }

    pieData.sort((a, b) => b.price - a.price);

    let randomOriginalTotalPrice = Math.floor(Math.random() * 30000) + 10000; //Original prices

    let originalTotalPrice = randomOriginalTotalPrice;
    let changedTotalPrice = totalSum;

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

    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    //pop up a window to get input from user about the stocks or crypto info
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');
    const [selectedAssetType, setSelectedAssetType] = useState('Stock'); // Default selection

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const handleSave = () => {
        // Do something with the input value (textInputValue)
        // For example, you can store it in state or send it to a server
        console.log('Input value:', textInputValue);
        console.log('Selected asset type:', selectedAssetType);
        hideModal();
    };

    return (
        <View style={containerStyle}>
            <View style={styles.topBar}>
                <Button title="Add" onPress={showModal} />
            </View>
            {/* Modal */}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Fill in the field please:</Text>
                        <TextInput
                            value={textInputValue}
                            onChangeText={(text) => setTextInputValue(text)}
                            placeholder="Enter something..."
                        />
                        <Text>Select an asset type:</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedAssetType(value)} // Set the selected value
                            items={[
                                { label: "JavaScript", value: "JavaScript" },
                                { label: "TypeScript", value: "TypeScript" },
                                { label: "Python", value: "Python" },
                                { label: "Java", value: "Java" },
                                { label: "C++", value: "C++" },
                                { label: "C", value: "C" },
                            ]}
                            value={selectedAssetType} // Set the selected value
                            placeholder={{ label: "Select an asset type", value: null }} // Set a placeholder
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Save" onPress={handleSave} />
                            <Button title="Close" onPress={hideModal} />
                        </View>
                    </View>
                </View>
            </Modal>
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
            <Text>Original assets: ${originalTotalPrice}</Text>
            <Text>Changed assets: ${changedTotalPrice}</Text>
            {moneyText}
            <Text>{percentageText}</Text>
            <Text>Stocks list: </Text>
            {/* Map through pieData and render StockCard for each stock */}
            {pieData.map((stock, index) => (
                <StockCard //stock card for the displaying stock
                    key={index}
                    name={stock.name}
                    price={stock.price}
                    color={stock.color}
                />
            ))}
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
    darkModeContainer: {
        backgroundColor: '#333', // Dark mode background color
    },
    earnedMoney: {
        color: 'blue',
    },
    darkModeEarnedMoney: {
        color: 'lightblue', // Dark mode text color
    },
    losesMoney: {
        color: 'red',
    },
    darkModeLosesMoney: {
        color: 'pink', // Dark mode text color
    },
    addButton: {
        backgroundColor: 'blue',
        color: 'black',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the modal
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    topBar: {
        alignSelf: 'stretch', // Make the topBar span the width of the screen
        flexDirection: 'row', // Arrange items horizontally
        justifyContent: 'flex-start', // Align items to the left
        padding: 10,
    },
    //other
});

export default PortFolio;
