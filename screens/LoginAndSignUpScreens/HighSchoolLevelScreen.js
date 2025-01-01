import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/LoginAndSignUpComponents/CustomButton';
import { useThemeContext } from '../../hooks/themeContext';
import Colors from '../../constants/Colors';
import { useUserDataContext } from '../../hooks/userDataContext';
import FontSizes from '../../constants/FontSizes';
import { useNavigation } from '@react-navigation/native';

const HighSchoolLevelScreen = () => {
  const { theme } = useThemeContext();
  const {signUpWithEmailAndPassword, setUserDetails, userDetails} = useUserDataContext()
  const navigation = useNavigation()

  const handleSelectLevel = (level) => {
    setUserDetails({...userDetails, level: level})
  };

  const handleContinue = () => {

      signUpWithEmailAndPassword()

  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBackground }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>Select your level</Text>

      <TouchableOpacity
        style={[
          styles.levelButton,
          { borderColor: Colors.primary },
          userDetails.level === 'Junior Certificate' && { backgroundColor: Colors.primary }
        ]}
        onPress={() => handleSelectLevel('Junior Certificate')}
      >
        <Text style={[styles.levelButtonText, userDetails.level === 'Junior Certificate' && { color: theme.colors.text }]}>
          Junior Certificate
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.levelButton,
          { borderColor: Colors.primary },
          userDetails.level === '\'O\' level' && { backgroundColor: Colors.primary }
        ]}
        onPress={() => handleSelectLevel('\'O\' level')}
      >
        <Text style={[styles.levelButtonText, userDetails.level === '\'O\' levelol' && { color: theme.colors.text }]}>
          O' level
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.levelButton,
          { borderColor: Colors.primary },
          userDetails.level === '\'A\' level' && { backgroundColor: Colors.primary }
        ]}
        onPress={() => handleSelectLevel('\'A\' level')}
      >
        <Text style={[styles.levelButtonText, userDetails.level === '\'A\'level' && { color: theme.colors.text }]}>
          'A' level
        </Text>
      </TouchableOpacity>

      <CustomButton
        isActive={!!userDetails.level}
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
    justifyContent: 'center'
  },
  header: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: FontSizes.heading3,
    marginBottom: 30,
  },
  levelButton: {
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 20,
  },
  levelButtonText: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 20,
    color: Colors.primary,
  }
});

export default HighSchoolLevelScreen;
