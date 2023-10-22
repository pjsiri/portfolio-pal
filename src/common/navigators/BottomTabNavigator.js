import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "../../home-page/HomePage.js";
import PortfolioPage from "../../portfolio-page/PortFolio.js";
import SettingsPage from "../../settings-page/SettingsPage.js";
import SearchPage from "../../search-page/SearchPage.js";
import Wallet from "../../wallet-page/Wallet.js"

const TabIcon = ({ name, color, size }) => {
  return <Ionicons name={name} color={color} size={size} />;
};

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="briefcase-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="wallet-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="cog-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
