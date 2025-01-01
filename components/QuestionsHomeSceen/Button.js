import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const Button = ({title, handleOnPress}) =>{
    return(
        <View style={{justifyContent:'center'}}>
            <TouchableOpacity style={styles.container} onPress={handleOnPress}>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    container:{
        marginVertical:10,
        backgroundColor: Colors.primary,
        borderRadius:5,
        padding:10,
        width:'100%',
        justifyContent:'center'
    },
    text:{
        textAlign:'center',
        marginLeft:10,
        color:'white'
    }
})