import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useDarkMode } from "../common/darkmode/DarkModeContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SettingsPage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  /* const [selectedCurrency, setSelectedCurrency] = useState("NZD"); */

  useEffect(() => {
    const auth = getAuth();

    // Listen for changes in the user's authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // The user is signed in, and you can access the user's information, including the display name
        if (user.displayName) {
          setUsername(user.displayName);
        }
        if (user.email) {
          setEmail(user.email);
        }
      }
    });
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            // Perform logout action here
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleEducationNavigation = () => {
    navigation.navigate("Education");
  };

  const handleProfileNavigation = () => {
    navigation.navigate("Profile");
  };

    const handleChatNavigation = () => {
    navigation.navigate("Chat");
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkModeText]}>
        Profile
      </Text>
      <TouchableOpacity onPress={handleProfileNavigation}>
        <View style={[styles.profileContainer, isDarkMode && styles.darkModeContainer]}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri:
                  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/default_profile.png",
              }}
              style={styles.profileImage}
            />
          </View>
          <Text style={[styles.usernameText, isDarkMode && styles.darkModeText]}>Username: {username}</Text>
          <Text style={[styles.usernameText, isDarkMode && styles.darkModeText]}>Email: {email}</Text>
        </View>
      </TouchableOpacity>
      <Text style={[styles.title, isDarkMode && styles.darkModeText]}>
        Appearance
      </Text>
      <View style={[styles.appearanceContainer, isDarkMode && styles.darkModeContainer]}>
        <View style={styles.setting}>
          <Text style={[styles.settingText, isDarkMode && styles.darkModeText]}>
            Dark Mode
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
          />
        </View>
      </View>
      {/* <View style={styles.setting}>
        <Text style={[styles.settingText, isDarkMode && styles.darkModeText]}>
          Currency
        </Text>
        <Picker
          selectedValue={selectedCurrency}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
        >
          <Picker.Item label="NZD" value="NZD" />
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="EUR" value="EUR" />
        </Picker>
      </View> */}
      <Text style={[styles.title, isDarkMode && styles.darkModeText]}>
        Tutorials
      </Text>
      <View style={[styles.appearanceContainer, isDarkMode && styles.darkModeContainer]}>
      <TouchableOpacity onPress={handleEducationNavigation}>
        <Text style={[styles.educationLink, isDarkMode && styles.darkModeText]}>
          Educational Videos
        </Text>
      </TouchableOpacity>
      {}
      <TouchableOpacity onPress={handleChatNavigation}>
        <Text style={[styles.educationLink, isDarkMode && styles.darkModeText]}>
          AIVestor
        </Text>
      </TouchableOpacity>
    </View>
    <View style={{ marginTop: 30 }}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutButton}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    width: 350,
    height: 250,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 20,
  },
  appearanceContainer: {
    alignItems: "center",
    width: 350,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 20,
  },
  darkModeContainer: {
    backgroundColor: "#333",
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 30,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  darkModeText: {
    color: "#fff",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200,
  },
  settingText: {
    fontSize: 16,
    marginBottom: 5,
  },
  logoutButton: {
    marginTop: 50,
    fontSize: 18,
    color: "red",
    textDecorationLine: "underline",
  },
  educationLink: {
    fontSize: 18,
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  usernameText: {
    fontSize: 18,
    marginLeft: 10,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    alignSelf: "center",
    marginVertical: 10,
    marginTop: 30,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
});

export default SettingsPage;
