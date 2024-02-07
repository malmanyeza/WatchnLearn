import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useThemeContext } from "../../hooks/themeContext";

const FriendItem =()=>{

    const {theme} = useThemeContext()

    const name = "Malvern"

    const xps = 10234

    return(
        <View>
            <View style={styles.avatar}>

            </View>
            <View style={styles.userInfo}> 
                <Text style={[styles.userName, {color:theme.colors.text}]}>
                    {name}
                </Text>
                <Text style={[styles.xpAmount, {color:theme.colors.tetiaryBackground}]}>
                    {xps}
                </Text>
            </View>
            <Icon name="chevron-forward" size={30} color={theme.colors.tetiaryBackground} style={styles.chevron}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    },
    avatar:{
        height:60,
        width:60,
        borderRadius:30,
        marginHorizontal:20
    },
    userInfo:{

    },
    userName:{
        fontFamily:'ComicNeue-Bold',
        fontSize:22
    },
    xpAmount:{
        fontFamily:'ComicNeue-Regular',
        fontSize:20
    },
    chevron:{
        position:'absolute',
        right:20
    }
})

export default FriendItem