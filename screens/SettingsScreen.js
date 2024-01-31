import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SettingsHeader from "../components/SettingsScreen/SettingsHeader";
import { useThemeContext } from "../hooks/themeContext";
import UserDetailsInputs from "../components/SettingsScreen/UserDetailsInputs";


const SettingsScreen = () => {

const {theme} = useThemeContext()

    return (
        <View style={[styles.container,{backgroundColor:theme.colors.primaryBackground}]}>
         <SettingsHeader
            title={'Account'}
         />
         <UserDetailsInputs/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SettingsScreen;