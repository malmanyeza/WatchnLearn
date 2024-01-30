import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeContext } from '../../hooks/themeContext';
import Colors from '../../constants/Colors';

const CustomButton = ({ isActive, title, onPress }) => {
  const { theme } = useThemeContext();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: Colors.primary , opacity: isActive ? 1 : 0.5},
      ]}
      onPress={isActive ? onPress : null}
      disabled={!isActive}
    >
      <Text style={[styles.buttonText, { color: isActive ? theme.colors.buttonText : theme.colors.disabledText }]}>
        {title}
      </Text>
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
