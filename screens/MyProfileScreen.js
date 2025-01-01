import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import SettingsHeader from "../components/MyProfileScreen/SettingsHeader";
import { useThemeContext } from "../hooks/themeContext";
import UserDetailsInputs from "../components/MyProfileScreen/UserDetailsInputs";
import { useUserDataContext } from "../hooks/userDataContext";
import LogoutButton from "../components/MyProfileScreen/LogoutButton";
import AvatarHeader from "../components/MyProfileScreen/AvatarHeader";


const MyProfileScreen = () => {
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

export default MyProfileScreen;