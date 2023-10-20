import React, { useState, useEffect } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Dimensions,
    StyleSheet,
    Modal,
    Button,
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
    addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Define the calculateTotalPrice function
function calculateTotalPrice(price, quantity) {
    return price * quantity;
}

const Portfolio = () => {
    const { isDarkMode } = useDarkMode();
    const [userAssets, setUserAssets] = useState([]);
    const [coinAssets, setCoinAssets] = useState([]);
    const [userCrypto, setUserCrypto] = useState([]);
    const [crypto, setCrypto] = useState([]);
    const [cryptoTotal, setCryptoTotal] = useState(0);
    const [assetsTotal, setAssetsTotal] = useState(0); // Use state for assetsTotal
    const screenWidth = Dimensions.get("window").width;
    const [assetName, setAssetName] = useState("");
    const [assetPrice, setAssetPrice] = useState("");
    const [assetQuantity, setAssetQuantity] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sortType, setSortType] = useState(0);
    const [ascendOrder, setAscendOrder] = useState(true);

    const showModal = () => {
        console.log("Add button pressed");
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
        };

        newAsset.totalPrice = calculateTotalPrice(newAsset.price, newAsset.quantity);

        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            let userCryptoRef = collection(db, `users/${user.uid}/Crypto`); // Change the collection name to "Crypto"
            try {
                // Use addDoc to add a document to the "Crypto" collection
                await addDoc(userCryptoRef, newAsset);
            } catch (error) {
                console.error("Error adding asset to Firestore:", error);
            }
        } else {
            console.log("No authenticated user found");
        }

        setUserCrypto([...userCrypto, newAsset]); // Update userCrypto state
        setAssetName("");
        setAssetPrice("");
        setAssetQuantity("");
        hideModal();
    };

    //Stocks
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

    //Cryptos
    useEffect(() => {
        const fetchUserAssets = async () => {
            const db = getFirestore(); // Initialize Firestore
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                try {
                    const cryptoRef = collection(db, `users/${user.uid}/Crypto`);
                    const q = query(cryptoRef);
                    const querySnapshot = await getDocs(q);
                    const cts = [];
                    let total = 0; // Initialize a total variable

                    querySnapshot.forEach((doc) => {
                        const cryptoData = doc.data();
                        cts.push({
                            price: cryptoData.totalPrice
                        });
                        total += cryptoData.totalPrice; // Accumulate the total
                    });

                    setCryptoTotal(total); // Update assetsTotal state
                    setCoinAssets(cts);
                } catch (error) {
                    console.error("Error fetching user assets from Firestore: ", error);
                }
            } else {
                console.log("No authenticated user found");
            }
        };

        fetchUserAssets();
    }, []);


    const chartData = [ // Create chart data based on fetched data
        { name: "Stocks", price: assetsTotal, color: "#FFD700" },
        { name: "Cryptos", price: cryptoTotal, color: "#008000" }
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
    const handleSort = (selectedSortType) => {
        if (sortType === selectedSortType) {
            setAscendOrder(!ascendOrder);
        } else {
            setAscendOrder(true);
            setSortType(selectedSortType);
        }
    };

    const percentageStocks = (assetsTotal / (assetsTotal + cryptoTotal)) * 100
    const percentageCryptos = (cryptoTotal / (assetsTotal + cryptoTotal)) * 100
    const userTotalAssets = assetsTotal + cryptoTotal;
    return (
        <View style={containerStyle}>
            <View style={styles.sortContainer}>
                <View style={styles.sortBy}>
                    <Text style={styles.sortText(false)}>Menu:</Text>
                </View>
                <TouchableOpacity
                    style={styles.sortButton(sortType === 0)}
                    onPress={showModal}
                >
                <Text style={styles.sortText(sortType === 0)}>add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sortButton(sortType === 1)}
                    onPress={() => handleSort(1)}
                >
                    <Text style={styles.sortText(sortType === 1)}>Assets detail</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sortButton(sortType === 2)}
                    onPress={() => handleSort(2)}
                >
                    <Text style={styles.sortText(sortType === 2)}>Summary</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Fill in the fields: </Text>
                        <Text>{"\n"}</Text>
                        <TextInput
                            value={assetName}
                            onChangeText={(text) => setAssetName(text)}
                            placeholder="Enter the name of Crypto"
                        />
                        <TextInput
                            value={assetPrice}
                            onChangeText={(text) => setAssetPrice(text)}
                            placeholder="Enter the price of Crypto"
                            keyboardType="numeric"
                        />
                        <TextInput
                            value={assetQuantity}
                            onChangeText={(text) => setAssetQuantity(text)}
                            placeholder="Enter the quantity of asset"
                            keyboardType="numeric"
                        />
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
            <View style={styles.assetContainer}>
                <Text style={styles.headerText}>Asset Overview</Text>

                <View style={styles.sectionContainer}>
                    <Text style={styles.valueText}>Total Assets Value</Text>
                    <Text style={styles.valueText}>${userTotalAssets.toFixed(2)}</Text>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.valueText}>Total Stock Assets: {percentageStocks.toFixed(0)}%</Text>
                    <Text style={styles.valueText}>Total Crypto Assets: {percentageCryptos.toFixed(0)}%</Text>
                </View>
            </View>
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
        top: 50,
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
    sortContainer: {
        backgroundColor: "black",
        flexDirection: "row",
        position: 'absolute',  // Position the container at the top
        top: 0,               // Top of the screen
        width: "100%",
        height: 53,
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 15,
        borderRadius: 25,
        marginTop: 100,
        marginBottom: 15,
    },
    sortBy: {
        borderColor: "white",
        paddingHorizontal: 15,
    },
    sortText: (selected) => ({
        color: selected ? "black" : "white",
        fontSize: 16,
        fontWeight: "500",
    }),
    sortButton: (selected) => ({
        backgroundColor: selected ? "white" : "black",
        paddingHorizontal: 30,
        marginHorizontal: 5,
        height: "75%",
        borderRadius: 20,
        justifyContent: "center"
    }),
    assetContainer: {
        padding: 16,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#007AFF',
    },
    sectionContainer: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 16,
        borderRadius: 10,
    },
    valueText: {
        fontSize: 18,
        marginBottom: 8,
    },
    percentageText: {
        fontSize: 18,
        color: '#009933',
    },
});

export default Portfolio;
