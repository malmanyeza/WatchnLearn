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
        <Text style={styles.form}>{form}</Text>
        <View style={styles.termContainer}>
          <Text style={styles.term}>Term:</Text>
          <Text style={styles.termNo}>{term}</Text>
        </View>
        <View style={styles.hoursContainer}>
          <Text style={styles.totalHours}>Total hours:</Text>
          <Text style={styles.hours}>{totalHours}</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.avatarContainer}>
           <Text>Progress:</Text>
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
    marginLeft:10,
    paddingRight:10,
    flex:1,
    width: width*0.75,
    height: height*0.18,
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
    borderRadius:22,
    marginHorizontal:8,
  },
  infoContainer: {
    flex:1,
  },
  form: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom:5,
  },
  hoursContainer:{
    flexDirection:'row',
    alignItems:'baseline',
    marginBottom:5
  },
  totalHours: {
    fontSize: 14,
    marginTop: 5,
    marginRight:20
  },
  hours:{
    marginTop:3,
    color:Colors.primary,
    fontSize:12
  },
  termContainer:{
    flexDirection:'row',
    alignItems:'baseline',
    marginBottom:5,
  },
  term: {
    fontSize: 14,
    marginTop: 5,
    marginRight:20
  },
  termNo:{
    fontWeight:'bold',
    marginTop:3,
    color:Colors.primary,
    fontSize:14
  },
  avatarContainer:{
    flexDirection:'row',
    alignItems:'baseline',
    marginBottom:5
  },
  progressContainer: {
  },
  progressText: {
    width:"100%",
    fontSize: 12,
    color:Colors.primary,
    marginLeft:20
  },
});

export default memo(MyClassCard);
