import React, { useState, useRef, memo, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import Video from 'react-native-video';
import Header from '../components/Header';
import { useContentContext } from '../hooks/contentContext';
import { useThemeContext } from '../hooks/themeContext';
import { useUserDataContext } from '../hooks/userDataContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import { useCompletedWorkContext } from '../hooks/completedWorkContext';
import { useAllSubjectsContext } from '../hooks/allSubjectsContext';
import { BallIndicator } from 'react-native-indicators';

const VideoScreen = () => {
  const { theme } = useThemeContext();
  const { contentDetails } = useContentContext();
  const playbackInstance = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showVideoControlIcons, setShowVideoControlIcons] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false); // New state for loading indicator
  const [sliderTimeout, setSliderTimeout] = useState(null); // Timeout reference for slider inactivity

  const { myContentState } = useAllSubjectsContext();
  const { userDetails } = useUserDataContext();

  const { title, downloadFilePath, contentUrl } = contentDetails;
  const { updateCompletedWork } = useCompletedWorkContext();
  const studentId = userDetails.userId; // Replace with the actual student ID
  const currentSubject = myContentState.currentSubject; // Replace with the actual subject
  const contentType = myContentState.currentContentType;
  const contentDuration = myContentState.currentContentDuration;
  const chapterName = myContentState.currentChapterName;

  let videoSource;
  if (downloadFilePath) {
    videoSource = `file://${downloadFilePath}`;
  } else {
    videoSource = contentUrl;
  }

  const updatePlaybackCallback = (status) => {
    if (status.isLoaded) {
      setSliderValue(status.positionMillis / status.durationMillis);
      setIsLoading(!status.isPlaying);
    } else {
      if (status.isLoaded === false && status.error) {
        const errorMsg = `Encountered a fatal error during playback: ${status.error}`;
        console.log(errorMsg, 'error');
        setError(errorMsg);
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
    setShowVideoControlIcons(true);
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

  const load = ({ duration }) => {
    setDuration(duration);
    setIsLoading(false);
  };

  const progress = ({ currentTime }) => {
    setCurrentTime(currentTime);
    if (!hasCompleted && currentTime >= duration * 0.95) {
      console.log('Here are the details', currentSubject, contentUrl, contentType, contentDuration);
      updateCompletedWork(currentSubject, contentUrl, contentType, contentDuration, chapterName);
      setHasCompleted(true);
    }

    // Reset the slider timeout whenever progress updates
    if (sliderTimeout) {
      clearTimeout(sliderTimeout);
    }
    setSliderTimeout(setTimeout(() => {
      if (currentTime < duration && isPlaying && !hasCompleted) {
        setShowLoadingIndicator(true);
      }
    }, 2000));
  };

  const onSlide = (slide) => {
    playbackInstance.current.seek(slide * duration);
    // Reset the slider timeout on user interaction
    if (sliderTimeout) {
      clearTimeout(sliderTimeout);
    }
    setShowLoadingIndicator(false);
  };

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
    <View style={[styles.container, { backgroundColor: '#2C2C34' }]}>
      {showVideoControlIcons && isFullScreen && (
        <TouchableOpacity
          style={[
            styles.exitFullScreenIcon,
            {
              transform: isFullScreen ? [{ rotate: '90deg' }] : [],
              bottom: isFullScreen ? '5%' : '30%',
              left: isFullScreen ? '80%' : 'auto'
            },
          ]}
          onPress={handleExitFullScreen}
        >
          <Icon name="compress" size={20} color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.videoPlayerContainer, { height: isFullScreen ? screenHeight : screenWidth / (16 / 9) }]}
        onPress={handleVideoTouch}
      >
        <View style={styles.videoWrapper}>
          <Video
            source={{ uri: videoSource }}
            ref={playbackInstance}
            style={[
              styles.videoPlayer,
              {
                width: isFullScreen ? screenHeight : screenWidth,
                height: isFullScreen ? screenWidth : screenWidth / (16 / 9),
                transform: isFullScreen ? [{ rotate: '90deg' }] : [],
              },
            ]}
            paused={!isPlaying}
            resizeMode={isFullScreen ? 'contain' : 'contain'}
            onPlaybackStatusUpdate={updatePlaybackCallback}
            onLoad={load}
            onProgress={progress}
            onError={(error) => {
              console.error('Video playback error', error);
              setError('Error loading video');
              setIsLoading(false);
            }}
          />
        </View>
        {showVideoControlIcons && !isFullScreen && (
          <TouchableOpacity style={styles.fullScreenIcon} onPress={toggleFullScreen}>
            <Icon name="expand" size={20} color="white" />
          </TouchableOpacity>
        )}
        {isLoading && contentUrl ? (
          <View style={styles.loadingIndicator}>
            <BallIndicator color="#ffffff" />
          </View>
        ) : (
          showVideoControlIcons && (
            <View
              style={[
                styles.videoControls,
                {
                  transform: isFullScreen ? [{ rotate: '90deg' }] : [],
                  bottom: isFullScreen ? 0 : '30%',
                  top: isFullScreen ? 0 : 'auto',
                },
              ]}
            >
              <TouchableOpacity style={styles.controlButton} onPress={backward}>
                <Icon name="backward" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
                <View style={styles.playPauseButtonCircle}>
                  <Icon name={isPlaying ? 'pause' : 'play'} size={20} color="white" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton} onPress={forward}>
                <Icon name="forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )
        )}
        {showVideoControlIcons && (
          <Slider
            style={[
              styles.sliderContainer,
              {
                transform: isFullScreen ? [{ rotate: '90deg' }] : [],
                top: isFullScreen ? null : 'auto',
                right: isFullScreen ? '95%' : 'auto',
                bottom: isFullScreen ? '48.225%' : 0,
              },
            ]}
            minimumValue={0}
            maximumValue={1}
            value={currentTime / duration}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FFFFFF"
            onValueChange={onSlide}
          />
        )}
      </TouchableOpacity>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {showLoadingIndicator && (
        <View style={styles.loadingIndicator}>
          <BallIndicator color="#ffffff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  videoPlayerContainer: {
    backgroundColor: 'black',
    position: 'relative',
    alignSelf: 'center',
  },
  videoWrapper: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
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
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    left: 0,
    right: 0,
  },
  videoControls: {
    position: 'absolute',
    bottom: '30%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 1,
  },
  controlButton: {
    padding: 10,
  },
  playPauseButton: {
    padding: 10,
  },
  playPauseButtonCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Transparent grey background
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default memo(VideoScreen);
