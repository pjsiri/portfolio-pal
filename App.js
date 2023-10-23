import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StackNavigator from "./src/common/navigators/StackNavigator.js";
import { DarkModeProvider } from "./src/common/darkmode/DarkModeContext.js";
import { getAuth  } from "firebase/auth";
import { LogBox } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
  // auth = getAuth(app);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  const db = getFirestore();

  export { auth, db };

  const Stack = createStackNavigator();
  LogBox.ignoreAllLogs();
  export default function App() {
    return (
      <DarkModeProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </DarkModeProvider>
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