import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const darkTheme = {
    dark: true,
    colors: {
      primary: 'rgb(255, 45, 85)',
      primaryBackground: '#000',
      secondaryBackground: '#222222',
      tetiaryBackground: '#424242',
      card: 'rgb(255, 255, 255)',
      text: 'white',
      secondaryText:'lightgray',
      border: 'light',
      notification: 'rgb(255, 69, 58)',
      backButtonBg:'rgba(0.6, 0, 0,0)'
    },
  };

  const lightTheme = {
    dark: false,
    colors: {
      primaryBackground: '#FAFAFA',
      secondaryBackground: 'rgb(242, 242, 242)',
      tetiaryBackground:'#E0E0E0',
      card: 'rgb(255, 255, 255)',
      text: 'black',
      secondaryText:'gray',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
      backButtonBg:'rgba(0, 0, 0, 0.6)'
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


