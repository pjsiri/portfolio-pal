import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useDarkMode } from "../common/darkmode/DarkModeContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";

const SettingsPage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [username, setUsername] = useState("");
  const [userProfileImage, setUserProfileImage] = useState(null);
  const navigation = useNavigation();
  const auth = getAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (user.displayName) {
            setUsername(user.displayName);
          }

          // Set the user's profile image
          if (user.photoURL) {
            setUserProfileImage(user.photoURL);
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
            navigation.navigate("Login");
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkModeText]}>Profile</Text>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageBorder}>
          <Image
            source={{
              uri: userProfileImage ||
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
      <Text style={[styles.title, isDarkMode && styles.darkModeText]}>Security</Text>
      <TouchableOpacity style={styles.optionBubble} onPress={() => navigation.navigate("ChangePassword")}>
        <Image
          source={{
            uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/password.png",
          }}
          style={styles.bubbleIcon}
        />
        <Text style={[styles.bubbleText, isDarkMode && styles.darkModeText]}>Change Password</Text>
      </TouchableOpacity>
      <Text style={[styles.title, isDarkMode && styles.darkModeText]}>Appearance</Text>
      <View style={styles.optionBubble}>
        <Image
          source={{
            uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/dark-mode-icon.png",
          }}
          style={styles.bubbleIcon}
        />
        <TouchableOpacity onPress={toggleDarkMode} style={styles.toggleButton}>
          <Text style={[styles.bubbleText, isDarkMode && styles.darkModeText]}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.title, isDarkMode && styles.darkModeText]}>Tutorials</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Education")}>
        <View style={styles.optionBubble}>
          <Image
            source={{
              uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/Video_icon.png",
            }}
            style={styles.bubbleIcon}
          />
          <Text style={[styles.bubbleText, isDarkMode && styles.darkModeText]}>Educational Videos</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 30,
    alignItems: "center",
    paddingBottom: 50,
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
  profileImageBorder: {
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
  usernameText: {
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 30,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  darkModeContainer: {
    backgroundColor: "#333",
  },
  darkModeText: {
    color: "#fff",
  },
  toggleButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 285,
  },
  logoutButton: {
    width: 150,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 25,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 18,
  },
  optionBubble: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 20,
  },
  bubbleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  bubbleText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default SettingsPage;
