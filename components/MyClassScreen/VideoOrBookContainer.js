import React,{memo} from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { useThemeContext } from '../../hooks/themeContext';

const VideoOrBookContainer = ({ title, contentType, duration, onPressHandle, onPressDownloadButton,downloadPath }) => {

const {theme} = useThemeContext()

  return (
    <TouchableOpacity onPress={onPressHandle} style={
      [
        styles.container,
        {backgroundColor:theme.colors.primaryBackground}
      ]
    }>
      { 
        contentType==='video' ? (
          <Ionicons name="videocam-outline" size={24} color={theme.colors.text} />
        ) : (
          <Ionicons name="book-outline" size={24} color={theme.colors.text} />
        )
      }
      <View style={styles.infoContainer}>
        <Text style={[styles.title, {color: theme.colors.text}]}>{title}</Text>
        <Text style={[styles.subtitle,{color: theme.colors.secondaryText}]}>{contentType==='video' ? 'Video' : 'Reading'}.({duration})</Text>
      </View>
      {downloadPath ? <Ionicons name="checkmark-circle" size={25} color={theme.colors.text} /> 
        :
        <TouchableOpacity onPress={onPressDownloadButton} >
          <Ionicons name="cloud-download-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 25,
    backgroundColor: 'white',
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontFamily:'ComicNeue-Bold',
    fontSize: 20,
  },
  subtitle: {
    fontFamily:'ComicNeue-Bold',
    fontSize: 18,
    color: '#666',
  },
});

export default VideoOrBookContainer;
