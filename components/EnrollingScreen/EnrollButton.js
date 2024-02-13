import React,{memo} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { useThemeContext } from '../../hooks/themeContext';
import { BallIndicator } from 'react-native-indicators';

const {width} = Dimensions.get('window')

const EnrollButton = ({onPress, isEnrolled}) => {
  const {theme} = useThemeContext()
  const {enrollingInProcess,loadingClasses} = useAllSubjectsContext()
  return (
    <TouchableOpacity 
      style={styles.buttonContainer} 
      onPress={onPress}
      disabled={loadingClasses}
    >
      {!enrollingInProcess ? (
        <View style={styles.textContainer}>
        <Text style={[styles.buttonText, { color: Colors.white }]}>{isEnrolled?'Go to class': 'Enroll'}</Text>
        <Text style={[styles.buttonSmallText, { color: Colors.white }]}>{isEnrolled?'(already enrolled)':''}</Text>
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
