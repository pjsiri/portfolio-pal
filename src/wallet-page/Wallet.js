import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
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

const Wallet = () => {
  const [topUpAmount, setTopUpAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user.uid;
  const firestore = getFirestore();
  const walletActivityRef = collection(firestore, "wallet-activity");

  const fetchWalletActivity = async () => {
    try {
      const q = query(walletActivityRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const walletActivityData = querySnapshot.docs.map((doc) => doc.data());
      setTransactions(walletActivityData);
    } catch (error) {
      console.error("Error fetching wallet activity:", error);
    }
  };


  useEffect(() => {
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
  }, [userId]);

  const handleTopUp = async () => {
    try {
      const newBalance = balance + parseFloat(topUpAmount);
      await setDoc(doc(firestore, "users", userId), { balance: newBalance }, { merge: true });
      await addDoc(walletActivityRef, {
        type: "top_up",
        amount: parseFloat(topUpAmount),
        timestamp: new Date(),
        userId: userId,
      });
      setBalance(newBalance);
      setTopUpAmount("");
  
      // Fetch transactions after top-up
      fetchWalletActivity();
    } catch (error) {
      console.error("Error topping up:", error);
    }
  };

  const handleWithdraw = async () => {
    try {
      const newBalance = balance - parseFloat(withdrawAmount);
      if (newBalance < 0) {
        alert("Insufficient balance for withdrawal.");
        return;
      }
      await setDoc(doc(firestore, "users", userId), { balance: newBalance }, { merge: true });
      await addDoc(walletActivityRef, {
        type: "withdrawal",
        amount: parseFloat(withdrawAmount),
        timestamp: new Date(),
        userId: userId,
      });
      setBalance(newBalance);
      setWithdrawAmount("");

      // Fetch transactions after top-up
      fetchWalletActivity();
    } catch (error) {
      console.error("Error withdrawing:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Balance: ${balance.toFixed(2)}</Text>
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
      <Text>Transactions:</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text>Type: {item.type}</Text>
            <Text>Amount: ${item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Wallet;
