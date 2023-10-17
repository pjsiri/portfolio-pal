import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

const VideoDetail = ({ route }) => {
  const { videoId } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: `https://www.youtube.com/watch?v=${videoId}` }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default VideoDetail;
