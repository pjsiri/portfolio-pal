import React, { useState, useEffect } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Button,
    Dimensions,
    StyleSheet,
    Modal,
    button 
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { StatusBar } from "react-native";
import { useDarkMode } from "./common/darkmode/DarkModeContext";
import { Picker } from "@react-native-picker/picker";
import {
    getFirestore,
    collection,
    getDocs,
    query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Portfolio = () => {
    const { isDarkMode } = useDarkMode();
    const [userAssets, setUserAssets] = useState([]);
    const [assetsTotal, setAssetsTotal] = useState(0); // Use state for assetsTotal
    const screenWidth = Dimensions.get("window").width;

    useEffect(() => {
        const fetchUserAssets = async () => {
            const db = getFirestore(); // Initialize Firestore
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                try {
                    const userRef = collection(db, `users/${user.uid}/portfolio`);
                    const q = query(userRef);
                    const querySnapshot = await getDocs(q);
                    const assets = [];
                    let total = 0; // Initialize a total variable

                    querySnapshot.forEach((doc) => {
                        const asset = doc.data();
                        assets.push({
                            price: asset.totalPrice
                        });
                        total += asset.totalPrice; // Accumulate the total
                    });

                    setAssetsTotal(total); // Update assetsTotal state
                    setUserAssets(assets);
                } catch (error) {
                    console.error("Error fetching user assets from Firestore:", error);
                }
            } else {
                console.log("No authenticated user found");
            }
        };

        fetchUserAssets();
    }, []);

    const chartData = [ // Create chart data based on fetched data
        { name: "Stocks", price: assetsTotal }
    ];

    console.log("chartData:", chartData);

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };


    const containerStyle = [
        styles.container,
        isDarkMode && styles.darkModeContainer,
    ];

    return (
        <View style={containerStyle}>
            <PieChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="price"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
            <Text>Total Stock Assets: ${assetsTotal}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    darkModeContainer: {
        backgroundColor: "#333",
    },
    earnedMoney: {
        color: "blue",
    },
    darkModeEarnedMoney: {
        color: "lightblue",
    },
    losesMoney: {
        color: "red",
    },
    darkModeLosesMoney: {
        color: "pink",
    },
    addButton: {
        backgroundColor: "blue",
        color: "black",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        height: "60%",
        width: "80%",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 20,
    },
    topBar: {
        position: "absolute",
        top: 10,
        left: 10,
        flexDirection: "row",
    },
    pickerContainer: {
        flex: 1,
    },
    selectOptionText: {
        marginBottom: 5,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: "blue",
    },
});

export default Portfolio;
