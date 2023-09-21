import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginPage.js";
import RegisterScreen from "./RegisterPage.js";
import BottomTabNavigator from "./BottomTabNavigator.js";
import Education from "./Education.js";
import OverviewPage from "./overview-page/OverviewPage.js";
import Bookmark from "./BookmarkPage.js";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }} // Hide the header for this screen
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeStack"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Education"
        component={Education}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Overview"
        component={OverviewPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookmarkPage"
        component={Bookmark}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
