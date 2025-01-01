import React,{memo} from 'react';
import { View, StyleSheet ,Text} from 'react-native';
import Colors from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PassMessage = ({grade}) => {

    const noOfQuestions = 6;
    const message = grade>=50 ?'Congratulations you passed':'You failed to reach the pass mark'
  return (
    <View style={styles.container}>
        <View style={styles.messageContainer}>
           {grade>50? <Ionicons name= {'checkmark-circle'} size={20} color={Colors.primary} style={styles.tickIcon}/>:null}
            <Text style={[styles.message, {color: grade>50?Colors.primary:'red'}]}>{message}</Text>
        </View>
        <View style={styles.noOfQuestions}>
            <Text style={styles.text}>Practical Assignment </Text>
            <MaterialIcons name='circle' size={5} color={'gray'} />
            <Text style={styles.text}> {noOfQuestions} QUESTIONS</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    marginHorizontal:10,
    marginTop:20
  },
  messageContainer: {
    alignItems:'center',
    flexDirection:'row',
    backgroundColor:Colors.secondary,
    borderLeftColor:Colors.primary,
    borderLeftWidth:5,
    borderRadius:5,
    padding:10,
    marginBottom:10
  },
  tickIcon:{
    marginHorizontal:10,
  },
  message:{
    color:Colors.primary
  },
  noOfQuestions:{
    flexDirection:'row',
    alignItems:'center'
  },
  text:{
    color:'gray',
    fontSize:12
  }
});

export default memo(PassMessage);
