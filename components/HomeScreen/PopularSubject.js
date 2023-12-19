import React,{memo} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';

const { width, height } = Dimensions.get('window');

const PopularSubject = ({ subjectName, rating, enrollers, subjectImage, syllabus, handleOnPress }) => {

const {theme} = useThemeContext()


  return (
    <TouchableOpacity onPress={handleOnPress} style={[
      styles.container,
      {backgroundColor:theme.colors.tetiaryBackground}
      ]}>
      <View style={styles.leftColumn}>
        <Image source={subjectImage} style={styles.subjectImage} />
      </View>
      <View style={styles.middleColumn}>
        <Text style={[
          styles.subjectName,
          {color:theme.colors.text}
          ]}>{subjectName}</Text>
        <View style={styles.tutorInfo}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="gray" />
          <Text style={[
            styles.ratingText,
            {color:theme.colors.text}
            ]}>{rating}</Text>
          <Text style={[
            styles.ratingText,
            {color:theme.colors.text}
            ]}>{'('+enrollers+')'}</Text>
        </View>
          <Text style={[
            styles.syllabus,
            {backgroundColor:theme.colors.secondaryBackground},
            {color:theme.colors.text}
            ]}>{syllabus}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderRadius: 10,
    width: width - 20,
    padding: 5,
  },
  leftColumn: {
    flex: 1,
  },
  middleColumn: {
    flex: 3,
    alignItems:'baseline'
  },
  subjectImage: {
    width:70,
    height: 70,
    borderRadius: 10,
  },
  subjectName: {
    marginBottom:10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tutorInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent:'space-between'
  },
  tutorAvatar: {
    width: 25,
    height: 25,
    borderRadius: 15,
    marginRight: 5,
  },
  tutorName: {
    fontSize: 14,
  },
  syllabus: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginLeft: 30
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16
  }
});

export default memo(PopularSubject);
