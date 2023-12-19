import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity,Text, SafeAreaView } from 'react-native';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const Zindex = () =>{

    const [isOpen, setIsOpen] = useState(false)

    const toggle =()=>{
        setIsOpen(previousState => !previousState)
    }
  return(
    <View style={styles.mainContainer}>
    {!isOpen?
        (
            <TouchableOpacity onPress={toggle} style={styles.circleContainer}>
                <Ionicons name="ellipsis-vertical" size={20} color="white" />
            </TouchableOpacity>
         )
        :(
            <TouchableOpacity style={styles.boxContainer}>
                <TouchableOpacity onPress={toggle} style={styles.closeIconContainer}>
                    <Ionicons name="close-circle-outline" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}>Syllabus</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}>Past papers</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.text}>Forum</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
        }
    </View>
  )  
}

export default Zindex;

const styles = StyleSheet.create({
    mainContainer:{
        position: 'absolute',
        top: 15,
        right: 10,
    },
    circleContainer: {
       
        width: 35,
        height: 35,
        borderRadius: 25,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderWidth:1,
        borderColor:Colors.primary
      },
    boxContainer:{
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderWidth:1,
        borderColor:Colors.primary,
        padding:10
    },
    text:{
        color:'white',
        margin:5
    },
    closeIconContainer:{
        flexDirection:'row-reverse'
    }
})