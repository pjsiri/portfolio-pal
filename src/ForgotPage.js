import React, { useState } from "react";
import { Text, View, TextInput, Button, Alert, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ForgotPage = () => {
  const [Email, setEmail] = useState("");
  const [VCode, setVCode] = useState("");
  const [Pass, setPass] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleChangePassword = () => {
    if (Pass == ConfirmPass) {
      navigation.navigate('Login');
      Alert.alert("Success", "You have Successfully changed your password!");
    } else {
      Alert.alert("Invalid", "Your Passwords do not Match!", "Try Again!");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PortfolioPal_banner.png",
        }}
        style={styles.bannerImage}
      />

      <Text style={styles.title}>Fill the form to reset your password</Text>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={Email}
        style={styles.input}
      />
      <TextInput
        placeholder="Verification Code"
        onChangeText={(text) => setVCode(text)}
        value={VCode}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPass(text)}
        value={Pass}
        style={styles.input}
        secureTextEntry={!showPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPass(text)}
        value={ConfirmPass}
        style={styles.input}
        secureTextEntry={!showPassword}
      />
      <Button
        title={showPassword ? "Hide Password" : "Show Password"}
        onPress={() => setShowPassword(!showPassword)}
      />
      <Button title="Change Password" onPress={handleChangePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImage: {
    width: 300,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default ForgotPage;