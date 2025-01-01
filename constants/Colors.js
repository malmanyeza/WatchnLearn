import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const colorScheme = useColorScheme();

const useThemeColors = () => {
  const [theme, setTheme] = useState(colorScheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    setTheme(colorScheme)
  }, [colorScheme]);

  return theme;
};

const Colors = {
    // Define your color constants here
    primary:colorScheme === 'dark' ? '#00f335':'#007BFF',
    green:'#5D9C59',
    secondary:'#E6FFFd'
  };
  
  export default Colors;
  