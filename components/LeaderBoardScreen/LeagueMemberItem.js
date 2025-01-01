import React from "react";
import {View, StyleSheet, Text, Image} from 'react-native'
import { useThemeContext } from "../../hooks/themeContext";

const LeagueMemberItem =()=>{

const {theme} = useThemeContext()

const position = 5

    return(
        <View style={[styles.container]}>
            { position<=3?
                <View style={styles.tagAndNumber}>
                    
                    <Text style={[styles.positionAboveThreeNumber,{color:theme.colors.text}]}>1</Text>
                </View>
                :
                <Text style={styles.positionBelowThreeNumber}>1</Text>
            }
            <View style={[styles.avatarContainer,{ backgroundColor:theme.colors.tetiaryBackground}]}>
                <View style={[styles.onlineDot,{backgroundColor:theme.colors.primaryBackground}]}>
                    <View style={styles.innerGreenDot}/>
                </View>
            </View>
            <Text style={[styles.name,{color:theme.colors.text}]}>Malvern</Text>
            <Text style={[styles.xpText,{color:theme.colors.text}]}t>1836 XP</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center'
    },
    tagIcon:{
        width:40,
        height:40,
        resizeMode:'contain'
    },
    avatarContainer:{
        height:55,
        width:55,
        borderRadius:30
    },
    name:{
        marginLeft:30,
        fontSize:20,
        fontFamily:'ComicNeue-Bold'
    },
    xpText:{
        fontFamily:'ComicNeue-Regular',
        fontSize:23,
        right:0,
        position:'absolute',
        marginRight:10
    },
    onlineDot:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        right:0,
        bottom:0, 
        height:14,
        width:14,
        borderRadius:15,
        
    },
    innerGreenDot:{
        backgroundColor:'green',
        height:12,
        width:12,
        borderRadius:15,
    },
    positionAboveThreeNumber:{
        position:"absolute",
        fontFamily:'ComicNeue-Bold',
        fontSize:22
    },
    tagAndNumber:{
        justifyContent:'center',
        alignItems:'center'
    },
    positionBelowThreeNumber:{
        fontFamily:'ComicNeue-Bold',
        color:'green',
        fontSize:22,
        marginHorizontal:20
    }
})

export default LeagueMemberItem
