import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useThemeContext } from '../../hooks/themeContext';
import Colors from '../../constants/Colors';
import CustomButton from '../../components/LoginAndSignUpComponents/CustomButton'; // Import the CustomButton component
import { useUserDataContext } from '../../hooks/userDataContext';
import { useNavigation } from '@react-navigation/native';
import FontSizes from '../../constants/FontSizes';

const EmailAndPasswordScreen = () => {
  const { theme } = useThemeContext();
  const navigation = useNavigation();

  const { signInWithBothEmailAndPassword, userDetails, setUserDetails} = useUserDataContext();

  console.log('Here are the user details',userDetails)

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isLogin, setIsLogin] = useState(false); // Track whether it's a login or sign-up

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signIn = () => {
    signInWithBothEmailAndPassword();
  };

  const signUp = () => {
    navigation.navigate('UserName');
  };

  const handlePasswordChange = (text) => {
    setUserDetails({...userDetails, password: text});
    // Validate password length
    if (text.length >= 8) {
      setPasswordError('');
    } else {
      setPasswordError('Password must be at least 8 characters');
    }
  };

  

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>{!isLogin ? 'Login' : 'Sign Up'}</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        placeholder="Email"
        onChangeText={(text) => setUserDetails({...userDetails, email: text})}
        value={userDetails.email}
        placeholderTextColor={theme.colors.secondaryText}
      />

      {/* Password Input with Eye Icon */}
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={[styles.passwordInput, { color: theme.colors.text }]}
          placeholder="Password"
          secureTextEntry={!showPassword}
          onChangeText={handlePasswordChange}
          value={userDetails.password}
          placeholderTextColor={theme.colors.secondaryText}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>
      </View>

      {/* Display Password Error */}
      {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}

      {/* CustomButton with isActive prop based on validation */}
      <CustomButton
        isActive={userDetails.email.length > 0 && userDetails.password.length >= 8 && !passwordError}
        title={!isLogin ? 'Login' : 'Sign Up'}
        onPress={() => (!isLogin ? signIn() : signUp())}
      />
  
      <TouchableOpacity onPress={toggleAuthMode} style={styles.messageContainer}>
        <Text style={ [styles.message,{color: theme.colors.secondaryText}] }>
          {!isLogin ? "Don't have an account? " : 'Already have an account? '}
        </Text>
        <Text style={styles.signUpText}>{!isLogin ? "Sign Up" : 'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: FontSizes.heading3,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    height: 60,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: 'ComicNeue-Bold',
    fontSize: 20,
    marginBottom: 25,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    height: 60,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: 'ComicNeue-Bold',
    fontSize: 20,
  },
  eyeIconContainer: {
    padding: 10,
  },
  messageContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
  },
  message: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 18,
  },
  signUpText: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 18,
    color: Colors.primary,
  },
});

export default EmailAndPasswordScreen;
