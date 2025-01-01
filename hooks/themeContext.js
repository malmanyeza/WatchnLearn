import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const darkTheme = {
    dark: true,
    colors: {
      primary: 'rgb(255, 45, 85)',
      primaryBackground: '#111111',
      secondaryBackground: '#2c2c2c',
      tetiaryBackground: '#2c2c2c',
      card: '#2c2c2c',
      text: '#EAEAEA',
      secondaryText:'#B0B0B5',
      border: 'light',
      notification: 'rgb(255, 69, 58)',
      backButtonBg:'#383840',
      defaultBorder: '#44444E',
      selectedBorder: '#00f335',
      primarColor:'#DAA520',
    },
  };

  const lightTheme = {
    dark: false,
    colors: {
      primaryBackground: '#F9F9F9',
      secondaryBackground: '#FFFFFF',
      tetiaryBackground:'#F6F6F6',
      card: '#FFFFFF',
      text: '#333333',
      secondaryText:'#666666',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
      backButtonBg:'#e6e3e3',
      defaultBorder: '#E0E0E0',
      selectedBorder: '#007BFF',
      primarColor:'#007BFF',
    },
  };

  const colorScheme = useColorScheme();
  const initialTheme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [theme, setTheme] = useState(initialTheme);

  

  useEffect(() => {
    const initialTheme = colorScheme === 'dark' ? darkTheme : lightTheme;
    setTheme(initialTheme)
  
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return React.useContext(ThemeContext);
};


