// StackNavigator.js
import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginPage.js";
import RegisterScreen from "./RegisterPage.js";
import HomePage from "./home-page/HomePage.js";
import ForgotPage from "./ForgotPage.js";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Forgot" component={ForgotPage} />
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
