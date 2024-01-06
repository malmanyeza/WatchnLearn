import React,{memo} from 'react';
import { View, Text, Image,Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';
import Colors from '../../constants/Colors'
import { useThemeContext } from '../../hooks/themeContext';

const {width, height} = Dimensions.get('window')

const MyClassCard = ({ subjectImage, form, totalHours, progress,goToClass,term }) => {

const {theme} = useThemeContext()



  return (
    <TouchableOpacity onPress={goToClass} style={[
      styles.container,
      {backgroundColor:theme.colors.tetiaryBackground}
      ]}>
      <Image source={subjectImage} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.form,{color:theme.colors.secondaryText}]}>{form}</Text>
        <Text style={[styles.term,{color:theme.colors.secondaryText}]}>Term: {term}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.avatarContainer}>
           <Text style={[styles.progressTitle,{color:theme.colors.secondaryText}]}>Progress:</Text>
           <Text style={styles.progressText}>{progress}%</Text>
          </View>
          <ProgressBar progress={progress} />
        </View>
      </View>
    </TouchableOpacity>
  );
}; 

const styles = StyleSheet.create({
  container: {
    paddingRight:10,
    flex:1,
    width: width*0.8,
    height: height*0.20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginRight:20,
    marginTop: 15,
    marginBottom:20,
    elevation: 5,
  },
  image: {
    width: '40%',
    height: '90%',
    borderRadius:15,
    marginHorizontal:8,
  },
  infoContainer: {
    flex:1,
    width:'100%',
    justifyContent:'space-between'
  },
  form: {
    fontFamily:'ComicNeue-Bold',
    fontSize: 25,
    marginBottom:5,
  },
  termContainer:{
    flexDirection:'row',
    alignItems:'baseline',
    marginBottom:5,
  },
  term: {
    fontFamily:'ComicNeue-Bold',
    fontSize: 22,
    marginTop: 5,
    marginBottom:10
  },
  avatarContainer:{
    width:'100%',
    flexDirection:'row',
    alignItems:'baseline',
    marginBottom:5,
    justifyContent:'space-between'
  },
  progressContainer: {
    width:'100%'
  },
  progressText: {
    fontSize: 20,
    color:Colors.primary,
    marginLeft:20,
    fontFamily:'ComicNeue-Bold',
    alignSelf:'flex-end'
  },
  progressTitle:{
    fontFamily:'ComicNeue-Bold',
    fontSize: 20,
  }
});

export default memo(MyClassCard);
