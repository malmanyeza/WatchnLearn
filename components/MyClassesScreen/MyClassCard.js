import React, { memo } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';

const { width, height } = Dimensions.get('window');

const MyClassCard = ({ subjectImage, form, totalHours, progress, goToClass, term }) => {
  const { theme } = useThemeContext();

  return (
    <TouchableOpacity onPress={goToClass} style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Image source={{ uri: `file://${subjectImage}` }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.form, { color: theme.colors.text }]}>Form: {form}</Text>
        <Text style={[styles.term, { color: theme.colors.text }]}>Term: {term}</Text>

        {progress > 0 ? (
          <View style={styles.progressContainer}>
            <View style={styles.avatarContainer}>
              <Text style={[styles.progressTitle, { color: theme.colors.text }]}>Progress:</Text>
              <Text style={[styles.progressText,{color:theme.colors.text}]}>{progress}%</Text>
            </View>
            <ProgressBar progress={progress} />
          </View>
        ) : (
          <Text style={[styles.noProgressText, { color: theme.colors.text }]}>
            Let's start learning!
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    flex: 1,
    width: width * 0.8,
    height: height * 0.20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 15,
    marginRight: 10,
    marginBottom: 20,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  image: {
    width: '40%',
    height: '90%',
    borderRadius: 15,
    marginHorizontal: 8,
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  form: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 20,
    marginBottom: 5,
  },
  term: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 20,
    marginTop: 5,
    marginBottom: 10,
  },
  avatarContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  progressContainer: {
    width: '100%',
  },
  progressText: {
    fontSize: 20,
    marginLeft: 20,
    fontFamily: 'ComicNeue-Bold',
    alignSelf: 'flex-end',
  },
  progressTitle: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 20,
  },
  noProgressText: {
    fontSize: 18,
    fontFamily: 'ComicNeue-Bold',
    color: Colors.primary, // Adjust color as needed
  },
});

export default memo(MyClassCard);
