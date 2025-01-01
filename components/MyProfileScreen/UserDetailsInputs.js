import React from "react";
import {View, Text,StyleSheet, ScrollView } from 'react-native'
import { TextInput } from "react-native-paper";
import { useUserDataContext } from "../../hooks/userDataContext";
import { useThemeContext } from "../../hooks/themeContext";
import InputComponent from "./InputComponent";


const UserDetailsInputs =()=>{

    const {theme} = useThemeContext()

    const {userDetails} = useUserDataContext()

    return(
        <View style={[styles.container,{backgroundColor:theme.colors.primaryBackground}]}>
           <InputComponent
             inputType={'firstName'}
             inputValue={userDetails.firstName}
             inputTile={'Name'}
           />
           <InputComponent
             inputType={'lastName'}
             inputValue={userDetails.lastName}
             inputTile={'lastName'}
           />
           <InputComponent
             inputType={'email'}
             inputValue={userDetails.email}
             inputTile={'Email'}
           />
            <InputComponent
             inputType={'phone'}
             inputValue={userDetails.phone}
             inputTile={'Phone Number'}
           />
           <InputComponent
             inputType={'password'}
             inputValue={userDetails.password}
             inputTile={'Password'}
           />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20
    },
    inputTitleText:{
        fontFamily:'ComicNeue-Bold',
        fontSize:18
    }
})

export default UserDetailsInputs