import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';

const LoginScreen = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = () => {
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
    <View>
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
        <Button title="Forgot password" onPress={handleLogin} />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = {
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
};

export default LoginScreen;
