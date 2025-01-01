import React,{memo} from 'react';
import { View, Text, Image, StyleSheet,Dimensions } from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';

const {width ,height} = Dimensions.get('window')

const CoverAndHeader = ({ subjectImage, subjectName, tutorName, tutorAvatar, rating }) => {
  return (
    <View style={styles.container}>
      <Image source={{uri:subjectImage}} style={styles.coverImage} />
      <View style={styles.nameAndRating}>
        <Text style={styles.subjectName}>{subjectName}</Text>
      </View>
      <View style={styles.tutorInfoContainer}>
        <Image source={{uri:tutorAvatar}} style={styles.tutorAvatar} />
        <Text style={styles.tutorName}>{tutorName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal:10,
    marginBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: 0.3*height,
    borderRadius: 15,
    resizeMode:'contain'
  },
  nameAndRating:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingRight:20,
    paddingLeft:5
  },
  subjectName: {
    fontFamily:'ComicNeue-Bold',
    fontSize: 27,
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tutorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:5
  },
  tutorAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  tutorName: {
    fontFamily:'ComicNeue-Bold',
    fontSize: 19,
  },
});

export default memo(CoverAndHeader);
