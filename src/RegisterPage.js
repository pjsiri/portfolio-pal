import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { Image } from 'react-native';

const RegisterScreen = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleRegister = () => {
    // Add your registration logic here
    if (user && pass && pass === confirmPass) {
      Alert.alert('Registration Successful', 'You have successfully registered!');
    } else {
      Alert.alert('Registration Failed', 'Please provide valid information.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PortfolioPal_banner.png',
        }}
        style={styles.bannerImage}
      />
      <Text style={styles.text}>Welcome! Register an Account</Text>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUser(text)}
        value={user}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPass(text)}
        value={pass}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPass(text)}
        value={confirmPass}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },
  text: {
    marginTop: 20, // Add some spacing between the logo and the text
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  bannerImage: {
    width: 300, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    resizeMode: 'contain', // Adjust the resizeMode as needed
    marginBottom: 20, // Add some spacing between the image and the other content
  },
};

export default RegisterScreen;
