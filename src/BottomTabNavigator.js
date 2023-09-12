import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import HomePage from './home-page/HomePage.js';
import PortfolioPage from "./PortFolio.js"

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
    tabBarIcon: ({ color, size }) => (
      <TabIcon name="home-outline" color={color} size={size} />
    ),
  }}
/>
<Tab.Screen
  name="Portfolio"
  component={PortfolioPage}
  options={{
    tabBarIcon: ({ color, size }) => (
      <TabIcon name="briefcase-outline" color={color} size={size} />
    ),
  }}
/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;