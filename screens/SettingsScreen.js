import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import SettingsHeader from "../components/SettingsScreen/SettingsHeader";
import { useThemeContext } from "../hooks/themeContext";
import UserDetailsInputs from "../components/SettingsScreen/UserDetailsInputs";
import { useUserDataContext } from "../hooks/userDataContext";
import LogoutButton from "../components/SettingsScreen/LogoutButton";
import AvatarHeader from "../components/SettingsScreen/AvatarHeader";


const SettingsScreen = () => {
const {theme} = useThemeContext()

const {logout} = useUserDataContext()

    return (
        <View style={[styles.container,{backgroundColor:theme.colors.primaryBackground}]}>
         <SettingsHeader
            title={'Account'}
         />
         <ScrollView>
           <AvatarHeader/>
           <UserDetailsInputs/>
           <LogoutButton onPress={logout}/>
         </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
});

export default SettingsScreen;