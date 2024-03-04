import React, { useState, useRef, memo, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import Video from 'react-native-video';
import Header from '../components/Header';
import { useContentContext } from '../hooks/contentContext';
import { useThemeContext } from '../hooks/themeContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon from react-native-vector-icons
import Slider from '@react-native-community/slider';

const VideoScreen = () => {
  const { theme } = useThemeContext();
  const { contentDetails } = useContentContext();
  const playbackInstance = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false); // Track full-screen mode
  const [showVideoControlIcons, setShowVideoControlIcons] = useState(false); // Track whether to show full-screen icon
  const [sliderValue, setSliderValue] = useState(0); // Track slider value
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const { title, downloadFilePath, contentUrl } = contentDetails;

  let videoSource;
  if (downloadFilePath) {
    videoSource = `file://${downloadFilePath}`;
  } else {
    videoSource = contentUrl;
  }

  const updatePlaybackCallback = (status) => {
    if (status.isLoaded) {
      setSliderValue(status.positionMillis / status.durationMillis); // Update slider value
    } else {
      if (status.isLoaded === false && status.error) {
        const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
        console.log(errorMsg, 'error');
      }
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleVideoTouch = () => {
    setShowVideoControlIcons((prevState) => !prevState); // Toggle full-screen icon visibility
    if (showVideoControlIcons) {
      // Start timer to hide controls after 3 seconds
      setTimeout(() => {
        setShowVideoControlIcons(false);
      }, 3000);
    }
  };

  const handleExitFullScreen = () => {
    setIsFullScreen(false);
  };

  const backward = () => {
    playbackInstance.current.seek(currentTime - 5);
  };

  const forward = () => {
    playbackInstance.current.seek(currentTime + 5);
  };

  const load = ({ duration }) => setDuration(duration);
  const progress = ({ currentTime }) => setCurrentTime(currentTime);
  const onSlide = (slide) => {
    playbackInstance.current.seek(slide * duration);
  };

  // Clear timeout when component unmounts or showVideoControlIcons changes
  useEffect(() => {
    let timeoutId;
    if (showVideoControlIcons) {
      timeoutId = setTimeout(() => {
        setShowVideoControlIcons(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showVideoControlIcons]);

  return (
    <View style={styles.container}>
      <Header title={title} />
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.videoPlayerContainer, { height: isFullScreen ? screenHeight : screenWidth / (16 / 9) }]}
        onPress={handleVideoTouch} // Handle video touch
      >
        <Video
          source={{ uri: videoSource }}
          ref={playbackInstance}
          style={[
            styles.videoPlayer,
            {
              width: isFullScreen ? screenWidth : screenWidth,
              height: isFullScreen ? screenHeight : screenWidth / (16 / 9),
              transform: isFullScreen ? [{ rotate: '90deg' }] : [],
            },
          ]}
          paused={!isPlaying}
          resizeMode={isFullScreen ? 'contain' : 'contain'}
          onPlaybackStatusUpdate={updatePlaybackCallback}
          onLoad={load}
          onProgress={progress}
        />
        {showVideoControlIcons && !isFullScreen && (
          <TouchableOpacity style={styles.fullScreenIcon} onPress={toggleFullScreen}>
            <Icon name="expand" size={30} color="white" />
          </TouchableOpacity>
        )}
        {showVideoControlIcons && isFullScreen && (
          <TouchableOpacity style={styles.exitFullScreenIcon} onPress={handleExitFullScreen}>
            <Icon name="compress" size={30} color="white" />
          </TouchableOpacity>
        )}

        {/* Video Controls */}
        {showVideoControlIcons && (
          <View style={styles.videoControls}>
            <TouchableOpacity style={styles.controlButton} onPress={backward}>
              <Icon name="backward" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
              <Icon name={isPlaying ? 'pause' : 'play'} size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={forward}>
              <Icon name="forward" size={30} color="white" />
            </TouchableOpacity>
          </View>
        )}

        {/* Seek Slider */}
        {showVideoControlIcons && (
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={currentTime / duration}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FFFFFF"
              onValueChange={onSlide}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoPlayerContainer: {
    backgroundColor: 'black',
    position: 'relative',
  },
  videoPlayer: {
    backgroundColor: 'black',
  },
  fullScreenIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
  },
  exitFullScreenIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  videoControls: {
    position: 'absolute',
    bottom: '30%',
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  controlButton: {
    marginHorizontal: 15,
  },
  playPauseButton: {
    padding: 10,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default memo(VideoScreen);
