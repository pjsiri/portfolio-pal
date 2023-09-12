import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import LoginScreen from "./src/LoginPage.js";
import RegisterScreen from "./src/RegisterPage.js";
import HomePage from "./src/home-page/HomePage.js";
import ForgotPage from "./src/ForgotPage.js";
import SearchPage from "./src/search-page/SearchPage.js";

export default function App() {
  return (
    <View style={styles.container}>
      <SearchPage />
      <StatusBar style="auto" />
    </View>
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
