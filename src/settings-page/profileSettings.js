import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, updateProfile } from "firebase/auth";

const ProfileSettings = () => {
  const [newUsername, setNewUsername] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch the current user's profile data and set it as the initial values
    const auth = getAuth();
    if (auth.currentUser) {
      setNewUsername(auth.currentUser.displayName || "");
    }
  }, []);

  const handleSave = async () => {
    // Check if the new username is at least 3 characters long
    if (newUsername.length < 3) {
      Alert.alert("Error", "Username must be at least 3 characters long.");
      return;
    }

    // Check if the username contains only letters and numbers
    const usernameRegex = /^[A-Za-z0-9]+$/; // Only letters and numbers allowed
    if (!usernameRegex.test(newUsername)) {
      Alert.alert("Error", "Username can only contain letters and numbers.");
      return;
    }

    // Update the user's profile using Firebase Auth
    const auth = getAuth();
    const user = auth.currentUser;
    try {
      // Update the display name
      await updateProfile(user, {
        displayName: newUsername,
      });
      navigation.goBack();
      Alert.alert("Success", "Profile updated successfully");
      
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Profile update failed. Please try again: " + error.message);
    }
  };

  const handleBack = () => {
    navigation.navigate("Settings", { updatedUsername: newUsername });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={{
              uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/back.png",
            }}
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.profileImageContainer}>
        <Image
          source={{
            uri:
              "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/default_profile.png",
          }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Username: </Text>
          </View>
          <TextInput
            style={styles.inputText}
            value={newUsername}
            onChangeText={setNewUsername}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 70,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 80,
    overflow: "hidden",
    alignSelf: "center",
    marginVertical: 10,
    marginTop: 70,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  label: {
    fontSize: 18,
    marginRight: 10,
    marginBottom: 10,
  },
  labelContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 20,
  },
  inputText: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  detailsContainer: {
    width: "70%",
    height: 300,
    alignItems: "center",
    marginTop: 100,
  },
  saveButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    width: "50%",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  backButtonContainer: {
    position: 'absolute',
    top: 80,
    left: 20,
  },
  backButton: {
    width: 30,
    height: 30,
  },
});

export default ProfileSettings;
