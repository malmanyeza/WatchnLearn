import React from "react";
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useThemeContext } from "../../hooks/themeContext";
import Colors from "../../constants/Colors";


const AvatarHeader =()=>{

const {theme} = useThemeContext()

    return(
        <View style={styles.container}>
            <View style={[styles.avatar,{backgroundColor:theme.colors.secondaryText}]}>
                <Icon name={'person'} size={30} color={theme.colors.tetiaryBackground}/>
            </View>
            <TouchableOpacity>
                <Text style={styles.text}>CHANGE AVATAR</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical:20,
        justifyContent:'center',
        alignItems:'center'
    },
    avatar:{
        justifyContent:'center',
        height:80,
        width:80,
        borderRadius:40,
        marginBottom:20,
        alignItems:'center'
    },
    text:{
        fontFamily:'ComicNeue-Bold',
        fontSize:22,
        color:Colors.primary
    }
})

export default AvatarHeader