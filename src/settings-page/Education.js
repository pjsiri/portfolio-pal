import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode } from '../common/darkmode/DarkModeContext';

const Education = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); 

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    searchYouTube();
  }, []);

  const styles = {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 0,
      backgroundColor: isDarkMode ? '#333' : '#fff',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    backButtonContainer: {
      marginRight: 10,
    },
    inputIcon: {
      width: 24,
      height: 24,
    },
    bannerImage: {
      width: 300,
      height: 200,
      resizeMode: 'contain',
    },
    educationText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: -55,
      color: isDarkMode ? 'lightblue' : 'black',
    },
    textBox: {
      backgroundColor: isDarkMode ? '#333' : '#fff',
      padding: 10,
      margin: 10,
      borderRadius: 5,
      width: 375,
      height: 400,
      borderColor: '#777',     
      borderWidth: 2,          
    },
    scrollView: {
      maxHeight: 400,
    },
    sectionTitle: {
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      color: isDarkMode ? 'white' : 'black',
    },
    videoContainer: {
      marginBottom: 30,
    },
    video: {
      width: 490,
      height: 90,
    },
    flatListContainer: {
      maxHeight: 500,
    },
    searchInput: {
      backgroundColor: isDarkMode ? '#404040' : '#f8f8ff', 
      margin: 10,
      borderRadius: 5,
      width: 375,
      height: 40,
    },
    
  };

  // Function to search YouTube videos
  const searchYouTube = async () => {
    try {
      // Include "crypto" and "stocks" in the query to prioritize related videos
      const updatedQuery = `${query} crypto stocks`;
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBooVy4u6DM90b76M3366Ceca957awSs3g&q=${updatedQuery}&type=video&part=snippet&maxResults=10`
      );
      const data = await response.json();
      // Limit the number of results to 5
      const limitedResults = data.items.slice(0, 5);
      setSearchResults(limitedResults);
    } catch (error) {
      console.error('Error searching YouTube:', error);
    }
  };

  const renderVideoItem = ({ item }) => {
    const categoryColor = isDarkMode ? 'white' : 'black';
    const videoContainerBackgroundColor = isDarkMode ? '#444' : '#fafafa';
  
    return (
      <View style={[styles.videoContainer, { backgroundColor: videoContainerBackgroundColor }]}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            navigation.navigate('VideoDetail', { videoId: item.id.videoId });
          }}
        >
          <Image
            source={{ uri: item.snippet.thumbnails.high.url }}
            style={{ width: 140, height: 100, marginRight: 10 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, color: categoryColor, flexWrap: 'wrap' }}>
              {item.snippet.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButtonContainer} onPress={handleBack}>
          <Image
            source={{
              uri: 'https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/back.png',
            }}
            style={[styles.inputIcon, { tintColor: isDarkMode ? 'white' : 'black' }]
            }
          />
        </TouchableOpacity>
        <Image
          source={{
            uri: 'https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PortfolioPal_banner.png',
          }}
          style={styles.bannerImage}
        />
      </View>
      <Text style={styles.educationText}>Education</Text>
      <TextInput
        style={[
          styles.searchInput,
          { color: isDarkMode ? 'white' : 'black' }
        ]}
        placeholder="Search YouTube videos"
        placeholderTextColor={isDarkMode ? 'white' : 'black'}
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <Button title="Search" onPress={searchYouTube} />
      <View style={styles.textBox}>
        <View style={styles.flatListContainer}>
          <FlatList
            data={searchResults}
            renderItem={renderVideoItem}
            keyExtractor={(item, index) => item.id.videoId}
          />
        </View>
      </View>
    </View>
  );
};

export default Education;