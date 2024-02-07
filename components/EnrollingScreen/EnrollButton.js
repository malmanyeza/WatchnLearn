import React,{memo} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { useThemeContext } from '../../hooks/themeContext';
import { BallIndicator } from 'react-native-indicators';

const {width} = Dimensions.get('window')

const EnrollButton = ({onPress}) => {
  const {theme} = useThemeContext()
  const {loadingClasses} = useAllSubjectsContext()
  return (
    <TouchableOpacity 
      style={styles.buttonContainer} 
      onPress={onPress}
      disabled={loadingClasses}
    >
      {!loadingClasses ? (
        <Text style={[styles.buttonText, { color: Colors.white }]}>Enroll</Text>
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
    borderRadius: 25,
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
});

export default memo(EnrollButton);
