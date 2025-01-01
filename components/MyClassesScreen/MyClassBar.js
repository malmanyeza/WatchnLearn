import React,{memo} from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity, Dimensions } from 'react-native';
import ProgressBar from './ProgressBar';

const screenWidth = Dimensions.get('window').width;

const MyClassBar = ({subjectLevel, subjectImage, tutorName, tutorImage, progress}) => {
    
  return (
    <TouchableOpacity style={styles.container}>
      {/* Left column */}
      <View style={styles.leftColumn}>
        <Image
          source={subjectImage}
          style={styles.image}
        />
      </View>

      {/* Right column */}
      <View style={styles.rightColumn}>
        <Text style={styles.subjectName}>{subjectLevel}</Text>

        {/* Tutor info */}
        <View style={styles.tutorInfo}>
          <Image
            source={tutorImage}
            style={styles.tutorAvatar}
          />
          <Text style={styles.tutorName}>{tutorName}</Text>
        </View>

        {/* Progress bar */}
        <ProgressBar percentage={progress} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 5,
    width:screenWidth-20,
    marginBottom:10
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 10,
  },
  rightColumn: {
    flex: 3,
    paddingVertical: 5,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tutorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  tutorAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  tutorName: {
    fontSize: 14,
  },
  progressBar: {
    marginTop: 10,
    height: 10,
    backgroundColor: '#f0f0f0', // Change this to your progress bar background color
    borderRadius: 5,
    // Add width style to control the width of the progress bar based on the progress
  },
});

export default memo(MyClassBar);
