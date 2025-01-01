import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/LoginAndSignUpComponents/CustomButton';
import { useThemeContext } from '../../hooks/themeContext';
import Colors from '../../constants/Colors';
import { useUserDataContext } from '../../hooks/userDataContext';
import { useNavigation } from '@react-navigation/native';
import FontSizes from '../../constants/FontSizes';

const UserNameScreen = () => {
  const { theme } = useThemeContext();
  const navigation = useNavigation();

  const {userDetails, setUserDetails} = useUserDataContext();

  const handleContinue = () => {
    navigation.navigate('LevelSelection');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>Enter your name</Text>

      {/* First Name Input */}
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        placeholder="First Name"
        onChangeText={(text) => setUserDetails({...userDetails, firstName: text})}
        value={userDetails.firstName}
        placeholderTextColor={theme.colors.secondaryText}
      />

      {/* Last Name Input */}
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        placeholder="Last Name"
        onChangeText={(text) => setUserDetails({...userDetails, lastName: text})}
        value={userDetails.lastName}
        placeholderTextColor={theme.colors.secondaryText}
      />

      {/* CustomButton with title "Continue" */}
      <CustomButton
        isActive={userDetails.firstName.length > 0 && userDetails.lastName.length > 0}
        title="Continue"
        onPress={handleContinue}
      />
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
});

export default UserNameScreen;
