import React,{useEffect} from 'react';
import { StyleSheet, StatusBar, useColorScheme, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Stacks } from './Stacks';
import { SubjectProvider } from './hooks/subjectDetailsConst';
import { AllSubjectsProvider } from './hooks/allSubjectsContext';
import { ContentProvider } from './hooks/contentContext';
import { UserDataProvider } from './hooks/userDataContext';
import { useTheme } from 'react-native-paper';
import { ThemeProvider } from './hooks/themeContext';
import SplashScreen from 'react-native-splash-screen';




export default function App() {

  useEffect(() => {
    // Delay for 2 seconds (2000 milliseconds) before hiding the splash screen
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    LogBox.ignoreAllLogs()
    // Clear the timeout if the component unmounts before the delay completes
    return () => clearTimeout(timeoutId);
  }, []);

  const colorScheme = useColorScheme();
  const initialTheme = colorScheme 
  const contentColor = colorScheme === 'dark' ? 'light-content' : 'dark-content';

  const theme = useTheme();
  theme.colors.secondaryContainer= 'transparent'

  return (
    <UserDataProvider>
    <AllSubjectsProvider>
      <SubjectProvider>
        <ContentProvider>
        <ThemeProvider>
          <NavigationContainer>
            <StatusBar backgroundColor={ initialTheme==='dark'?'#02070f':"#FAFAFA"} barStyle={contentColor} />
            <Stacks/>
          </NavigationContainer>
          </ThemeProvider>
        </ContentProvider>
      </SubjectProvider>
    </AllSubjectsProvider>
    </UserDataProvider>
    
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 50, // Adjust the height as needed
  },
});