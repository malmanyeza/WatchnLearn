import React,{memo} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const {width} = Dimensions.get('window')

const EnrollButton = () => {
  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <Text style={styles.buttonText}>Enroll</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center'
  },
});

export default memo(EnrollButton);
