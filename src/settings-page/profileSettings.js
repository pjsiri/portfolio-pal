import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Button, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { launchImageLibrary } from 'react-native-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const ProfileSettings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName) {
          setUsername(user.displayName);
          setNewUsername(user.displayName);
        }
        if (user.email) {
          setEmail(user.email);
          setNewEmail(user.email);
        }
        if (user.photoURL) {
          setImage(user.photoURL);
        }
      }
    });
  }, []);

  useEffect(() => {
    setNewUsername(username);
    setNewEmail(email);
  }, [username, email]);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        uploadImage(response);
      }
    });
  };

  const uploadImage = async (response) => {
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + response.fileName);

    const uploadTask = uploadBytesResumable(storageRef, response.uri);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Handle progress, success, and errors
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };

  const handleUpdateUsername = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (newUsername !== username) {
      updateProfile(user, {
        displayName: newUsername
      }).then(() => {
        setUsername(newUsername);
      }).catch((error) => {
        console.log(error);
      });
    }

    user.reload();
  };

  const handleUpdateEmail = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (newEmail !== email) {
      updateEmail(user, newEmail).then(() => {
        setEmail(newEmail);
      }).catch((error) => {
        console.log(error);
      });
    }

    user.reload();
  };

  const handleUpdatePassword = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (newPassword) {
      updatePassword(user, newPassword).catch((error) => {
        console.log(error);
      });
    }

    user.reload();
  };

  const handleBack = () => {
    navigation.navigate('Settings');
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
      {image && (
        <Image source={{ uri: image }} style={styles.profileImage} />
      )}
      <Button title="Upload Photo" onPress={handleChoosePhoto} />
      <TextInput
        value={newUsername}
        onChangeText={setNewUsername}
        placeholder="Username"
      />
      <Button title="Update Username" onPress={handleUpdateUsername} />
      <TextInput
        value={newEmail}
        onChangeText={setNewEmail}
        placeholder="Email"
      />
      <Button title="Update Email" onPress={handleUpdateEmail} />
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        secureTextEntry
      />
      <Button title="Update Password" onPress={handleUpdatePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
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
