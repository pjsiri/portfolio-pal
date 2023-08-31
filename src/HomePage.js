import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';

const HomePage = () => {
    return (
        <View>
            <Text>PortfolioPal</Text>
            <Text>Trending Stocks</Text>
            <Text>Newest Stocks</Text>
        </View>
    )
}

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

export default HomePage