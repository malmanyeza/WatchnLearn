import React,{memo} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';

const SubjectCard = memo(({ subjectImage, subjectName, syllabus, rating, handleOnPress, enrollers }) => {


  const {theme} = useThemeContext()
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={handleOnPress} style={[
      styles.cardContainer,
      {backgroundColor:theme.colors.tetiaryBackground}
      ]}>
      <Image style={styles.cardImage} source={subjectImage} />
      <View style={styles.cardTextContainer}>
        <Text style={[
          styles.subjectName,
          {color:theme.colors.text}
          ]}>{subjectName}</Text>
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
        <View style={styles.syllabusContainer}>
          <Text style={[
            styles.syllabus,
            {backgroundColor:theme.colors.secondaryBackground},
            {color:theme.colors.text}
            ]}>{syllabus}</Text>
          <TouchableOpacity onPress={handleOnPress}>
            <MaterialIcons name="arrow-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>   
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20, // increased border radius
    shadowColor: '#000',
    shadowOpacity: 0.3, // increased shadow opacity
    shadowRadius: 30,
    elevation: 5,
    marginHorizontal:10,
    marginRight:20,
    marginBottom:10,
    width: 250, // set card width to 60% of screen width
  },
  cardImage: {
    borderRadius: 20, // increased border radius
    height: 150,
    margin: 8, // added margin to image
    shadowColor: '#000',
    shadowOpacity: 0.2, // added shadow opacity to image
    shadowRadius: 10,
    resizeMode:'cover',
    width:'94%'
  },
  cardTextContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  subjectName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tutorName: {
    color: '#666',
    marginBottom: 10,
    marginLeft:5
  },
  tutorContainer:{
    flexDirection:'row'
  },
  syllabusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  syllabus: {
    color: '#666',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  cardArrow: {
    height: 15,
    width: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom:10
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16
  }
});

export default SubjectCard