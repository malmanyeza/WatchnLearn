import React, { useState, useRef, memo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video'; // Import from react-native-video
import Header from '../components/Header';
import { useContentContext } from '../hooks/contentContext';

const VideoScreen = () => {
  const { contentDetails } = useContentContext();
  const playbackInstance = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [isPlaying, setIsPlaying] = useState(true);

  const { title, downloadFilePath, contentUrl } = contentDetails;

  let videoSource;
  if (downloadFilePath) {
    videoSource = `file://${downloadFilePath}`; // Use downloadFilePath with file:// prefix
  } else {
    videoSource = contentUrl; // Fallback to contentUrl
  }

  const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
    position: 0,
    duration: 0,
    state: 'Buffering',
  });

  const updatePlaybackCallback = (status) => {
    if (status.isLoaded) {
      setPlaybackInstanceInfo({
        ...playbackInstanceInfo,
        position: status.positionMillis,
        duration: status.durationMillis || 0,
        state: status.didJustFinish
          ? 'Ended'
          : status.isBuffering
          ? 'Buffering'
          : status.shouldPlay
          ? 'Playing'
          : 'Paused',
      });
    } else {
      if (status.isLoaded === false && status.error) {
        const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
        console.log(errorMsg, 'error');
      }
    }
  };

  const item = contentDetails;

  return (
    <View style={styles.container}>
      <Header title={item.title} />
      <Video
        source={{uri:videoSource}} // Use uri for the source
        ref={playbackInstance}
        style={{ height: '30%', width: '100%', top: 0 }}
        paused={!isPlaying} // Use paused instead of shouldPlay
        resizeMode="contain" // Use resizeMode instead of ResizeMode.CONTAIN
        controls={true}
        onPlaybackStatusUpdate={updatePlaybackCallback}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default memo(VideoScreen);
