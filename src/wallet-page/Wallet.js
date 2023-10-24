import React, { useState, useEffect, PureComponent } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import styles from "./Wallet.style";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ExchangePage from "./ExchangePage";

// Component for displaying each transaction item
export class TransactionItem extends PureComponent {
  render() {
    const { item } = this.props;
    if (item.hasOwnProperty("amount")) {
      // Rendering for top-up transactions
      return (
        <View style={styles.transactionItem}>
          <Ionicons name="push-outline" size={24} color="black" />
          <Text>Type: {item.type}</Text>
          <Text>Amount: ${item.amount.toFixed(2)}</Text>
        </View>
      );
    } else {
      // Rendering for buy/sell transactions
      return (
        <View style={styles.transactionCard}>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionType}>{item.type}</Text>
            <Text>Symbol: {item.symbol}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Total Price: ${item.totalPrice}</Text>
            <Text>Timestamp: {item.timestamp.toDate().toLocaleString()}</Text>
          </View>
        </View>
      );
    }
  }
}

// Main Wallet component
const Wallet = () => {
  // State variables and constants
  const [topUpAmount, setTopUpAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [walletActivity, setWalletActivity] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;
  const firestore = getFirestore();
  const walletActivityRef = collection(firestore, "wallet-activity");

  // Navigation handler to ExchangePage
  const handleNavigateToExchange = () => {
    navigation.navigate("ExchangePage");
  };

  // Navigation handler to go back
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Function to fetch wallet activity data from Firestore
  const fetchWalletActivity = async () => {
    try {
      const q = query(walletActivityRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const walletActivityData = querySnapshot.docs.map((doc) => doc.data());
      walletActivityData.sort(
        (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
      ); // Sort wallet activity by timestamp (most recent first)
      setWalletActivity(walletActivityData);
    } catch (error) {
      console.error("Error fetching wallet activity:", error);
    }
  };

  // Function to fetch transaction data from Firestore
  const fetchTransactions = async () => {
    try {
      const userRef = doc(firestore, "users", userId);
      const transactionsRef = collection(userRef, "transactions");
      const querySnapshot = await getDocs(transactionsRef);
      const transactionData = querySnapshot.docs.map((doc) => doc.data());
      transactionData.sort(
        (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
      ); // Sort wallet activity by timestamp (most recent first)
      setTransactions(transactionData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    // Function to fetch user balance from Firestore
    const fetchUserBalance = async (userId) => {
      try {
        const userDocRef = doc(firestore, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const userBalance = userData.balance;

          if (userBalance === undefined) {
            await setDoc(userDocRef, { balance: 0 }, { merge: true });
            setBalance(0);
          } else {
            setBalance(userBalance);
          }
        } else {
          await setDoc(userDocRef, { balance: 0 }, { merge: true });
          setBalance(0);
        }
      } catch (error) {
        console.error("Error fetching user balance:", error);
      }
    };

    fetchUserBalance(userId);
    fetchWalletActivity();
    fetchTransactions();
  }, [userId]);

  // Function to handle top-up
  const handleTopUp = async () => {
    try {
      if (topUpAmount === "" || parseFloat(topUpAmount) <= 0) {
        Alert.alert("Error", "Please enter a valid top-up amount.");
        return;
      }

      Alert.alert(
        "Confirm Top Up",
        `Are you sure you want to top up $${topUpAmount}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              const newBalance = balance + parseFloat(topUpAmount);
              await setDoc(
                doc(firestore, "users", userId),
                { balance: newBalance },
                { merge: true }
              );
              await addDoc(walletActivityRef, {
                type: "top_up",
                amount: parseFloat(topUpAmount),
                timestamp: new Date(),
                userId: userId,
              });
              setBalance(newBalance);
              setTopUpAmount("");
              fetchWalletActivity(); // Fetch transactions after top-up

              // Display success message
              Alert.alert(
                "Success",
                `You have successfully topped up $${topUpAmount}`
              );
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error topping up:", error);
    }
  };

  // Function to handle withdrawal
  const handleWithdraw = async () => {
    try {
      if (withdrawAmount === "" || parseFloat(withdrawAmount) <= 0) {
        Alert.alert("Error", "Please enter a valid withdrawl amount.");
        return;
      }
      Alert.alert(
        "Confirm Withdraw",
        `Are you sure you want to withdraw $${withdrawAmount}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              const newBalance = balance - parseFloat(withdrawAmount);
              if (newBalance < 0) {
                alert("Insufficient balance for withdrawal.");
                return;
              }
              await setDoc(
                doc(firestore, "users", userId),
                { balance: newBalance },
                { merge: true }
              );
              await addDoc(walletActivityRef, {
                type: "withdrawal",
                amount: parseFloat(withdrawAmount),
                timestamp: new Date(),
                userId: userId,
              });
              setBalance(newBalance);
              setWithdrawAmount("");
              fetchWalletActivity(); // Fetch transactions after withdrawal

              // Display success message
              Alert.alert(
                "Success",
                `You have successfully withdrawn $${withdrawAmount}`
              );
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error withdrawing:", error);
    }
  };

  const combinedActivities = [...walletActivity, ...transactions];
  combinedActivities.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back-outline" size={42} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.balance}>Balance: ${balance.toFixed(2)}</Text>
      <TextInput
        style={styles.input}
        placeholder="Top Up Amount"
        value={topUpAmount}
        onChangeText={(text) => setTopUpAmount(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleTopUp}>
        <Text style={styles.buttonText}>Top Up</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Withdraw Amount"
        value={withdrawAmount}
        onChangeText={(text) => setWithdrawAmount(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleWithdraw}>
        <Text style={styles.buttonText}>Withdraw</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToExchange}
      >
      </TouchableOpacity>
      <Text style={styles.transactionHistory}>Transactions History:</Text>
      <FlatList
        data={combinedActivities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TransactionItem item={item} />}
      />
    </View>
  );
};

export default Wallet;
