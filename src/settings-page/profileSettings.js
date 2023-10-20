
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, updateProfile } from "firebase/auth";

const ProfileSettings = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const navigation = useNavigation();

  const handleSave = async () => {
    // Update the user's profile using Firebase Auth
    const auth = getAuth();
    try {
      await updateProfile(auth.currentUser, {
        displayName: newUsername,
        email: newEmail,
      });
      Alert.alert("Success", "Profile updated successfully");
      navigation.navigate("Settings");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Profile update failed. Please try again.");
    }
  };

  const handleBack = () => {
    navigation.navigate("Settings", { updatedUsername: newUsername });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={{
              uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/back.png",
            }}
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="New Username"
        value={newUsername}
        onChangeText={setNewUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="New Email"
        value={newEmail}
        onChangeText={setNewEmail}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  saveButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
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