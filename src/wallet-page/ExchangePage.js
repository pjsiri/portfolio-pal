import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { Ionicons } from "@expo/vector-icons";
import styles from "./ExchangePage.style"
import useFetch from "../../hook/useFetch";
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

const ExchangePage = () => {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const navigation = useNavigation(); 
    const [balance, setBalance] = useState(0);
    const [fromAmount, setFromAmount] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid;
    const firestore = getFirestore();
    const walletActivityRef = collection(firestore, "wallet-activity");

    const { data, isLoading, error, refetch } = useFetch("currency-exchange-rate", {
        from_symbol: 'USD',
        to_symbol: 'NZD',
        language: 'en'
    });

    const exchangeRate = data.exchange_rate || 0;

    const handleExchange = async () => {
        try {
            const amountToExchange = parseFloat(fromAmount);
            if (isNaN(amountToExchange) || amountToExchange <= 0) {
                alert("Please enter a valid amount to exchange.");
                return;
            }

            const newBalance = balance + (amountToExchange * exchangeRate);
            console.log(newBalance);
            await setDoc(
                doc(firestore, "users", userId),
                { balance: newBalance },
                { merge: true }
            );

            await addDoc(walletActivityRef, {
                type: "exchange",
                amount: amountToExchange,
                fromCurrency: 'USD', 
                toCurrency: 'NZD',
                timestamp: new Date(),
                userId: userId,
            });

            setBalance(newBalance);
            setFromAmount("");

            // Display success message
            alert(`You have successfully exchanged $${amountToExchange} to ${toCurrency}`);
        } catch (error) {
            console.error("Error exchanging:", error);
        }
    };

    const handleGoBack = () => {
        navigation.goBack(); 
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
        }, [userId]);

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Ionicons name="chevron-back-outline" size={42} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <Text>Work in progress.</Text>
                <Text style={styles.balance}>Balance: ${balance.toFixed(2)} USD</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Amount to Exchange (NZD)"
                value={fromAmount}
                onChangeText={text => setFromAmount(text)}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleExchange}>
                <Text style={styles.buttonText}>Exchange</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ExchangePage;
