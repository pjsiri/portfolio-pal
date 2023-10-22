import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { ref, getDownloadURL, put } from 'firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileSettings = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [profileImageUri, setProfileImageUri] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch the current user's profile data and set it as the initial values
    const auth = getAuth();
    if (auth.currentUser) {
      setNewUsername(auth.currentUser.displayName || "");
      setNewEmail(auth.currentUser.email || "");
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

    // Check if the email address is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail) || !newEmail.endsWith(".com")) {
      Alert.alert("Error", "Please enter a valid email address.");
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

      // Update the email
      await updateEmail(user, newEmail);

      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Profile update failed. Please try again: " + error.message);
    }
  };

  const selectProfilePicture = () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.uri) {
        setProfileImageUri(response.uri);
      }
    });
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
      <TouchableOpacity onPress={selectProfilePicture}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: profileImageUri || "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/default_profile.png",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.plusSign}>+</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Username: </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            value={newUsername}
            onChangeText={setNewUsername}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Email: </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            value={newEmail}
            editable={false} // Non-editable for now
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
    position: "relative",
    width: 150,
    height: 150,
    borderRadius: 80,
    overflow: "hidden",
    alignSelf: "center",
    marginVertical: 10,
    marginTop: 40,
  },
  plusSign: {
    position: "absolute",
    top: "50%",
    left: "50%",
    fontSize: 30,
    transform: [{ translateX: -9 }, { translateY: -25 }],
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
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputText: {
    flex: 1,
  },
  detailsContainer: {
    width: "70%",
    height: "20%",
    alignItems: "center",
    marginTop: 70,
  },
  saveButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 20,
    marginTop: 100,
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
    left: 30,
  },
  backButton: {
    width: 30,
    height: 30,
  },
});

export default ProfileSettings;
