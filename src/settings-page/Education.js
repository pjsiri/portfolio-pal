import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { useDarkMode } from "../common/darkmode/DarkModeContext";

const Education = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode();

  const handleBack = () => {
    navigation.goBack();
  };

  const videoData = [
    {
      category: "Beginner",
      title: "Summary:",
      url: "https://www.youtube.com/watch?v=i5OZQQWj5-I",
      thumbnail: "https://img.youtube.com/vi/i5OZQQWj5-I/maxresdefault.jpg",
      description:
        "Learn stock trading as a complete beginner:<br>Avoid risking real money; use free trading <br>simulators. Record and analyze every trade. <br>Mastery before profits. Potential video series.",
    },
    {
      title: "Summary:",
      url: "https://www.youtube.com/watch?v=8mBmwomJcP8&ab_channel=KrownChakraTv",
      thumbnail: "https://img.youtube.com/vi/8mBmwomJcP8/maxresdefault.jpg",
      description:
        "Promoting market confidence and taking <br>financial risks for wealth and success.",
    },

    {
      category: "Intermediate",
      title: "Summary:",
      url: "https://www.youtube.com/watch?v=Ay-zLahPFEk",
      thumbnail: "https://img.youtube.com/vi/Ay-zLahPFEk/maxresdefault.jpg",
      description:
        "Individual investors now have better access <br>to information. The stock market isn't a <br>lottery; research companies for success.",
    },
    {
      title: "Summary:",
      url: "https://www.youtube.com/watch?v=DBkvdlAlNDY&ab_channel=CollectionCrypto",
      thumbnail: "https://img.youtube.com/vi/DBkvdlAlNDY/maxresdefault.jpg",
      description:
        "Shows the Step by Step Guide too investing <br> in binance.",
    },
    {
      category: "Advance",
      title: "Summary:",
      url: "https://www.youtube.com/watch?v=X6bRU-3yyEY&ab_channel=TechShiksha",
      thumbnail: "https://img.youtube.com/vi/X6bRU-3yyEY/maxresdefault.jpg",
      description:
        "How to set up an Excel Sheet to Track your <br>Portfolio Investments.",
    },
    {
      title: "Summary:",
      url: "https://www.youtube.com/watch?v=aNs0Yo5amF4&ab_channel=Pete-HowToAnalyst",
      thumbnail: "https://img.youtube.com/vi/aNs0Yo5amF4/maxresdefault.jpg",
      description:
        "Step by Step guide in creating a crypto <br>portfolio dashboard in Excel.",
    },
  ];

  const styles = {
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: 0,
      backgroundColor: isDarkMode ? "#333" : "#fff",
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
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
      resizeMode: "contain",
    },
    educationText: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: -25,
      color: isDarkMode ? "lightblue" : "black",
    },
    textBox: {
      backgroundColor: isDarkMode ? "#2A2C41" : "#fff",
      padding: 10,
      margin: 10,
      borderRadius: 5,
      width: 375,
      height: 450,
    },
    scrollView: {
      maxHeight: 400,
    },
    sectionTitle: {
      fontWeight: "bold",
      textDecorationLine: "underline",
      color: isDarkMode ? "gold" : "black",
    },
    goldText: {
      color: "gold",
    },
    videoContainer: {
      marginBottom: 20,
    },
    video: {
      width: 490,
      height: 90,
    },
    flatListContainer: {
      maxHeight: 500,
    },
  };

  const renderVideoItem = ({ item }) => {
    const categoryColor = isDarkMode ? "gold" : "black";

    return (
      <View style={styles.videoContainer}>
        <Text style={{ fontSize: 16, color: categoryColor }}>
          {item.category}
        </Text>
        <WebView
          source={{
            html: `
              <html>
                <body>
                  <div style="display: flex; align-items: center;">
                    <a href="${item.url}" target="_blank">
                      <img src="${item.thumbnail}" alt="YouTube Thumbnail" width="300" height="169" />
                    </a>
                    <div style="flex: 1; padding-left: 10px;">
                      <p style="font-size: 20px;">
                        <strong>${item.title}</strong>
                      </p>
                      <p style="font-size: 20px;">
                        ${item.description}
                      </p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          }}
          style={styles.video}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={handleBack}
        >
          <Image
            source={{
              uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/back.png",
            }}
            style={styles.inputIcon}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PortfolioPal_banner.png",
          }}
          style={styles.bannerImage}
        />
      </View>
      <Text style={styles.educationText}>Education</Text>
      <View style={styles.textBox}>
        <View style={styles.flatListContainer}>
          <FlatList
            data={videoData}
            renderItem={renderVideoItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default Education;
