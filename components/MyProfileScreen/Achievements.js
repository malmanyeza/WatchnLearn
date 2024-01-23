import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import Icon from 'react-native-vector-icons/Ionicons'
import { useThemeContext } from "../../hooks/themeContext";

const {width, height} = Dimensions.get('screen')

const Achievements =()=>{

const {theme} = useThemeContext()

    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={[styles.headerText,{color:theme.colors.text}]}>Achievements</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAllText}>VIEW ALL</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.achievementsContainer,{borderColor:theme.colors.tetiaryBackground}]}>
              <Icon name={'person'} color={'gray'} size={25}/>
              <View style={[styles.border,{borderColor:theme.colors.tetiaryBackground}]}/>
              <Icon name={'person'} color={'gray'} size={25}/>
              <View style={[styles.border,{borderColor:theme.colors.tetiaryBackground}]}/>
              <Icon name={'person'} color={'gray'} size={25}/>
            </View>
            <View style={[styles.lowerBorder,{borderColor:theme.colors.tetiaryBackground}]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
       marginVertical:10,
       marginHorizontal:20
    },
    headerContainer:{
        marginBottom:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    headerText:{
        fontSize:25,
        fontFamily:'ComicNeue-Bold'
    },
    viewAllText:{
        fontFamily:'ComicNeue-Bold',
        color: Colors.primary
    },
    achievementsContainer:{
        flexDirection:'row',
        height: height*0.2,
        borderWidth:2,
        borderRadius:20,
        justifyContent:'space-evenly',
        alignItems:'center',
        marginBottom:30,
    },
    border:{
        borderRightWidth:2,
        height:'100%'

    },
    lowerBorder:{
        borderBottomWidth:3,
        marginHorizontal:-20
    }
})

export default Achievements
