import React,{memo} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';
import { useThemeContext } from '../../hooks/themeContext';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FontSizes from '../../constants/FontSizes';
import { useUserDataContext } from '../../hooks/userDataContext';

const SubjectCard = memo(({ subjectImage, subjectName, syllabus,  handleOnPress }) => {

  const {levelState} = useUserDataContext()

  const {theme} = useThemeContext()
  const {width, height} = Dimensions.get('screen')

  return (
    
    <TouchableOpacity
      onPress={handleOnPress}
      style={[styles.cardContainer, { backgroundColor: theme.colors.tetiaryBackground, height:height*0.32525, width:width*0.7 }]}
    >
        <View
        containerStyle={{ flex: 1, width: '100%', flexDirection: 'row', borderRadius: 20 }}
        layout={[
          { width: 150, height: 150, borderRadius: 20, margin: 8 },
          { width: '60%', justifyContent: 'center', marginLeft: 10 },
        ]}
      >
        <Image style={[styles.cardImage,{ height: height*0.2}]} source={{ uri: subjectImage }} />
        <View style={styles.cardTextContainer}>
          <Text style={[styles.subjectName, { color: theme.colors.text, }]}>{subjectName}</Text>
          <View style={styles.syllabusContainer}>
            <Text
              style={[
                styles.syllabus,
                { backgroundColor: theme.colors.secondaryBackground },
                { color: theme.colors.text },
              ]}
            >
            {levelState=='Tertiary'?'semester':null} {syllabus}
            </Text>
            <TouchableOpacity onPress={handleOnPress}>
              <MaterialIcons name="arrow-forward" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
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
    marginRight:16,
  },
  cardImage: {
    borderRadius: 20, // increased border radius
    margin: 8, // added margin to image
    shadowColor: '#000',
    shadowOpacity: 0.2, // added shadow opacity to image
    shadowRadius: 10,
    resizeMode:'contain',
    width:'94%',
    marginBottom:10
  },
  cardTextContainer: {
    paddingHorizontal: 10,
    paddingBottom:10,
    justifyContent: 'space-between',
    height:'25%'
  },
  subjectName: {
    fontFamily:'ComicNeue-Bold',
    fontSize: FontSizes.heading4,
    marginBottom: 10,
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
    justifyContent:'space-between',
  },
  syllabus: {
    color: '#666',
    borderRadius: 5,
    paddingVertical: 5,
    marginRight: 10,
    fontSize: FontSizes.caption,
    fontFamily:'ComicNeue-Regular',
    paddingHorizontal: 10,
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