import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StackNavigator from './src/StackNavigator.js';

// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmiURfpsquWCcp0T5CGW6FVDvWPamGCnI",
  authDomain: "aivestor-firebase.firebaseapp.com",
  projectId: "aivestor-firebase",
  storageBucket: "aivestor-firebase.appspot.com",
  messagingSenderId: "618772004937",
  appId: "1:618772004937:web:232b6e98ee7c284b917f98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
