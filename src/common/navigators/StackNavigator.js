import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../login-page/LoginPage.js";
import RegisterScreen from "../../login-page/RegisterPage.js";
import BottomTabNavigator from "./BottomTabNavigator.js";
import SettingsPage from "../../settings-page/SettingsPage.js";
import Education from "../../settings-page/Education.js";
import StockOverview from "../../overview-page/StockOverview.js";
import CryptoOverview from "../../overview-page/CryptoOverview.js";
import Bookmark from "../../bookmark-page/BookmarkPage.js";
import ProfilePage from "../../settings-page/profileSettings.js";
import Chat from "../../Chat.js";
import VideoDetail from "../../settings-page/VideoDetail.js";
import Wallet from "../../wallet-page/Wallet.js"

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
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
        name="Settings"
        component={SettingsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Education"
        component={Education}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StockOverview"
        component={StockOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CryptoOverview"
        component={CryptoOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookmarkPage"
        component={Bookmark}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoDetail"
        component={VideoDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
