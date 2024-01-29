import React from "react";
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import { useThemeContext } from "../../hooks/themeContext";
import CelebrateOrShareButtonAndLikes from "./CelebrateOrShareButtonAndLikes";

const NotificationContainer =()=>{

const {theme} = useThemeContext()

const personalNotification = false

    return(
        <View style={styles.outContainer}>
            <View style={[styles.container,{borderColor:theme.colors.tetiaryBackground}]}>
                <View style={styles.headerInfo}>
                    <View style={styles.userInfoAndMessage}>
                        <View style={styles.userInfo}>
                            <View style={[styles.avatar,{backgroundColor:theme.colors.secondaryText}]}>

                            </View>
                            <View>
                                <Text style={[styles.name,{color:theme.colors.text}]}>Malvern</Text>
                                <Text style={[styles.duration,{color:theme.colors.tetiaryBackground}]}>4 days</Text>
                            </View>
                        </View>
                        <Text style={[styles.message,{color:theme.colors.text}]}>Completed a 14 day streak!</Text>
                    </View>
                    <Image
                        source={require('../../assets/images/icons8-flame-94.png')}
                        style={styles.imageIcon}
                    />
                </View>
                {!personalNotification&&<CelebrateOrShareButtonAndLikes/>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outContainer:{
        marginHorizontal:10
    },
    container:{
        borderWidth:2,
        borderRadius:20,
        padding:10,
        width:'100%',
    },
    headerInfo:{
        flexDirection:'row',
    },
    userInfo:{
        flexDirection:'row',
        alignItems:'center'
    },
    avatar:{
        width:45,
        height:45,
        borderRadius:40,
        marginRight:10
    },
    message:{
        marginTop:30,
        fontFamily:'ComicNeue-Regular',
        fontSize:20,
        marginBottom:20
    },
    name:{
        marginBottom:2.5,
        fontFamily:'ComicNeue-Bold',
        fontSize:18
    },
    duration:{
        marginTop:2.5,
        fontFamily:'ComicNeue-Bold',
        fontSize:18
    },
    imageIcon:{
        height:100,
        width:100,
        resizeMode:'contain',
        position:'absolute',
        right:-5
    }

})

export default NotificationContainer