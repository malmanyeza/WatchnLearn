import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../../constants/Colors';
import Button from './Button';

const SubmissionComponent = () => {
    const subTitle = 'Atoms and matter'
    const attempts = 3
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <MaterialIcons name={'check-circle'} size={20} color={Colors.primary}/>
        <View style={{marginLeft:10}}>
          <Text style={styles.submit}>Submit your assignment</Text>
          <Text style={styles.attemptsMessage}>You have <Text style={styles.attempts}>{attempts} attempts</Text> left</Text>
        </View>
      </View>
      <Button title={'Try again'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical:10,
    marginHorizontal:10
  },
  attemptsMessage:{
    color:'gray',
    fontSize:12,
    marginBottom:10
  },
  attempts:{
    fontSize:12,
    fontWeight:'bold',
    color:'gray'
  },
  submit:{
    fontWeight:'bold',
    marginBottom:10
  },
  textContainer:{
    flexDirection:'row',
    marginBottom:10,
    marginVertical:10,
  }
});

export default SubmissionComponent;
