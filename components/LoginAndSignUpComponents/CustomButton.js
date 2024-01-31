import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeContext } from '../../hooks/themeContext';
import Colors from '../../constants/Colors';
import { useUserDataContext } from '../../hooks/userDataContext';
import {BallIndicator} from 'react-native-indicators';

const CustomButton = ({ isActive, title, onPress }) => {
  const { theme } = useThemeContext();
  const {loadingUser} = useUserDataContext();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: Colors.primary , opacity: isActive ? 1 : 0.5, height:loadingUser ? 50 : null},
      ]}
      onPress={isActive ? onPress : null}
      disabled={!isActive}
    >
      {!loadingUser ? (
        <Text style={[styles.buttonText, { color: Colors.white }]}>{title}</Text>
      ) : (
        <BallIndicator color={theme.colors.text} size={25} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: 'ComicNeue-Bold',
    fontSize: 18,
  },
});

export default CustomButton;
