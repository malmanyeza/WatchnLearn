import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Button from './Button';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const FeedbackComponent = ({grade}) => {
  
  const navigation = useNavigation()
  const goToFeedback = ()=>{
    navigation.navigate('Feedback')
  }

  return (
    
    <View style={styles.container}>
        <View style={styles.textContainer}>
            <MaterialIcons name={'check-circle'} size={20} color={Colors.primary}/>
            <View style={{marginLeft:10}}>
                <Text style={styles.yourGrade}>Your grade</Text>
                <Text style={styles.yourGradeMessage}>We keep your highest grade</Text>
                <Text style={styles.passMessage}>TO PASS <Text style={styles.passMark}>80% or higher</Text></Text>
                <Text style={styles.grade}>Grade<Text style={[styles.gradeValue,{color:grade>=50?Colors.primary:'red'}]}> {grade}%</Text></Text>
            </View>
        </View>
        <Button handleOnPress={goToFeedback} title={'View feedback'}/>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        marginVertical:10,
        marginHorizontal:10
      },
      yourGradeMessage:{
        color:'gray',
        fontSize:12,
        marginBottom:10
      },
      yourGrade:{
        fontSize:14,
        fontWeight:'bold',
      },
      textContainer:{
        flexDirection:'row',
        marginBottom:10,
        marginVertical:10,
      },
      passMessage:{
        marginBottom:10,
        fontWeight:'bold'
      },
      passMark:{
        color:'gray',
        fontSize:12
      },
      grade:{
        fontWeight:'bold',
      },
      gradeValue:{
        color:Colors.primary,
        fontSize:18
      }
});

export default FeedbackComponent;
