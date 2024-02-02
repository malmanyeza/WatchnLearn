import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { useThemeContext } from "../../hooks/themeContext";
import Colors from "../../constants/Colors";
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const FriendSuggestionItem =()=>{

const {theme} = useThemeContext()
 
    return(
        <View style={[styles.container,{borderColor:theme.colors.tetiaryBackground}]}>
            <View style={styles.headerContainer}>
                <View style={[styles.avatarContainer,{backgroundColor:theme.colors.tetiaryBackground}]}>
                    <Icon name={'person'} size={30} color={'lightgray'}/>
                </View>
                <MaterialIcon name={'close'} size={25} color={theme.colors.tetiaryBackground} style={styles.timesIcon}/>
            </View>
            <View style={styles.body}>
                <Text style={[styles.name, {color:theme.colors.text}]}>
                    Malvern M
                </Text>
                <Text style={[styles.suggestion,{color:theme.colors.secondaryText}]}>
                    You may know each other
                </Text>
                <TouchableOpacity style={[styles.followButton]}>
                    <Text style={[styles.followButtonText,{color:theme.colors.backgroundColor}]}>FOLLOW</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    container:{
        borderWidth:2,
        borderRadius:20,
        width:'40%',
        padding:10,
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'center'
    },
    timesIcon:{
        alignSelf:'flex-end',
        position:'absolute',
        top:0,
        right:0
    },
    body:{
        justifyContent:'center',
        alignItems:'center'
    },
    name:{
        fontFamily:'ComicNeue-Bold',
        fontSize:22,
    },
    suggestion:{
        fontFamily:'ComicNeue-Regular',
        fontSize:16,
        textAlign:'center'
    },
    followButton:{
        marginTop:15,
        backgroundColor:Colors.primary,
        borderRadius:10,
        width:'100%',
        paddingVertical:5,
        borderBottomWidth:3,
        borderWidth:0.1,
        borderColor:'#1a5b7f'
    },
    followButtonText:{
        fontSize:18,
        fontFamily:'ComicNeue-Bold',
        textAlign:'center'
    },
    avatarContainer:{
        height:50,
        width:50,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        margin:15
    }
})

export default FriendSuggestionItem