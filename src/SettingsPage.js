import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useDarkMode } from "./DarkModeContext";

const SettingsPage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [selectedCurrency, setSelectedCurrency] = useState("NZD");
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkModeText]}>Settings</Text>
      <View style={styles.setting}>
        <Text style={[styles.settingText, isDarkMode && styles.darkModeText]}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
      <View style={styles.setting}>
        <Text style={[styles.settingText, isDarkMode && styles.darkModeText]}>Currency</Text>
        <Picker
          selectedValue={selectedCurrency}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
        >
          <Picker.Item label="NZD" value="NZD" />
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="EUR" value="EUR" />
        </Picker>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={[styles.logoutButton, isDarkMode && styles.darkModeText]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  darkModeContainer: {
    backgroundColor: "#333",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  darkModeText: {
    color: "#fff",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200,
    marginVertical: 10,
  },
  settingText: {
    fontSize: 16, 
  },
  logoutButton: {
    marginTop: 20,
    fontSize: 18,
    color: "red",
    textDecorationLine: "underline",
  },
});

export default SettingsPage;