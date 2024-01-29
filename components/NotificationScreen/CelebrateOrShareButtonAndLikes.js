import React from "react";
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native'
import { useThemeContext } from "../../hooks/themeContext";
import Icon from 'react-native-vector-icons/Ionicons'

const CelebrateOrShareButtonAndLikes =()=>{

const {theme} = useThemeContext()

const myNotification = true
const needToFollowBack = true

    return(
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button,{borderColor:theme.colors.tetiaryBackground}]}>
                {myNotification&&<Icon name={'share-outline'} size={25} color={theme.colors.text} style={styles.shareIcon}/>}
                <Text style={[styles.buttonText,{color:theme.colors.text}]}>{myNotification? 'SHARE' : needToFollowBack?'FOLLOW BACK':'CELEBRATE'}</Text>
            </TouchableOpacity>
            <View style={styles.likesContainer}>
                <View style={[styles.likesCircle,{borderColor:theme.colors.tetiaryBackground}]}>
                    <Text style={styles.likesText}>a</Text>
                </View>
                <Text style={styles.likesNumber}>2</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    button:{
        flexDirection:'row',
        borderBottomWidth:4,
        borderWidth:2,
        padding:15,
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:20,
    },
    buttonText:{
        fontFamily:'ComicNeue-Bold',
        fontSize:18
    },
    shareIcon:{
        marginRight:5
    },
    likesContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    likesCircle:{
        borderRadius:20,
        borderWidth:2,
        height:40,
        width:40,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10
    },
    likesText:{
        textAlign:'center'
    }
})

export default CelebrateOrShareButtonAndLikes