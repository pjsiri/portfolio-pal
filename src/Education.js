import React from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { useDarkMode } from "./DarkModeContext"; 

const Education = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useDarkMode(); 

  const handleBack = () => {
    navigation.goBack();
  };

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
    },
    scrollView: {
      maxHeight: 600, 
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
      marginTop: 20,
    },
    video: {
      width: 490,
      height: 95,
    },
    videoText: {
      marginLeft: 10,
      fontSize: 30,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButtonContainer} onPress={handleBack}>
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
        <ScrollView style={styles.scrollView}>
          <Text style={styles.sectionTitle}>
            <Text style={styles.goldText}>Basic:</Text>
          </Text>
          <View style={styles.videoContainer}>
            <WebView
              source={{
                html: `
                    <html>
                      <body>
                        <div style="display: flex; align-items: center;">
                          <a href="https://www.youtube.com/watch?v=i5OZQQWj5-I" target="_blank">
                            <img src="https://img.youtube.com/vi/i5OZQQWj5-I/maxresdefault.jpg" alt="YouTube Thumbnail" width="300" height="169" />
                          </a>
                          <div style="flex: 1; padding-left: 10px;">
                            <p style="font-size: 20px;">
                              Emphasizes the importance of Trading<br>
                              Simulators,Recording and to analyse
                              trades.
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
          <Text></Text>
          <Text style={styles.sectionTitle}>
            <Text style={styles.goldText}>Intermediate:</Text>
          </Text>
          <View style={styles.videoContainer}>
            <WebView
              source={{
                html: `
                  <html>
                    <body>
                      <div style="display: flex; align-items: center;">
                        <a href="https://www.youtube.com/watch?v=Ay-zLahPFEk" target="_blank">
                          <img src="https://img.youtube.com/vi/Ay-zLahPFEk/maxresdefault.jpg" alt="YouTube Thumbnail" width="300" height="169" />
                        </a>
                        <div style="flex: 1; padding-left: 10px;">
                          <p style="font-size: 20px;">
                            Talks about Emotional Resilience, <br>
                            Investment Horizon and Data Accessiblity <br>
                            and Biases.
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
          <Text></Text>
          <Text style={styles.sectionTitle}>
            <Text style={styles.goldText}>Advance:</Text>
          </Text>
          <View style={styles.videoContainer}>
            <WebView
              source={{
                html: `
                  <html>
                    <body>
                      <div style="display: flex; align-items: center;">
                        <a href="https://www.youtube.com/watch?v=sADnR8p9SGM" target="_blank">
                          <img src="https://img.youtube.com/vi/sADnR8p9SGM/maxresdefault.jpg" alt="YouTube Thumbnail" width="300" height="169" />
                        </a>
                        <div style="flex: 1; padding-left: 10px;">
                          <p style="font-size: 20px;">
                            .........................<br>
                            .........................
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
        </ScrollView>
      </View>
    </View>
  );
};

export default Education;
