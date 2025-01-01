import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from './ProgressBar'; // Assuming this is the progress bar component
import FontSizes from '../../constants/FontSizes';
import { useThemeContext } from '../../hooks/themeContext';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { BallIndicator } from 'react-native-indicators';

const CourseCard = ({ universityName, courseName, progress, goToClass, courseId }) => {

  const {theme} = useThemeContext()
  const {deleteInProgress, unEnroll} = useAllSubjectsContext()
  const [moreButtonClicked, setMoreButtonClicked] = useState(false)

  const deleteCourse = ()=>{
    setMoreButtonClicked(false)
    console.log('Unenrolling from course:', courseId)
    unEnroll(courseId)
  }

  const handleCardPress = () => {
    if (moreButtonClicked) {
      setMoreButtonClicked(false);
    } else {
      goToClass();
    }
  };

  return (
    <TouchableOpacity 
      onPress={handleCardPress}
      activeOpacity={moreButtonClicked ? 1 : 0.2} // Prevent opacity change when moreButtonClicked is true
      style={[styles.card, { backgroundColor: theme.colors.tetiaryBackground }]}
    >
      <View style={styles.header}>
        <Text style={[styles.universityName,{color:theme.colors.text}]}>{universityName}</Text>
        <TouchableOpacity onPress={()=>setMoreButtonClicked(true)} >
          <MaterialIcons name="more-horiz" size={24} color={ theme.colors.secondaryText} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.courseName,{color:theme.colors.text}]}>{courseName}</Text>
      <View style={styles.progressContainer}>
        <Text style={[styles.progressText,{color:theme.colors.text}]}>Progress {progress}%</Text>
        <ProgressBar progress={progress} />
      </View>
     { moreButtonClicked&&
      <TouchableOpacity 
          style={[styles.delete,{backgroundColor:theme.colors.secondaryBackground}]}
          disabled={deleteInProgress}
          onPress={deleteCourse}
      >
        <Text>Unenroll</Text> 
      </TouchableOpacity>
      }
      {deleteInProgress&&
        <View style={[styles.delete,{backgroundColor:theme.colors.secondaryBackground}]}>
          <BallIndicator color={theme.colors.text} size={15} />
        </View>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  universityName: {
    fontFamily:'ComicNeue-Regular',
    fontSize:FontSizes.body2
  },
  courseName: {
    fontFamily:'ComicNeue-Bold',
    fontSize:FontSizes.heading3,
    marginBottom: 10,
  },
  progressContainer: {
    marginTop: 20,
  },
  progressText: {
    fontFamily:'ComicNeue-Regular',
    fontSize:FontSizes.body2,
    marginBottom: 5,
  },
  delete:{
    paddingVertical:10,
    paddingHorizontal:20,
    position:'absolute',
    right:5,
    top:5,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  }
});

export default CourseCard;
