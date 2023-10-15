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
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { StatusBar } from "react-native";
import { useDarkMode } from "./common/darkmode/DarkModeContext";
import { Picker } from "@react-native-picker/picker";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Portfolio = () => {
    const { isDarkMode } = useDarkMode();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [assetName, setAssetName] = useState("");
    const [assetPrice, setAssetPrice] = useState("");
    const [assetQuantity, setAssetQuantity] = useState("");
    const [selectedValue, setSelectedValue] = useState("Stock");
    const [userAssets, setUserAssets] = useState([]);
    const [totalStockValue, setTotalStockValue] = useState(0);
    const [totalCryptoValue, setTotalCryptoValue] = useState(0);
    const [totalAssetsValue, setTotalAssetsValue] = useState(0);
    const [cryptoTotalValues, setCryptoTotalValues] = useState([]);
    const [stockTotalValues, setStockTotalValues] = useState([]);

    // Helper function to calculate total asset price
    const calculateTotalPrice = (price, quantity) => {
        return price * quantity;
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const handleSave = async () => {
        const newAsset = {
            name: assetName,
            price: parseFloat(assetPrice),
            quantity: parseInt(assetQuantity),
            type: selectedValue,
        };

        newAsset.totalPrice = calculateTotalPrice(newAsset.price, newAsset.quantity);

        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            let userAssetRef;
            if (selectedValue === "Stock") {
                userAssetRef = collection(db, `userAssets/${user.uid}/Stocks`);
            } else if (selectedValue === "Crypto") {
                userAssetRef = collection(db, `userAssets/${user.uid}/Cryptos`);
            } else {
                console.error("Invalid asset type");
                return;
            }

            try {
                await addDoc(userAssetRef, newAsset);
            } catch (error) {
                console.error("Error adding asset to Firestore:", error);
            }
        } else {
            console.log("No authenticated user found");
        }

        setUserAssets([...userAssets, newAsset]);

        // Update total values based on the added asset
        if (newAsset.type === "Stock") {
            setTotalStockValue(totalStockValue + newAsset.totalPrice);
        } else if (newAsset.type === "Crypto") {
            const newCryptoAsset = {
                name: assetName,
                totalValue: newAsset.totalPrice,
            };
            setCryptoTotalValues([...cryptoTotalValues, newCryptoAsset]);
        }

        setAssetName("");
        setAssetPrice("");
        setAssetQuantity("");
        setSelectedValue("Stock");

        hideModal();
    };

    const screenWidth = Dimensions.get("window").width;

    useEffect(() => {
        const fetchUserAssets = async () => {
            const db = getFirestore();
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                try {
                    const userAssetRef = collection(db, `userAssets/${user.uid}/Assets`);
                    const querySnapshot = await getDocs(userAssetRef);
                    const assets = [];
                    querySnapshot.forEach((doc) => {
                        assets.push(doc.data());
                    });

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

    useEffect(() => {
        setTotalAssetsValue(
            userAssets.reduce((total, asset) => total + asset.totalPrice, 0)
        );
    }, [userAssets]);

    // Create the chart data based on userAssets
    const chartData = userAssets.map((asset) => ({
        name: asset.name,
        price: asset.totalPrice,
    }));

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
            <View style={styles.topBar}>
                <Button title="Add" onPress={showModal} />
            </View>
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Fill in the fields: </Text>
                        <Text>{"\n"}</Text>
                        <TextInput
                            value={assetName}
                            onChangeText={(text) => setAssetName(text)}
                            placeholder="Enter the name of asset"
                        />
                        <TextInput
                            value={assetPrice}
                            onChangeText={(text) => setAssetPrice(text)}
                            placeholder="Enter the price of asset"
                            keyboardType="numeric"
                        />
                        <TextInput
                            value={assetQuantity}
                            onChangeText={(text) => setAssetQuantity(text)}
                            placeholder="Enter the quantity of asset"
                            keyboardType="numeric"
                        />
                        <View style={styles.pickerContainer}>
                            <Text>{"\n"}</Text>
                            <Text style={styles.selectOptionText}>Select an option:</Text>
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Stock" value="Stock" />
                                <Picker.Item label="Crypto" value="Crypto" />
                            </Picker>
                            <Text>Selected asset Type: {selectedValue}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Save" onPress={handleSave} />
                            <Button title="Close" onPress={hideModal} />
                        </View>
                    </View>
                </View>
            </Modal>
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
            <Text>Total Stock Assets: ${totalStockValue}</Text>
            <Text>{"\n"}</Text>
            <Text style={styles.totalValue}>
                Total assets values: ${totalAssetsValue}
            </Text>
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
