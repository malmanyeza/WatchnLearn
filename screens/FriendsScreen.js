import React from "react";
import {View, StyleSheet, Text} from 'react-native'
import { useThemeContext } from "../hooks/themeContext";
import Header from "../components/Header";
import SwipableTopTab from "../components/FriendsScreen/SwipableTopTab";


const FriendsScreen = () =>{

const {theme} = useThemeContext()

    return(
        <View style={[styles.container,{backgroundColor:theme.colors.primaryBackground}]}>
            <Header
                title={'Find friends'}
            />
            <SwipableTopTab/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})

export default FriendsScreen