import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native';

const HomePage = () => {
    return (
        <View style={styles.appContainer}>
          
          <View>
            <Image style={styles.appLogo} source={require('../assets/app_logo.png')} />
          </View>

          <ScrollView>
            <Text style={styles.title}>PortfolioPal</Text>

            <View style={styles.componentContainer}>
              <Text style={styles.subtitle}>Trending Stocks</Text>
              <View style={styles.trendingStocks}>
                
              </View>
            </View>

            <View style={styles.componentContainer}>
              <Text style={styles.subtitle}>Newest Stocks</Text>
              <View style={styles.newestStocks}>
                
              </View>
            </View>
          </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      padding: 50,
      paddingLeft: 20,
      paddingRight: 20,
      width: '100%',
      backgroundColor: 'grey',
    },

    componentContainer: {
      //backgroundColor: 'black',
    },

    trendingStocks: {
      height: 250,
      backgroundColor: 'white',
    },

    newestStocks: {
      height: 600,
      backgroundColor: 'white',
    },

    title: {
      fontWeight: 'bold',
      fontSize: 30,
      paddingTop: 20,
      paddingBottom: 20,
    },

    subtitle: {
      fontWeight: 'bold',
      fontSize: 20,
      padding: 10,
    },

    appLogo: {
      width: 60,
      height: 60,
      
    },
  });

export default HomePage