import React,{memo, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { useThemeContext } from '../../hooks/themeContext';
import { BallIndicator } from 'react-native-indicators';
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('window')

const EnrollButton = ({onPress, isEnrolled}) => {

  const navigation = useNavigation();
  const {theme} = useThemeContext()
  const {enrollingInProcess,loadingClasses, moveToMyClasses} = useAllSubjectsContext()


// navigates to my classes after enrolling
  useEffect(() => {
    if(moveToMyClasses){
      navigation.navigate('Home',{screen:'MyClasses'})
    }
  }, [moveToMyClasses])

  return (
    <TouchableOpacity 
      style={[styles.buttonContainer,{opacity:enrollingInProcess?0.5:1}]} 
      onPress={onPress}
      disabled={enrollingInProcess}
    >
      {!enrollingInProcess ? (
        <View style={styles.textContainer}>
        <Text style={[styles.buttonText, { color: Colors.white }]}>{isEnrolled?'Go to class': 'Enroll'}</Text>
        {isEnrolled&&<Text style={[styles.buttonSmallText, { color: Colors.white }]}>(already enrolled)</Text>}
        </View>
      ) : (
        <BallIndicator color={theme.colors.text} size={25} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor:Colors.primary,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width:width-20,
    marginHorizontal:20
  },
  buttonText: {
    color: 'white',
    fontSize: 21,
    fontFamily:'ComicNeue-Bold',
    textAlign:'center'
  },
  buttonSmallText: {
    color: 'white',
    fontSize: 15,
    fontFamily:'ComicNeue-Bold',
    textAlign:'center'
  },
  textContainer:{
    justifyContent:'center',
    alignItems:'center'
  }
});

export default memo(EnrollButton);
