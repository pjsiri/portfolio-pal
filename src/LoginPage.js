import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";

const LoginScreen = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track dark mode
  const navigation = useNavigation();

  const handleLogin = () => {
    // Replace these with your preset username and password
    const setUser = "PortfolioPal";
    const setPass = "AIVestor";

    if (user === setUser && pass === setPass) {
      // Successful login
      navigation.navigate('HomeStack');
      Alert.alert("Login Successful", "Welcome back, PortfolioPal!");
    } else {
      // Failed login
      Alert.alert("Login Failed", "Invalid username or password.");
    }
  };

  const handleForgotPassword = () => {
    // Navigate to the "Forgot" screen when the button is pressed
    navigation.navigate("Forgot");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Toggle dark mode state
  };

  const styles = {
    container: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode ? "black" : "white", // Use dark background for dark mode
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      color: isDarkMode ? "white" : "black", // Use white text for dark mode
    },
    subtitle: {
      fontSize: 18,
      color: isDarkMode ? "white" : "black",
    },
    input: {
      width: 200,
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: isDarkMode ? "gray" : "white", // Use gray background for input in dark mode
      color: isDarkMode ? "white" : "black", // Use white text for input in dark mode
    },
    bannerImage: {
      width: 300,
      height: 150,
      resizeMode: "contain",
      marginBottom: 20,
    },
    darkModeButton: {
      position: "absolute",
      bottom: 10, // Adjust the position from the bottom
      right: 10,
      backgroundColor: isDarkMode ? "white" : "black",
      padding: 5,
      borderRadius: 20,
    },
    darkModeButtonText: {
      color: isDarkMode ? "black" : "white",
    },
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PortfolioPal_banner.png",
        }}
        style={styles.bannerImage}
      />
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Please Login!</Text>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUser(text)}
        value={user}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPass(text)}
        value={pass}
        secureTextEntry
        style={styles.input}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button title="Forgot password" onPress={() => navigation.navigate("Forgot")} />
        <Button title="Login" onPress={handleLogin} />
      </View>
      <TouchableOpacity style={styles.darkModeButton} onPress={toggleDarkMode}>
        <Text style={styles.darkModeButtonText}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;