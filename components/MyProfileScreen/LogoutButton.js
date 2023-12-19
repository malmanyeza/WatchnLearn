import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from "../../constants/Colors";

const LogOutButton = () =>{
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.innerContainer}>
                <Ionicons name={'log-out-outline'} size={20} color='white'/>
                <Text style={styles.text}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LogOutButton

const styles = StyleSheet.create({
    container:{
        marginTop:20,
        backgroundColor: Colors.primary,
        borderRadius:8,
        padding:10,
        width:120,
        marginLeft:20,
        justifyContent:'center'
    },
    innerContainer:{
        flexDirection:'row',
        justifyContent:'center'
    },
    text:{
        marginLeft:10,
        color:'white'
    }
})