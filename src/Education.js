import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { WebView } from "react-native-webview";

const Education = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/PortfolioPal_banner.png",
        }}
        style={styles.bannerImage}
      />
      <Text style={styles.educationText}>Education</Text>
      <View style={styles.textBox}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.sectionTitle}> 
            <Text style={styles.goldText}>Basic:</Text>
          </Text>
          {/* Add more Text components as needed */}
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
          {/* Add more Text components as needed */}
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

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
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
  },
  textBox: {
    backgroundColor: "#2A2C41",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 375,
  },
  scrollView: {
    maxHeight: 300, // Adjust the maxHeight as needed to fit your content
  },
  sectionTitle: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  goldText: {
    color: "gold", // Set the text color to gold
  },
  videoContainer: {
    marginTop: 20,
  },
  video: {
    width: 490,
    height: 95,
  },
  videoText: {
    marginLeft: 10, // Adjust the margin as needed
    fontSize: 30, // Adjust the font size as needed (changed to 20 for a larger font)
  },
};

export default Education;
