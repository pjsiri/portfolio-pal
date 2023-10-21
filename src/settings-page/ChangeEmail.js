import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChangeEmail = () => {
  const navigation = useNavigation();
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");

  const handleChangeEmail = () => {
    // Implement the logic to change the email address here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={{
            uri:
              "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/back.png",
          }}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Change Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Email"
        value={currentEmail}
        onChangeText={(text) => setCurrentEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="New Email"
        value={newEmail}
        onChangeText={(text) => setNewEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Email"
        value={confirmNewEmail}
        onChangeText={(text) => setConfirmNewEmail(text)}
      />
      <Button title="Change Email" onPress={handleChangeEmail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
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

export default ChangeEmail;
