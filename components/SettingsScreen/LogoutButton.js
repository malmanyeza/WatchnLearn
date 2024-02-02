import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { useThemeContext } from "../../hooks/themeContext";
import Colors from "../../constants/Colors";

const LogoutButton =({onPress})=>{

    const {theme} = useThemeContext() 

    return(
        <TouchableOpacity style={[styles.button,{borderColor:theme.colors.tetiaryBackground}] } onPress={onPress}>
            <Text style={[styles.buttonText,{color:Colors.primary}]}>Log out</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        borderRadius:20,
        borderWidth:2,
        borderBottomWidth:5,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:20,
        marginHorizontal:20,
        marginBottom:50
    },
    buttonText:{
        fontFamily:'ComicNeue-Bold',
        fontSize:20
    }
})

export default LogoutButton