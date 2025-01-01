import React,{useState} from "react";
import {View, Text,StyleSheet, TextInput , TouchableOpacity} from 'react-native'
import { useUserDataContext } from "../../hooks/userDataContext";
import { useThemeContext } from "../../hooks/themeContext";
import Icon from 'react-native-vector-icons/FontAwesome'


const InputComponent =({inputType, inputTile, inputValue})=>{

    const [passwordError, setPasswordError] = useState('')
    const [showPassword, setShowPassword] =useState('')

    const {theme} = useThemeContext()

    const {userDetails, setUserDetails} = useUserDataContext()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const handlePasswordChange = (text) => {
        setUserDetails({...userDetails, password: text});
        // Validate password length
        if (text.length >= 8) {
          setPasswordError('');
        } else {
          setPasswordError('Password must be at least 8 characters');
        }
    }

    handleTextChange =({text})=>{
        inputType=='firstName'?setUserDetails({...userDetails, firstName:text}):
        inputType=='lastName'?setUserDetails({...userDetails, lastName:text}):
        inputType=='email'?setUserDetails({...userDetails, email:text}):
        inputType=='phone'?setUserDetails({...userDetails, phone:text}):
        handlePasswordChange(text)
    }

    return(
        <View style={[styles.container,{backgroundColor:theme.colors.primaryBackground}]}>
          <Text style={[styles.inputTitleText,{color:theme.colors.secondaryText}]}>{inputTile}</Text>
           <View style={[styles.inputContainer,{borderColor:theme.colors.tetiaryBackground, flexDirection:inputType=='password'?'row':'column', justifyContent:inputType=='password'?'space-between':null, alignItems:inputType=='password'?'center':null}]}>
                <TextInput
                    placeholder={inputValue}
                    style={[styles.input,{color:theme.colors.text, backgroundColor:theme.colors.primaryBackground}]}
                    placeholderTextColor={theme.colors.text}
                    secureTextEntry={!showPassword&&inputType=='password'}
                    onChangeText={(text) => handleTextChange(text)}
                    value={inputValue}
                />
                {
                    inputType=='password'?
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
                      <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                    :null
                }
           </View>
           {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
     
    },
    inputTitleText:{
        fontFamily:'ComicNeue-Bold',
        fontSize:20,
        marginBottom:10,
        marginLeft:15
    },
    inputContainer:{
        borderRadius:15,
        borderWidth:2,
        paddingHorizontal:5,
        marginBottom:20,
    },
    input:{
        fontFamily:'ComicNeue-Regular',
        fontSize:20,
        margin:8
    },
    eyeIconContainer:{
        position:'absolute',
        right:20
    }
})

export default InputComponent