import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { setDoc, collection, getFirestore, doc } from "firebase/firestore";
import { useDarkMode } from "../common/darkmode/DarkModeContext";

const presetProfilePictures = [
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_1.jpg",
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_2.jpg",
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_3.jpg",
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_4.jpg",
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_5.jpg",
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_6.jpg",
  "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PP_7.jpg",
];

const ProfileSettings = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [profileImageUri, setProfileImageUri] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // To control the visibility of the profile picture options modal
  const [selectedProfilePictureIndex, setSelectedProfilePictureIndex] = useState(null);
  const navigation = useNavigation();
  const firestore = getFirestore();
  const profilesRef = collection(firestore, "profiles");
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Fetch the current user's profile data and set it as the initial values
    const auth = getAuth();
    if (auth.currentUser) {
      setNewUsername(auth.currentUser.displayName || "");
      setNewEmail(auth.currentUser.email || "");
      setProfileImageUri(auth.currentUser.photoURL || null);
    }
  }, []);

  const handleSave = async () => {
    if (newUsername.length < 3) {
      Alert.alert("Error", "Username must be at least 3 characters long.");
      return;
    }

    const usernameRegex = /^[A-Za-z0-9]+$/;
    if (!usernameRegex.test(newUsername)) {
      Alert.alert("Error", "Username can only contain letters and numbers.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail) || !newEmail.endsWith(".com")) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    try {
      await updateProfile(user, {
        displayName: newUsername,
        photoURL: profileImageUri,
      });

      // Save profile information to Firestore
      await setDoc(doc(firestore, "profiles", user.uid), {
        displayName: newUsername,
        photoURL: profileImageUri,
      });

      await updateEmail(user, newEmail);

      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Profile update failed. Please try again: " + error.message);
    }
  };

  const openProfilePictureOptions = () => {
    setIsModalVisible(true);
  };

  const closeProfilePictureOptions = () => {
    setIsModalVisible(false);
  };

  const selectProfilePicture = (index) => {
    const selectedImageUri = presetProfilePictures[index];
    setProfileImageUri(selectedImageUri);
    setSelectedProfilePictureIndex(index);
    closeProfilePictureOptions();
  };

  const handleRemoveProfilePicture = () => {
    setProfileImageUri("https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/default_profile.png");
  };

  const containerStyle = {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: isDarkMode ? "#333" : "white",
  };

  const titleStyle = {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 70,
    color: isDarkMode ? "white" : "black",
  };

  const labelStyle = {
    fontSize: 18,
    marginRight: 10,
    marginBottom: 10,
    color: isDarkMode ? "white" : "black",
  };

  const inputTextStyle = {
    flex: 1,
    color: isDarkMode ? "white" : "black",
  };

  return (
    <View style={containerStyle}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={{
              uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/back.png",
            }}
            style={[styles.backButton, { tintColor: isDarkMode ? styles.backButtonColor.dark : styles.backButtonColor.light }]}
          />
        </TouchableOpacity>
      </View>
      <Text style={titleStyle}>Edit Profile</Text>
      <TouchableOpacity onPress={openProfilePictureOptions}>
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
      <TouchableOpacity
        style={styles.removeProfilePictureButton}
        onPress={handleRemoveProfilePicture}
      >
        <Text style={styles.saveButtonText}>Remove</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeProfilePictureOptions}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a profile picture</Text>
            <View style={styles.profilePictureOptionsContainer}>
              {presetProfilePictures.map((uri, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.profilePictureOption}
                  onPress={() => selectProfilePicture(index)}
                >
                  <Image source={{ uri }} style={styles.profilePictureOptionImage} />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.profilePictureOption} onPress={closeProfilePictureOptions}>
              <Text style={styles.profilePictureOptionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.detailsContainer}>
        <View style={styles.labelContainer}>
          <Text style={labelStyle}>Username: </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={inputTextStyle}
            value={newUsername}
            onChangeText={setNewUsername}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={labelStyle}>Email: </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={inputTextStyle}
            value={newEmail}
            editable={false}
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
    height: "25%",
    alignItems: "center",
    marginTop: 40,
  },
  saveButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 20,
    marginTop: 40,
    width: "70%",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  backButtonColor: {
    light: 'black',
    dark: 'white',
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  profilePictureOption: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePictureOptionImage: {
    width: "100%",
    height: "100%",
  },
  profilePictureOptionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profilePictureOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  removeProfilePictureButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 30,
    marginTop: 10,
    width: "35%",
  },
});

export default ProfileSettings;
