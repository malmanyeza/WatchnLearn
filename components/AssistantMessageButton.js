import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/FontAwesome6';
import { useThemeContext } from '../hooks/themeContext';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';

const AssistantMessageButton = () => {

    const navigation = useNavigation()

    const handlePress = () => {
        navigation.navigate('AssistantMessaging')
    }

    const {theme} = useThemeContext()

    return (
            <TouchableOpacity onPress={handlePress} style={[styles.button,{backgroundColor:theme.colors.tetiaryBackground}]}>
                <MaterialIcons name="robot" size={20} color={theme.colors.text}/>
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.secondary,
        borderWidth: 0.3,
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default AssistantMessageButton;