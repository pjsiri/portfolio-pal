import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useDarkMode } from "../common/darkmode/DarkModeContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";

const SettingsPage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [username, setUsername] = useState('');
  const navigation = useNavigation();
  const auth = getAuth();
  const isFocused = useIsFocused();

  useEffect(() => {

    if (isFocused) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // The user is signed in, and you can access the user's information, including the display name
          if (user.displayName) {
            setUsername(user.displayName);
          }
        }
      });
    }

  }, [isFocused]);

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

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkModeText]}>
        Profile
      </Text>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri:
                "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/default_profile.png",
            }}
            style={styles.profileImage}
          />
        </View>
        <Text style={[styles.usernameText, isDarkMode && styles.darkModeText]}>{username}</Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
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
      <Text style={[styles.title, isDarkMode && styles.darkModeText]}>
        Tutorials
      </Text>
      <View style={[styles.appearanceContainer, isDarkMode && styles.darkModeContainer]}>
        <TouchableOpacity onPress={() => navigation.navigate("Education")}>
          <Text style={[styles.educationLink, isDarkMode && styles.darkModeText]}>
            Educational Videos
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutButton}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    width: 350,
    height: 280,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
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
    fontSize: 20,
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
  editProfileButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
  },
  editProfileText: {
    color: "white",
    fontSize: 16,
  },
});

export default SettingsPage;