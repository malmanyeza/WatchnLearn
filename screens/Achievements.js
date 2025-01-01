import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import { useThemeContext } from "../hooks/themeContext";
import Header from "../components/Header";

const AchievementsScreen = ()=>{

const {theme} = useThemeContext()

    return(
        <View style={[styles.container,{backgroundColor:theme.colors.primaryBackground}]}>
            <Header
                title={'Other\'s name'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})


export default AchievementsScreen