import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { useThemeContext } from "../../hooks/themeContext";


const LeagueHeader =()=>{

const {theme} = useThemeContext()

    return(
        <View style={styles.container}>
            <Text style={[styles.header,{color:theme.colors.text}]}>Sapphire League</Text>
            <View style={[styles.barContainer,{borderColor:theme.colors.tetiaryBackground}]}>
                <View style={styles.halfBarContainer}>
                    <Text style={[styles.todayText,{color:theme.colors.secondaryText}]}>
                        TODAY
                    </Text>
                    <View style={styles.iconAndText}>
                        <Icon color={'green'} size={25} name={'chevron-up'}/>
                        <Text style={[styles.positionText,{color:'green'}]}> 1 place</Text>
                    </View>
                </View>
                <View style={[styles.middleBar,{borderColor:theme.colors.tetiaryBackground}]}/>
                <View style={styles.halfBarContainer}>
                    <Text style={[styles.todayText,{color:theme.colors.secondaryText}]}>
                        TIME LEFT
                    </Text>
                    <View style={styles.iconAndText}>
                        <Icon color={'orange'} size={25} name={'time-outline'}/>
                        <Text style={[styles.positionText,{color:'orange'}]}> 2 days</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        paddingTop:30,
        paddingHorizontal:10
    },
    barContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        borderWidth:2,
        borderRadius:20,
    },
    halfBarContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:15,
    },
    positionText:{
        fontFamily:'ComicNeue-Bold',
        fontSize:20,
        margin:5

    },
    todayText:{
        fontFamily:'ComicNeue-Bold',
        fontSize:18
    },
    middleBar:{
        borderLeftWidth:2,
        height:'100%',
    },
    iconAndText:{
        flexDirection:'row',
        alignItems:'center'
    },
    header:{
        fontFamily:'ComicNeue-Bold',
        fontSize:25,
        textAlign:'center',
        marginVertical:20
    }
})


export default LeagueHeader