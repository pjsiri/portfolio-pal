import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const Login = () => {
    // Replace these with your preset username and password
    const setUser = 'PortfolioPal';
    const setPass = 'AIVestor';

    if (user === setUser && pass === setPass) {
      // Successful login
      Alert.alert('Login Successful', 'Welcome back, PortfolioPal!');
    } else {
      // Failed login
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text> Welcome Back!</Text>
      <Text> Please Login!</Text>
      <TextInput
        placeholder="Username"
        onChangeText={text => setUser(text)}
        value={user}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={text => setPass(text)}
        value={pass}
        secureTextEntry
        style={styles.input}
      />
     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Button title="Forgot password" onPress={Login} />
      <Button title="Login" onPress={Login} />
    </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  forgotPassword:{
    fontsize: 10,
  }
});
